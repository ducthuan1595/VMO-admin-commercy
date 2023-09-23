import React, { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import MainLayout from "../../layout/MainLayout";
import AddVoucher from "./AddVoucher";
import { requests } from "../../api";
import { context } from "../../store";
import handleToast from "../../util/toast";
import { URL } from "../../api";

interface Voucher {
  _id: string;
  code: string;
  discount: number;
  expirationDate: string;
  isActive: boolean;
  quantity: number;
  pic: string;
}

interface VoucherPage {
  currPage: number;
  nextPage: boolean;
  prevPage: boolean;
  totalVoucher: number;
  activeVoucher: number;
  totalPage: number;
  vouchers: Voucher[];
}

export default function Voucher() {
  const value = useContext(context);
  const [vouchers, setVouchers] = useState<VoucherPage | null>(null);

  const getVoucher = async (page: number | null): Promise<void> => {
    if (value && value.user && value.user.token) {
      // const curPage: number = page || 1;
      const limit = 8;
      const res = await requests.getVoucher(page, limit, value.user.token);
      console.log(res);

      if (res.data.message === "ok") {
        setVouchers(res.data.data);
      }
    }
  };
  useEffect(() => {
    getVoucher(1);
  }, []);

  const handleDelete = async (id: string) => {
    if (value && value.user && value.user.token) {
      const object = {
        voucherId: id,
      };
      const res = await requests.deleteVoucher(object, value.user.token);
      if (res.data.message === "ok") {
        handleToast(toast.success, "You removed successfully");
        getVoucher(null);
      } else {
        handleToast(toast.error, res.data.message);
      }
    }
  };

  const handleNextPage = () => {
    if (vouchers && vouchers.currPage && vouchers.nextPage) {
      const page = +vouchers.currPage + 1;
      getVoucher(page);
    }
  };
  const handlePrevPage = () => {
    if (vouchers && vouchers.currPage && vouchers.prevPage) {
      const page = +vouchers.currPage - 1;
      getVoucher(page);
    }
  };

  return (
    <MainLayout>
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-[white] text-[32px] pb-4">Manager Voucher</h1>
          <span className="text-[white] bg-[#383838] text-center rounded-xl ml-3 h-[40px] px-2 hover:opacity-80 leading-[2.4]">
            Active ( {vouchers?.activeVoucher} / {vouchers?.totalVoucher} )
          </span>
        </div>
        <AddVoucher getVoucher={getVoucher} />
        <div className="text-[white] mt-12 text-[22px] text-center">
          List Voucher
        </div>
        <table className="text-[#333] mt-4">
          <thead>
            <tr>
              <th>Code</th>
              <th>Image</th>
              <th>Discount</th>
              <th>Expiration Date</th>
              <th>Quantity</th>
              <th>Active</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {vouchers &&
              vouchers.vouchers &&
              vouchers.vouchers.map((v) => {
                return (
                  <tr key={v._id}>
                    <td>{v.code}</td>
                    <td>
                      <img
                        className="h-12"
                        src={`${URL}/image/${v.pic}`}
                        alt="voucher"
                      />
                    </td>
                    <td>{v.discount}</td>
                    <td>{v.expirationDate}</td>
                    <td>{v.quantity}</td>
                    <td className="text-center">
                      {v.isActive ? (
                        <i className="fa-solid fa-circle-check text-[green]"></i>
                      ) : (
                        <i className="fa-solid fa-circle-xmark text-[#ff1e00d0]"></i>
                      )}
                    </td>
                    <td className="text-center cursor-pointer">
                      <i
                        onClick={handleDelete.bind(null, v._id)}
                        className="fa-solid fa-trash text-[#f00] text-[19px]"
                      ></i>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        {vouchers?.totalPage && vouchers.totalPage > 1 && (
          <div
            className="text-[white] flex gap-4 mt-4 mb-8 justify-between items-center"
            onClick={handlePrevPage}
          >
            {vouchers?.prevPage ? (
              <span className="cursor-pointer border-[1px] py-2 rounded-lg border-[#383838] w-[45%] justify-self-start">
                <div className="pl-[20px]">
                  <i className="fa-solid fa-chevron-left"></i> Prev
                </div>
              </span>
            ) : (
              <span className="w-[45%]"></span>
            )}
            <span>{vouchers.currPage}</span>
            {vouchers?.nextPage ? (
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
