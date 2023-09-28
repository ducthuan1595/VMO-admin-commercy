import React, { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import MainLayout from "../../layout/MainLayout";
import AddCategory from "./AddCategory";
import { requests } from "../../api";
import { context } from "../../store";
import { URL } from "../../api";
import handleToast from "../../util/toast";

export interface CategoryType {
  _id: string;
  name: string;
  banner: string[];
  description: string;
  active: boolean;
  position: number;
}

interface CategoryPage {
  currPage: number;
  nextPage: boolean;
  prevPage: boolean;
  totalCategory: number;
  totalPage: number;
  categories: CategoryType[];
}

export default function Category() {
  const value = useContext(context);

  const [categories, setCategories] = useState<CategoryPage | null>(null);
  const [detailCategory, setDetailCategory] = useState<CategoryType | null>(
    null
  );

  const getCategory = async (page: number | null) => {
    if (value && value.user && value.user.token) {
      const limit: number = 8;
      const res = await requests.getCategory(
        page,
        limit,
        null,
        value.user.token
      );

      if (res.data.message === "ok") {
        setCategories(res.data.data);
      }
    }
  };
  useEffect(() => {
    getCategory(1);
  }, []);

  const handleDelete = async (id: string) => {
    if (value && value.user && value.user.token) {
      const object = {
        categoryId: id,
      };
      const res = await requests.deleteCategory(object, value.user.token);
      if (res.data.message === "ok") {
        handleToast(toast.success, "You removed successfully");
        getCategory(null);
      } else {
        handleToast(toast.error, res.data.message);
      }
    }
  };

  const handleEdit = async (id: string) => {
    if (value && value.user && value.user.token) {
      const res = await requests.getCategory(null, null, id, value.user.token);
      if (res.data.message === "ok") {
        setDetailCategory(res.data.data);
        window.scrollTo(0, 0);
      }
    }
  };

  const handleNextPage = () => {
    if (categories && categories.currPage && categories.nextPage) {
      const page = +categories.currPage + 1;
      getCategory(page);
    }
  };
  const handlePrevPage = () => {
    if (categories && categories.currPage && categories.prevPage) {
      const page = +categories.currPage - 1;
      getCategory(page);
    }
  };

  return (
    <MainLayout>
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-[white] text-[32px] pb-4">Manager Category</h1>
          <span className="text-[white] bg-[#383838] text-center rounded-xl ml-3 h-[40px] px-2 hover:opacity-80 leading-[2.4]"></span>
        </div>
        <AddCategory
          getCategory={getCategory}
          detailCategory={detailCategory}
          setDetailCategory={setDetailCategory}
        />
        <div className="text-[white] mt-12 text-[22px] text-center">
          List Category
        </div>
        <table className="text-[#333] mt-4">
          <thead>
            <tr>
              <th>Name Category</th>
              <th>Banner</th>
              <th>Description</th>
              <th>Role</th>
              <th>Active</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {categories &&
              categories.categories &&
              categories.categories.map((c) => {
                return (
                  <tr key={c._id}>
                    <td className="capitalize">{c.name}</td>
                    <td className="flex flex-wrap gap-1">
                      {c.banner.map((i) => {
                        return (
                          <span className="" key={i}>
                            <img
                              className="h-12"
                              src={`${URL}/image/${i}`}
                              alt="category"
                            />
                          </span>
                        );
                      })}
                    </td>
                    <td>{c.description}</td>
                    <td>{c.position}</td>
                    <td className="text-center">
                      {c.active ? (
                        <i className="fa-solid fa-circle-check text-[green]"></i>
                      ) : (
                        <i className="fa-solid fa-circle-xmark text-[#ff1e00d0]"></i>
                      )}
                    </td>
                    <td className="text-center cursor-pointer">
                      <button className="mr-8">
                        <i
                          onClick={() => handleEdit(c._id)}
                          className="fa-solid fa-pencil text-[green] text-[19px]"
                        ></i>
                      </button>
                      <button>
                        <i
                          onClick={handleDelete.bind(null, c._id)}
                          className="fa-solid fa-trash text-[#f00] text-[19px]"
                        ></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        {categories?.totalPage && categories.totalPage > 1 && (
          <div className="text-[white] flex gap-4 mt-4 mb-8 justify-between items-center">
            {categories?.prevPage ? (
              <span
                className="cursor-pointer border-[1px] py-2 rounded-lg border-[#383838] w-[45%] justify-self-start"
                onClick={handlePrevPage}
              >
                <div className="pl-[20px]">
                  <i className="fa-solid fa-chevron-left"></i> Prev
                </div>
              </span>
            ) : (
              <span className="w-[45%]"></span>
            )}
            <span>{categories.currPage}</span>
            {categories?.nextPage ? (
              <span
                className="cursor-pointer border-[1px] py-2 rounded-lg border-[#383838] w-[45%] text-right justify-items-end"
                onClick={handleNextPage}
              >
                <div className="pr-[20px]">
                  Next <i className="fa-solid fa-chevron-right"></i>
                </div>
              </span>
            ) : (
              <span className="w-[45%]"></span>
            )}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
