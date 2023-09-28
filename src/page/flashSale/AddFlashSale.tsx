import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import DatePicker from "react-datepicker";
import { toast } from "react-toastify";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import "react-datepicker/dist/react-datepicker.css";

import { requests } from "../../api";
import { context } from "../../store";
import handleToast from "../../util/toast";
import CheckBox from "../../components/CheckBox";
import { ItemType } from "../item/Item";

export interface ItemFlashSaleType {
  itemId: string;
  quantity: number;
}

function debounce(fn: () => Promise<void>, ms: number) {
  let timer: NodeJS.Timeout;

  return function () {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn();
    }, ms);
  };
}

const AddFlashSale = ({
  getFlashSales,
}: {
  getFlashSales: (num: number) => Promise<void>;
}) => {
  const storeValue = useContext(context);
  const searchItem = useRef<HTMLInputElement>(null);

  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [discountPercent, setDiscountPercent] = useState("");
  const [items, setItems] = useState<ItemType[]>([]);
  const [arrItem, setArrItem] = useState<ItemFlashSaleType[]>([]);

  const filterPassedTime = (time: any) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };

  const getItem = async () => {
    if (storeValue && storeValue.user && storeValue.user.token && searchItem) {
      const token = storeValue.user.token;
      const key = searchItem?.current?.value ?? "";

      const res = await requests.getItem(
        null,
        key,
        null,
        null,
        null,
        null,
        null,
        null,
        token
      );

      if (res.data.message === "ok") {
        setItems(res.data.data);
      }
    }
  };

  const debounceDropDown = useRef(debounce(getItem, 1500)).current;
  const handleRequest = () => {
    debounceDropDown();
  };

  // const callApi = useCallback(debounce(getItem, 3000), []);
  // useEffect(() => {
  // }, [searchItem]);

  const handleAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (storeValue && storeValue.user) {
      console.log(arrItem);

      const valueInput = {
        name,
        startDate,
        endDate,
        discountPercent,
        arrItem,
      };

      const res = await requests.createFlashSale(
        valueInput,
        storeValue.user.token
      );
      console.log(res);

      if (res.data.message === "ok") {
        getFlashSales(1);
        handleToast(toast.success, "Add Flash sale successfully!");
        setName("");
        setDiscountPercent("");
        setStartDate(undefined);
        setEndDate(undefined);
        setArrItem([]);
      } else {
        handleToast(toast.error, res.data.message);
      }
    }
  };

  return (
    <div className="text-[white]">
      <form>
        <div className="text-[white] text-[22px] pb-4 text-center">
          Add Flash Sale
        </div>
        <div>
          <div className="flex justify-between items-center gap-8">
            <div className="flex flex-1 flex-col gap-2 mb-4">
              <label htmlFor="">Name</label>
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
              <label htmlFor="">Discount %</label>
              <input
                className="p-2 rounded-md text-[#333]"
                type="number"
                name="quantity"
                placeholder="20"
                onChange={(e) => setDiscountPercent(e.target.value)}
                value={discountPercent}
              />
            </div>
          </div>
          <div className="flex justify-between items-center gap-8">
            <div className="flex relative flex-1 flex-col gap-2 mb-4">
              <label htmlFor="">Date Start</label>
              <DatePicker
                selected={startDate}
                minDate={new Date()}
                dateFormat="MMMM d, yyyy h:mm aa"
                timeFormat="HH:mm"
                showTimeSelect
                filterTime={filterPassedTime}
                onChange={(date: Date) => setStartDate(date)} //only when value has changed
                className="text-[#333] p-2 rounded-lg w-full flex"
              />
            </div>
            <div className="flex relative flex-1 flex-col gap-2 mb-4">
              <label htmlFor="">Date Start</label>
              <DatePicker
                selected={endDate}
                minDate={new Date()}
                dateFormat="MMMM d, yyyy h:mm aa"
                timeFormat="HH:mm"
                showTimeSelect
                filterTime={filterPassedTime}
                onChange={(date: Date) => setEndDate(date)} //only when value has changed
                className="text-[#333] p-2 rounded-lg w-full flex"
              />
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-2 mb-4">
            <label htmlFor="">Search Product</label>
            <input
              className="p-2 rounded-md text-[#333]"
              type="text"
              name="searchItem"
              placeholder="Search Product"
              onChange={handleRequest}
              ref={searchItem}
              // value={searchItem}
            />
            <CheckBox items={items} setArrItem={setArrItem} />
          </div>
        </div>
        <button
          onClick={handleAdd}
          className="rounded-lg bg-[#383838] py-2 px-4 hover:opacity-80"
        >
          ADD
        </button>
      </form>
    </div>
  );
};

export default AddFlashSale;
