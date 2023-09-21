import React, { useEffect, useState, useContext } from "react";
import MainLayout from "../../layout/MainLayout";
import { requests } from "../../api";
import { context } from "../../store";

interface Voucher {
  _id: string;
  code: string;
  discount: number;
  expirationDate: string;
  isActive: boolean;
  quantity: number;
}

export default function Voucher() {
  const value = useContext(context);
  const [vouchers, setVouchers] = useState<Voucher[]>([]);

  console.log({ value });

  useEffect(() => {
    const getVoucher = async () => {
      if (value && value.user && value.user.token) {
        const res = await requests.getVoucher(value.user.token);
        console.log(res);

        if (res.data.message === "ok") {
          setVouchers(res.data.data);
        }
      }
      getVoucher();
    };
  }, [value]);
  console.log(vouchers);

  return (
    <MainLayout>
      <div>
        <h1 className="text-[white] text-[32px] pb-4">Voucher</h1>
        <table className="text-[#333]">
          <thead>
            <tr>
              <th>Code</th>
              <th>Discount</th>
              <th>Expiration Date</th>
              <th>Quantity</th>
              <th>Active</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {vouchers.length &&
              vouchers.map((v) => {
                return (
                  <tr key={v._id}>
                    <td className="capitalize">{v.code}</td>
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
