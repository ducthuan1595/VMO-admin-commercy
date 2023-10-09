import React, { useContext, useState } from "react";
import { Calendar } from "react-date-range";
import format from "date-fns/format";
import { toast } from "react-toastify";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

import { requests } from "../../api";
import { context } from "../../store";
import handleToast from "../../util/toast";
import { uploadCloudinary } from "../../util/uploadFile";
import { UploadCloudinaryType } from "../../model";

const AddVoucher = ({
  getVoucher,
}: {
  getVoucher: (num: number) => Promise<void>;
}) => {
  const storeValue = useContext(context);

  const [code, setCode] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [expirateDate, setExpirateDate] = useState(new Date());
  const [discount, setDiscount] = useState("");
  const [pic, setPic] = useState<UploadCloudinaryType>({
    url: "",
    public_id: "",
  });
  const [quantity, setQuantity] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleUploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file) {
        try {
          setIsLoading(true);
          const res = await uploadCloudinary(file);
          if (res) {
            setPic(res);
            setIsLoading(false);
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
  };

  const handleAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    const dateTime = new Date(expirateDate).getTime();
    if (storeValue && storeValue.user && dateTime && pic.url && !isLoading) {
      const values = {
        code,
        expirationDate: dateTime,
        discount,
        pic,
        quantity,
      };

      const res = await requests.addVoucher(values, storeValue.user.token);
      if (res.data.message === "ok") {
        getVoucher(1);
        handleToast(toast.success, "Add voucher successfully!");
        setCode("");
        setPic({
          url: "",
          public_id: "",
        });
        setDiscount("");
        setQuantity("");
      } else {
        handleToast(toast.error, "Add voucher failure!!");
      }
    }
  };

  return (
    <div className="text-[white]">
      <form>
        <div className="text-[white] text-[22px] pb-4 text-center">
          Add Voucher
        </div>
        <div>
          <div className="flex justify-between items-center gap-8">
            <div className="flex flex-1 flex-col gap-2 mb-4">
              <label htmlFor="">Code Name</label>
              <input
                className="p-2 rounded-md text-[#333]"
                type="text"
                name="code"
                placeholder="Enter code"
                onChange={(e) => setCode(e.target.value)}
                value={code}
              />
            </div>
            <div className="flex flex-1 flex-col gap-2 mb-4">
              <label htmlFor="">Discount</label>
              <input
                className="p-2 rounded-md text-[#333]"
                type="number"
                name="discount"
                placeholder="50 => 50%"
                onChange={(e) => setDiscount(e.target.value)}
                value={discount}
              />
            </div>
          </div>
          <div className="flex justify-between items-center gap-8">
            <div className="flex relative flex-1 flex-col gap-2 mb-4">
              <label htmlFor="">Expiration Date</label>
              <input
                type="text"
                className="p-2 rounded-md text-[#333]"
                onClick={() => setOpenDate(!openDate)}
                value={format(new Date(expirateDate), "dd-MM-yyyy")}
              />
              {openDate && (
                <Calendar
                  onChange={(item) => setExpirateDate(item)}
                  date={expirateDate}
                  minDate={new Date()}
                  className="absolute top-[76px]"
                />
              )}
            </div>
            <div className="flex flex-1 flex-col gap-2 mb-4">
              <label htmlFor="">Quantity</label>
              <input
                className="p-2 rounded-md text-[#333]"
                type="number"
                name="quantity"
                onClick={() => setOpenDate(false)}
                placeholder="Enter quantity"
                onChange={(e) => setQuantity(e.target.value)}
                value={quantity}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 mb-4">
            <label htmlFor="">Upload Image</label>
            <input
              className="p-2 rounded-md text-[#333] w-[200px]"
              type="file"
              name="image"
              onChange={handleUploadFile}
            />
          </div>
        </div>
        <button
          onClick={handleAdd}
          className="rounded-lg bg-[#383838] py-2 px-4 hover:opacity-80"
        >
          {isLoading ? (
            <i className="fa-solid fa-spinner animate-spin"></i>
          ) : (
            "ADD"
          )}
        </button>
      </form>
    </div>
  );
};

export default AddVoucher;
