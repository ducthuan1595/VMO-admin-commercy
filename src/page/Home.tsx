import React, { useContext, useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";
import { context } from "../store";
import { requests } from "../api";

export interface ItemType {
  _id: string;
  name: string;
  author: string;
  pic: string[];
  description: string;
  pricePay: number;
  priceInput: number;
  slogan: string;
  barcode: string;
  count: number;
  weight: number;
  detailPic: string[];
}

interface ItemStateType {
  currPage: number;
  nextPage: boolean;
  prevPage: boolean;
  totalItem: number;
  totalPage: number;
  products: ItemType[];
}

export default function Home() {
  const value = useContext(context);
  const [orders, setOrder] = useState<ItemStateType | null>(null);

  const fetchOrder = async (page: number) => {
    if (value && value.user) {
      const limit = 10;
      const res = await requests.getOrder(page, limit, value.user.token);
      if (res.data.message === "ok") {
        setOrder(res.data.data);
      }
    }
  };

  useEffect(() => {
    fetchOrder(1);
  }, [value]);

  console.log({ orders });

  const handleNextPage = () => {};
  const handlePrevPage = () => {};

  return (
    <MainLayout>
      <div className="text-[white]">
        <div className="flex justify-between gap-2">
          <div className="flex flex-col bg-[#232323] p-4 min-w-[200px] flex-1 rounded-md">
            <div className="flex justify-between items-center">
              <span className="text-[22px]">100</span>
              <i className="fa-solid fa-user-plus fa-beat"></i>
            </div>
            <p className="text-[#7b7e7e]">Users</p>
          </div>
          <div className="flex flex-col bg-[#232323] p-4 min-w-[200px] flex-1 rounded-md">
            <div className="flex justify-between items-center">
              <span className="text-[22px]">100</span>
              <i className="fa-solid fa-chart-line fa-beat"></i>
            </div>
            <p className="text-[#7b7e7e]">Revenue</p>
          </div>
          <div className="flex flex-col bg-[#232323] p-4 min-w-[200px] flex-1 rounded-md">
            <div className="flex justify-between items-center">
              <span className="text-[22px]">{value?.totalProduct}</span>
              <i className="fa-solid fa-book fa-beat"></i>
            </div>
            <p className="text-[#7b7e7e]">Products</p>
          </div>
          <div className="flex flex-col bg-[#232323] p-4 min-w-[200px] flex-1 rounded-md">
            <div className="flex justify-between items-center">
              <span className="text-[22px]">100</span>
              <i className="fa-solid fa-cart-shopping fa-beat"></i>
            </div>
            <p className="text-[#7b7e7e]">Orders</p>
          </div>
        </div>
      </div>
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-[white] text-[32px] pb-4">Manager Product</h1>
          <span className="text-[white] bg-[#383838] text-center rounded-xl ml-3 h-[40px] px-2 hover:opacity-80 leading-[2.4]"></span>
        </div>
        <div className="text-[white] mt-12 text-[22px] text-center">
          List Product
        </div>
        <table className="text-[#333] mt-4">
          <thead>
            <tr>
              <th>Book Name</th>
              <th>Author</th>
              <th>Image</th>
              <th>Price Origin</th>
              <th>Price Pay</th>
              <th>Barcode</th>
              <th>Category</th>
              <th>Count</th>
              <th>Page Number</th>
              <th>Flash Sale</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders &&
              orders.products &&
              orders.products.map((c) => {
                return (
                  <tr key={c._id}>
                    <td className="capitalize">{c.name}</td>
                    <td className="capitalize">{c.author}</td>
                    <td className="flex flex-wrap gap-1">
                      {c.pic.map((i) => {
                        return (
                          <span className="" key={i}>
                            <img
                              className="h-12"
                              src={`${URL}/image/${i}`}
                              alt="book"
                            />
                          </span>
                        );
                      })}
                    </td>
                    <td>
                      {c.priceInput
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                      đ
                    </td>
                    <td>
                      {c.pricePay
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                      đ
                    </td>
                    <td>{c.barcode}</td>
                    <td>{c.count} books</td>
                    <td>{c.weight} pages</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        {orders?.totalPage && orders.totalPage > 1 && (
          <div className="text-[white] flex gap-4 mt-4 mb-8 justify-between items-center">
            {orders?.prevPage ? (
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
            <span>{orders.currPage}</span>
            {orders?.nextPage ? (
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
