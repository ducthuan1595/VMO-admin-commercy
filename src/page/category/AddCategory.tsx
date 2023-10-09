import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

import { requests } from "../../api";
import { context } from "../../store";
import handleToast from "../../util/toast";
import { CategoryType } from "./Category";
import { destroyCloudinary } from "../../util/uploadFile";
import { uploadCloudinary } from "../../util/uploadFile";
import { UploadCloudinaryType } from "../../model";

const AddCategory = ({
  getCategory,
  detailCategory,
  setDetailCategory,
}: {
  getCategory: (
    num: number | null,
    type: string | null,
    column: string | null
  ) => Promise<void>;
  detailCategory: CategoryType | null;
  setDetailCategory: React.Dispatch<React.SetStateAction<CategoryType | null>>;
}) => {
  const storeValue = useContext(context);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [banner, setBanner] = useState<UploadCloudinaryType>({
    url: "",
    public_id: "",
  });
  const [position, setPosition] = useState<number | string>("");
  const [isActive, setIsActive] = useState("1");

  useEffect(() => {
    if (detailCategory) {
      setName(detailCategory.name);
      setDescription(detailCategory.description);
      setPosition(detailCategory.position);
      setIsActive(detailCategory.active ? "1" : "0");
    }
  }, [detailCategory]);

  const handleUploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = e.target.files[0];
      if (files) {
        try {
          setIsLoading(true);
          // await destroyCloudinary(detailCategory.banner.public_id);
          const res = await uploadCloudinary(files);
          if (res) {
            setBanner(res);
            setIsLoading(false);
          }
        } catch (err) {
          setIsLoading(false);

          console.log(err);
        }
      }
    }
  };

  const selectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setIsActive(e.target.value);
  };

  const handleAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (detailCategory) {
      if (
        storeValue &&
        storeValue.user &&
        position &&
        banner.url &&
        !isLoading
      ) {
        const values = {
          name,
          description,
          position,
          isActive,
          banner,
          categoryId: detailCategory._id,
        };
        const res = await requests.editCategory(values, storeValue.user.token);
        if (res.data.message === "ok") {
          handleToast(toast.success, "Update category successfully!");
          getCategory(Number(1), null, null);
          setName("");
          setBanner({
            url: "",
            public_id: "",
          });
          setDescription("");
          setPosition("");
          setDetailCategory(null);
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
        banner &&
        banner.url &&
        position &&
        !isLoading
      ) {
        const values = {
          name,
          description,
          position,
          isActive,
          banner,
        };

        const res = await requests.addCategory(values, storeValue.user.token);
        if (res.data.message === "ok") {
          getCategory(1, null, null);
          handleToast(toast.success, "Add category successfully!");
          setName("");
          setBanner({
            url: "",
            public_id: "",
          });
          setDescription("");
          setPosition("");
        } else {
          handleToast(toast.error, "Add category failure!!");
        }
      } else {
        handleToast(toast.warning, "Not empty fields");
      }
    }
  };

  console.log({ banner });

  return (
    <div className="text-[white]">
      <form>
        <div className="text-[white] text-[22px] pb-4 text-center">
          {detailCategory ? "Edit Category" : "Add Category"}
        </div>
        <div>
          <div className="flex justify-between items-center gap-8">
            <div className="flex flex-1 flex-col gap-2 mb-4">
              <label htmlFor="">Name Category</label>
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
              <label htmlFor="">Description</label>
              <input
                className="p-2 rounded-md text-[#333]"
                type="text"
                name="description"
                placeholder="Enter Description"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
            </div>
          </div>
          <div className="flex justify-between items-center gap-8">
            <div className="flex relative flex-1 flex-col gap-2 mb-4">
              <label htmlFor="">Active</label>
              <select
                className="text-[#333] rounded-md p-2"
                onChange={selectChange}
              >
                <option value="1">Yes</option>
                <option value="0">No</option>
              </select>
            </div>
            <div className="flex flex-1 flex-col gap-2 mb-4">
              <label htmlFor="">Position</label>
              <input
                className="p-2 rounded-md text-[#333]"
                type="number"
                name="position"
                placeholder="Priority position"
                onChange={(e) => setPosition(e.target.value)}
                value={position}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 mb-4">
            <label htmlFor="">Upload banner</label>
            <input
              className="p-2 rounded-md text-[#333] w-[200px]"
              type="file"
              name="image"
              multiple
              onChange={handleUploadFile}
            />
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
            <span>{detailCategory ? "Edit" : "Add"}</span>
          )}
        </button>
      </form>
    </div>
  );
};

export default AddCategory;
