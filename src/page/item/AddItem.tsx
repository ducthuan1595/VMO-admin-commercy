import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

import { requests } from "../../api";
import { context } from "../../store";
import handleToast from "../../util/toast";
import { ItemType } from "./Item";
import { CategoryType } from "../category/Category";

const AddItem = ({
  getItem,
  detailItem,
}: {
  getItem: (num: number | null) => Promise<void>;
  detailItem: ItemType | null;
}) => {
  const storeValue = useContext(context);

  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [priceInput, setPriceInput] = useState<number | string>("");
  const [pricePay, setPricePay] = useState<number | string>("");
  const [description, setDescription] = useState("");
  const [slogan, setSlogan] = useState("");
  const [barcode, setBarcode] = useState("");
  const [categories, setCategories] = useState<CategoryType[] | null>(null);
  const [selectCategory, setSelectCategory] = useState("");
  const [count, setCount] = useState<number | string>("");
  const [weight, setWeight] = useState<number | string>("");
  const [pic, setPic] = useState<FileList | null>(null);
  const [detailPic, setDetailPic] = useState<FileList | null>(null);

  useEffect(() => {
    if (detailItem) {
      setName(detailItem.name);
      setAuthor(detailItem.author);
      setPriceInput(detailItem.priceInput);
      setPricePay(detailItem.pricePay);
      setSlogan(detailItem.slogan);
      setBarcode(detailItem.barcode);
      setDescription(detailItem.description);
      setCount(detailItem.count);
      setWeight(detailItem.weight);
    }
  }, [detailItem]);

  useEffect(() => {
    const getCategory = async (page: number | null) => {
      if (storeValue && storeValue.user && storeValue.user.token) {
        const res = await requests.getCategory(
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

  const handleUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = e.target.files;
      if (files) {
        setPic(files);
      }
    }
  };
  const handleDetailUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = e.target.files;
      if (files) {
        setDetailPic(files);
      }
    }
  };

  const selectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectCategory(e.target.value);
  };

  const handleAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (detailItem) {
      if (storeValue && storeValue.user) {
        const formData = new FormData();
        if (pic) {
          for (let i = 0; i < pic.length; i++) {
            formData.append("pic", pic[i]);
          }
        }
        if (detailPic) {
          for (let i = 0; i < detailPic.length; i++) {
            formData.append("detailPic", detailPic[i]);
          }
        }
        formData.append("name", name);
        formData.append("categoryId", detailItem._id);
        formData.append("author", author);
        formData.append("priceInput", priceInput.toString());
        formData.append("pricePay", pricePay.toString());
        formData.append("slogan", slogan);
        formData.append("description", description);
        formData.append("barcode", barcode);
        formData.append("count", count.toString());
        formData.append("weight", weight.toString());

        const res = await requests.editItem(formData, storeValue.user.token);
        if (res.data.message === "ok") {
          getItem(null);
          handleToast(toast.success, "Update Product successfully!");
          setName("");
          setAuthor("");
          setDescription("");
          setPriceInput("");
          setPricePay("");
          setSlogan("");
          setCount("");
          setBarcode("");
          setWeight("");
          setPic(null);
          setDetailPic(null);
        } else {
          handleToast(toast.error, res.data.message);
        }
      } else {
        handleToast(toast.warning, "Not empty fields");
      }
    } else {
      if (storeValue && storeValue.user) {
        const formData = new FormData();
        if (pic) {
          for (let i = 0; i < pic.length; i++) {
            formData.append("pic", pic[i]);
          }
        }
        if (detailPic) {
          for (let i = 0; i < detailPic.length; i++) {
            formData.append("detailPic", detailPic[i]);
          }
        }
        formData.append("name", name);
        formData.append("author", author);
        formData.append("priceInput", priceInput.toString());
        formData.append("pricePay", pricePay.toString());
        formData.append("slogan", slogan);
        formData.append("description", description);
        formData.append("barcode", barcode);
        formData.append("count", count.toString());
        formData.append("weight", weight.toString());

        const res = await requests.createItem(formData, storeValue.user.token);
        if (res.data.message === "ok") {
          getItem(null);
          handleToast(toast.success, "Add Product successfully!");
          setName("");
          setAuthor("");
          setDescription("");
          setPriceInput("");
          setPricePay("");
          setSlogan("");
          setCount("");
          setBarcode("");
          setWeight("");
          setPic(null);
          setDetailPic(null);
        } else {
          handleToast(toast.error, res.data.message);
        }
      } else {
        handleToast(toast.warning, "Not empty fields");
      }
    }
  };

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
              <label htmlFor="">Origin Price</label>
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
              <label htmlFor="">Pay Price</label>
              <input
                className="p-2 rounded-md text-[#333]"
                type="number"
                name="pricePay"
                placeholder="100000"
                onChange={(e) => setPricePay(e.target.value)}
                value={pricePay}
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
              <label htmlFor="">Weight</label>
              <input
                className="p-2 rounded-md text-[#333]"
                type="number"
                name="weight"
                step={0.1}
                placeholder="1.5"
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
              rows={3}
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
        >
          {detailItem ? "Edit" : "Add"}
        </button>
      </form>
    </div>
  );
};

export default AddItem;
