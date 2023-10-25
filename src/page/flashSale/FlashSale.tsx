import React, { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import MainLayout from "../../layout/MainLayout";
import AddFlashSale from "./AddFlashSale";
import { requests } from "../../api";
import { context } from "../../store";
import handleToast from "../../util/toast";
import { ItemType } from "../item/Item";

export interface FlashSaleType {
  _id: string;
  name: string;
  description: string;
  start_date: number;
  end_date: number;
  discount_percent: number;
  items: ListItemFlashSaleType[];
}

interface ListItemFlashSaleType {
  itemId: ItemType;
  quantity: number;
}

interface FlashSaleStateType {
  currPage: number;
  nextPage: boolean;
  prevPage: boolean;
  totalFlashSale: number;
  totalPage: number;
  flashSaleActive: FlashSaleType[];
  flashSales: FlashSaleType[];
}

export default function FlashSale() {
  const value = useContext(context);
  const [flashSales, setFlashSales] = useState<FlashSaleStateType | null>(null);

  const getFlashSales = async (page: number | null): Promise<void> => {
    if (value && value.user && value.user.token) {
      const limit = 5;
      const res = await requests.getFlashSale(page, limit, value.user.token);

      if (res.data.message === "ok") {
        setFlashSales(res.data.data);
      }
    }
  };
  useEffect(() => {
    getFlashSales(1);
  }, []);

  const handleNextPage = () => {
    if (flashSales && flashSales.currPage && flashSales.nextPage) {
      const page = +flashSales.currPage + 1;

      getFlashSales(page);
    }
  };
  const handlePrevPage = () => {
    if (flashSales && flashSales.currPage && flashSales.prevPage) {
      const page = +flashSales.currPage - 1;
      getFlashSales(page);
    }
  };

  return (
    <MainLayout>
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-[white] text-[32px] pb-4">Manager Flash Sale</h1>
          <span className="text-[white] bg-[#383838] text-center rounded-xl ml-3 h-[40px] px-2 hover:opacity-80 leading-[2.4]">
            Active ( {flashSales?.flashSaleActive.length} /{" "}
            {flashSales?.totalFlashSale} )
          </span>
        </div>
        <AddFlashSale getFlashSales={getFlashSales} />
        <div className="text-[white] mt-12 text-[22px] text-center">
          List Flash Sale
        </div>
        <table className="text-[#333] mt-4">
          <thead>
            <tr>
              <th>STT</th>
              <th>Name</th>
              <th>Discount Percent</th>
              <th>Start Date</th>
              <th>End Date</th>
              {/* <th>Active</th> */}
              <th>Product</th>
            </tr>
          </thead>
          <tbody>
            {flashSales &&
              flashSales.flashSales &&
              flashSales.flashSales.map((v, i) => {
                const handleShowDate = (time: number) => {
                  const date = new Date(time);

                  return `${
                    date.getHours() >= 10
                      ? date.getHours()
                      : date.getHours() + "0"
                  }:${
                    date.getMinutes() >= 10
                      ? date.getMinutes()
                      : date.getMinutes() + "0"
                  } - ${date.getDate()}/${
                    date.getMonth() + 1
                  }/${date.getFullYear()}`;
                };

                return (
                  <tr key={v._id}>
                    <td>{i + 1}</td>
                    <td>{v.name}</td>
                    <td className="text-center">{v.discount_percent}%</td>
                    <td>{handleShowDate(v.start_date)}</td>
                    <td>{handleShowDate(v.end_date)}</td>
                    {/* <td className="text-center">
                      {v.end_date > Date.now() ? (
                        <i className="fa-solid fa-circle-check text-[green]"></i>
                      ) : (
                        <i className="fa-solid fa-circle-xmark text-[#ff1e00d0]"></i>
                      )}
                    </td> */}
                    <td>
                      {v.items.map((i) => (
                        <ul key={i.itemId._id}>
                          <li>{i.itemId.name}</li>
                        </ul>
                      ))}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        {flashSales?.totalPage && flashSales.totalPage > 1 && (
          <div className="text-[white] flex gap-4 mt-4 mb-8 justify-between items-center">
            {flashSales?.prevPage ? (
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
            <span>
              {flashSales.currPage} / {flashSales.totalPage}
            </span>
            {flashSales?.nextPage ? (
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
