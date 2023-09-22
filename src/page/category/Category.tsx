import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import MainLayout from "../../layout/MainLayout";
import AddCategory from "./AddCategory";
import { requests } from "../../api";
import { context } from "../../store";
import { URL } from "../../api";

interface Category {
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
  vouchers: Category[];
}

export default function Category() {
  const value = useContext(context);
  const [vouchers, setVouchers] = useState<VoucherPage | null>(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);

  const getVoucher = async () => {
    if (value && value.user && value.user.token) {
      const res = await requests.getVoucher(page, limit, value.user.token);
      console.log(res);

      if (res.data.message === "ok") {
        setVouchers(res.data.data);
      }
    }
  };
  useEffect(() => {
    getVoucher();
  }, []);

  return (
    <MainLayout>
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-[white] text-[32px] pb-4">Manager Voucher</h1>
          <span className="text-[white] bg-[#383838] text-center rounded-xl ml-3 h-[40px] px-2 hover:opacity-80 leading-[2.4]">
            Active ( {vouchers?.activeVoucher} / {vouchers?.totalVoucher} )
          </span>
        </div>
        <AddCategory getVoucher={getVoucher} />
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
                      <i className="fa-solid fa-trash text-[#f00] text-[19px]"></i>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </MainLayout>
  );
}
