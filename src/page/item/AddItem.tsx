import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

import { requests } from "../../api";
import { context } from "../../store";
import handleToast from "../../util/toast";
import { ItemType } from "./Item";
import { CategoryType } from "../category/Category";
import { uploadCloudinary } from "../../util/uploadFile";
import { UploadCloudinaryType } from "../../model";

const AddItem = ({
  getItem,
  currPage,
  detailItem,
  setDetailItem,
}: {
  getItem: (
    num: number | null,
    type: string | null,
    column: string | null
  ) => Promise<void>;
  currPage: number | undefined;
  detailItem: ItemType | null;
  setDetailItem: React.Dispatch<React.SetStateAction<ItemType | null>>;
}) => {
  const storeValue = useContext(context);

  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [priceInput, setPriceInput] = useState<number | string>("");
  const [description, setDescription] = useState("");
  const [slogan, setSlogan] = useState("");
  const [barcode, setBarcode] = useState("");
  const [categories, setCategories] = useState<CategoryType[] | null>(null);
  const [selectCategory, setSelectCategory] = useState<string>("");
  const [count, setCount] = useState<number | string>("");
  const [weight, setWeight] = useState<number | string>("");
  const [pic, setPic] = useState<UploadCloudinaryType[]>([]);
  const [detailPic, setDetailPic] = useState<UploadCloudinaryType[]>([]);

  useEffect(() => {
    if (detailItem) {
      setName(detailItem.name);
      setAuthor(detailItem.author);
      setPriceInput(detailItem.priceInput);
      setSlogan(detailItem.slogan);
      setBarcode(detailItem.barcode);
      setDescription(detailItem.description);
      setCount(detailItem.count);
      setWeight(detailItem.weight);
      setSelectCategory(detailItem?.categoryId._id.toString());
    }
  }, [detailItem]);

  useEffect(() => {
    const getCategory = async (page: number | null) => {
      if (storeValue && storeValue.user && storeValue.user.token) {
        const res = await requests.getCategory(
          null,
          null,
          null,
          null,
          null,
          storeValue.user.token
        );

        if (res.data.message === "ok") {
          setCategories(res.data.data);
        }
      }
    };
    getCategory(null);
  }, []);

  const handleUploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = e.target.files;
      if (files) {
        try {
          setIsLoading(true);
          let newArr = [];
          for (let i = 0; i < files.length; i++) {
            const res = await uploadCloudinary(files[i]);
            newArr.push(res);
          }
          setPic(newArr);
          setIsLoading(false);
        } catch (err) {
          setIsLoading(false);
          console.log(err);
        }
      }
    }
  };
  const handleDetailUploadFile = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = e.target.files;
      if (files) {
        try {
          setIsLoading(true);
          let newArr = [];
          for (let i = 0; i < files.length; i++) {
            const res = await uploadCloudinary(files[i]);
            newArr.push(res);
          }
          setDetailPic(newArr);
          setIsLoading(false);
        } catch (err) {
          setIsLoading(false);
          console.log(err);
        }
      }
    }
  };

  const selectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectCategory(e.target.value);
  };

  const handleAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (detailItem && currPage) {
      if (
        storeValue &&
        storeValue.user &&
        name &&
        description &&
        priceInput &&
        count &&
        barcode &&
        pic.length &&
        weight &&
        author &&
        selectCategory &&
        !isLoading
      ) {
        const values = {
          name,
          description,
          priceInput,
          slogan,
          count,
          barcode,
          pic,
          detailPic,
          weight,
          author,
          itemId: detailItem._id,
          categoryId: selectCategory,
        };

        const res = await requests.editItem(values, storeValue.user.token);
        if (res.data.message === "ok") {
          getItem(currPage, null, null);
          handleToast(toast.success, "Update Product successfully!");
          setDetailItem(null);
          setName("");
          setAuthor("");
          setDescription("");
          setPriceInput("");
          setSlogan("");
          setCount("");
          setBarcode("");
          setWeight("");
          setPic([]);
          setDetailPic([]);
        } else {
          handleToast(toast.error, res.data.message);
        }
      } else {
        handleToast(toast.warning, "Not empty fields");
      }
    } else {
      if (
        storeValue &&
        storeValue.user &&
        name &&
        description &&
        priceInput &&
        count &&
        barcode &&
        pic.length &&
        weight &&
        author &&
        selectCategory &&
        !isLoading &&
        currPage
      ) {
        const values = {
          name,
          description,
          detailItem,
          priceInput,
          slogan,
          count,
          barcode,
          pic,
          detailPic,
          weight,
          author,
          categoryId: selectCategory,
        };

        const res = await requests.createItem(values, storeValue.user.token);
        if (res.data.message === "ok") {
          getItem(currPage, null, null);
          handleToast(toast.success, "Add Product successfully!");
          setName("");
          setAuthor("");
          setDescription("");
          setPriceInput("");
          setSlogan("");
          setCount("");
          setBarcode("");
          setWeight("");
          setPic([]);
          setDetailPic([]);
        } else {
          handleToast(toast.error, res.data.message);
        }
      } else {
        handleToast(toast.warning, "Not empty fields");
      }
    }
  };

  // console.log({ detailItem, selectCategory });

  return (
    <div className="text-[white]">
      <form>
        <div className="text-[white] text-[22px] pb-4 text-center">
          {detailItem ? "Edit Book" : "Add Book"}
        </div>
        <div>
          <div className="flex justify-between items-center gap-8">
            <div className="flex flex-1 flex-col gap-2 mb-4">
              <label htmlFor="">Name Book</label>
              <input
                className="p-2 rounded-md text-[#333]"
                type="text"
                name="name"
                placeholder="Enter name"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>
            <div className="flex flex-1 flex-col gap-2 mb-4">
              <label htmlFor="">Name Author</label>
              <input
                className="p-2 rounded-md text-[#333]"
                type="text"
                name="name"
                placeholder="Enter author"
                onChange={(e) => setAuthor(e.target.value)}
                value={author}
              />
            </div>
          </div>
          <div className="flex justify-between items-center gap-8">
            <div className="flex flex-1 flex-col gap-2 mb-4">
              <label htmlFor="">Price</label>
              <input
                className="p-2 rounded-md text-[#333]"
                type="number"
                name="priceInput"
                placeholder="150000"
                onChange={(e) => setPriceInput(e.target.value)}
                value={priceInput}
              />
            </div>

            <div className="flex flex-1 flex-col gap-2 mb-4">
              <label htmlFor="">Barcode</label>
              <input
                className="p-2 rounded-md text-[#333]"
                type="text"
                name="barcode"
                placeholder="12tf4x67"
                onChange={(e) => setBarcode(e.target.value)}
                value={barcode}
              />
            </div>
          </div>
          <div className="flex justify-between items-center gap-8">
            <div className="flex flex-1 flex-col gap-2 mb-4">
              <label htmlFor="">Category</label>
              <select
                className="text-[#333] rounded-md p-2"
                onChange={selectChange}
              >
                {categories &&
                  categories.map((c) => {
                    return (
                      <option key={c._id} value={c._id}>
                        {c.name}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="flex relative flex-col gap-2 mb-4">
              <label htmlFor="">Count</label>
              <input
                className="p-2 rounded-md text-[#333]"
                type="number"
                name="name"
                placeholder="1000"
                onChange={(e) => setCount(e.target.value)}
                value={count}
              />
            </div>
            <div className="flex flex-col gap-2 mb-4">
              <label htmlFor="">Page Number</label>
              <input
                className="p-2 rounded-md text-[#333]"
                type="number"
                name="weight"
                placeholder="300"
                onChange={(e) => setWeight(e.target.value)}
                value={weight}
              />
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-2 mb-4">
            <label htmlFor="">Slogan</label>
            <textarea
              className="p-2 rounded-md text-[#333]"
              rows={2}
              name="slogan"
              placeholder="Enter slogan"
              onChange={(e) => setSlogan(e.target.value)}
              value={slogan}
            />
          </div>
          <div className="flex flex-1 flex-col gap-2 mb-4">
            <label htmlFor="">Description</label>
            <textarea
              className="p-2 rounded-md text-[#333]"
              // type="text"
              rows={5}
              name="description"
              placeholder="Enter Description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
          </div>
          <div className="flex justify-between items-center gap-8">
            <div className="flex flex-col gap-2 mb-4">
              <label htmlFor="">Upload Image</label>
              <input
                className="p-2 rounded-md text-[#333] w-[200px]"
                type="file"
                name="image"
                multiple
                onChange={handleUploadFile}
              />
            </div>
            <div className="flex flex-col gap-2 mb-4">
              <label htmlFor="">Upload Detail image</label>
              <input
                className="p-2 rounded-md text-[#333] w-[200px]"
                type="file"
                name="detail-image"
                multiple
                onChange={handleDetailUploadFile}
              />
            </div>
          </div>
        </div>
        <button
          onClick={handleAdd}
          className="rounded-lg bg-[#383838] py-2 px-4 hover:opacity-80"
          disabled={isLoading}
        >
          {isLoading ? (
            <i className="fa-solid fa-spinner animate-spin"></i>
          ) : (
            <span>{detailItem ? "Edit" : "Add"}</span>
          )}
        </button>
      </form>
    </div>
  );
};

export default AddItem;
