import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

import { requests } from "../../api";
import { context } from "../../store";
import handleToast from "../../util/toast";
import { CategoryType } from "./Category";

const AddCategory = ({
  getCategory,
  detailCategory,
}: {
  getCategory: (num: number | null) => Promise<void>;
  detailCategory: CategoryType | null;
}) => {
  const storeValue = useContext(context);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [banner, setBanner] = useState<FileList | null>(null);
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

  const handleUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = e.target.files;
      if (files) {
        setBanner(files);
      }
    }
  };

  const selectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setIsActive(e.target.value);
  };

  const handleAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (detailCategory) {
      if (storeValue && storeValue.user && position) {
        const formData = new FormData();
        if (banner) {
          for (let i = 0; i < banner.length; i++) {
            formData.append("banner", banner[i]);
          }
        }
        formData.append("name", name);
        formData.append("categoryId", detailCategory._id);
        formData.append("description", description);
        formData.append("position", position.toString());
        formData.append("isActive", isActive.toString());

        const res = await requests.editCategory(
          formData,
          storeValue.user.token
        );
        if (res.data.message === "ok") {
          getCategory(null);
          handleToast(toast.success, "Update category successfully!");
          setName("");
          setBanner(null);
          setDescription("");
          setPosition("");
        } else {
          handleToast(toast.error, res.data.message);
        }
      } else {
        handleToast(toast.warning, "Not empty fields");
      }
    } else {
      if (storeValue && storeValue.user && banner && position) {
        const formData = new FormData();
        for (let i = 0; i < banner.length; i++) {
          formData.append("banner", banner[i]);
        }
        formData.append("name", name);
        formData.append("description", description);
        formData.append("position", position.toString());
        formData.append("isActive", isActive.toString());

        const res = await requests.addCategory(formData, storeValue.user.token);
        if (res.data.message === "ok") {
          getCategory(null);
          handleToast(toast.success, "Add category successfully!");
          setName("");
          setBanner(null);
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
        >
          {detailCategory ? "Edit" : "Add"}
        </button>
      </form>
    </div>
  );
};

export default AddCategory;
