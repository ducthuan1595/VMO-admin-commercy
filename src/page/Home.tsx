import { useContext, useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";
import { context } from "../store";
import { requests } from "../api";
import { ItemType } from "./item/Item";
import ShowSort from "../util/ShowSort";
import { SortType } from "../util/ShowSort";
import ChartRevenue from "../components/charts/Chart";
import { getRevenueMonth, getRevenueYear } from "../actions/orders";
import { getRecentYear } from "../data/chart";

interface UserType {
  username: string;
  email: string;
}
interface ItemsOrderType {
  itemId: ItemType;
  quantity: number;
  _id: string;
}

export interface OrderType {
  _id: string;
  amount: number;
  quantity: number;
  status: Status;
  items: ItemsOrderType[];
  userId: UserType;
}

interface ItemStateType {
  currPage: number;
  nextPage: boolean;
  prevPage: boolean;
  totalOrder: number;
  totalPage: number;
  orders: OrderType[];
}

type Status = "D0" | "D1" | "D2";

export default function Home() {
  const value = useContext(context);
  const [orders, setOrder] = useState<ItemStateType | null>(null);
  const [key, setKey] = useState<string>("");
  const [amountOrder, setAmountOrder] = useState<number | undefined>(0);
  const [users, setUsers] = useState<UserType[] | null>(null);
  const [sort, setSort] = useState<SortType>({
    type: "default",
    column: "",
  });

  const [type, setType] = useState('month');
  const [byYear, setByYear] = useState(new Date().getFullYear());
  const [revenues, setRevenues] = useState({});
  const [showYear, setShowYear] = useState(false);

  const [totalProduct, setTotalProduct] = useState<number>(0);

  const getItem = async (
    page: number | null,
    type: string | null,
    column: string | null
  ) => {
    if (value && value.user && value.user.token) {
      const limit: number = 8;
      const res = await requests.getItem(
        null,
        null,
        null,
        page,
        limit,
        type,
        column,
        null,
        false,
        value.user.token
      );


      if (res.data.message === "ok") {
        setTotalProduct(res.data.data.totalNumber);
      }
    }
  };
  useEffect(() => {
    getItem(1, null, null);
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      if (value && value.user) {
        const limit = 10;
        const page = 1;
        const k = key ? key : null;
        const res = await requests.getUser(page, limit, k, value.user.token);

        if (res.data.message === "ok") {
          setUsers(res.data.data);
        }
      }
    };
    fetchUser();
  }, []);

  const fetchOrder = async (
    page: number,
    type: string | null,
    column: string | null
  ) => {
    if (value && value.user) {
      const limit = 10;
      const res = await requests.getOrder(
        page,
        limit,
        type,
        column,
        value.user.token
      );
      if (res.data.message === "ok") {
        setOrder(res.data.data);
      }
    }
  };

  useEffect(() => {
    fetchOrder(1, null, null);
  }, [value]); 

  // GET REVENUE API
  useEffect(() => {
    const getRevenue = async () => {
      if (type === "month") {
        const data = await getRevenueMonth(type, byYear);
        setAmountOrder(data.totalMount);
        setRevenues(data.result);
      } else {
        const data = await getRevenueYear("year");
        console.log(data);

        setAmountOrder(data.totalMount);
        setRevenues(data.result);
      }
    };
    getRevenue();
  }, [type, byYear]);

  useEffect(() => {
    if (sort && sort.type && sort.column) {
      fetchOrder(1, sort.type, sort.column);
    }
  }, [sort]);

  const handleSort = (column: string) => {
    setSort({
      ...sort,
      column: column,
      type: sort.type === "desc" ? "asc" : "desc",
    });
  };

  const handleNextPage = () => {
    if (orders && orders.currPage && orders.nextPage) {
      const page = +orders.currPage + 1;
      fetchOrder(page, null, null);
    }
  };
  const handlePrevPage = () => {
    if (orders && orders.currPage && orders.prevPage) {
      const page = +orders.currPage - 1;
      fetchOrder(page, null, null);
    }
  };

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-[white] text-[32px] pb-4">Dashboard</h1>
        <span className="text-[white] bg-[#383838] text-center rounded-xl ml-3 h-[40px] px-2 hover:opacity-80 leading-[2.4]"></span>
      </div>
      <div className="text-[white]">
        <div className="flex justify-between gap-2">
          <div className="flex flex-col bg-[#232323] p-4 min-w-[200px] flex-1 rounded-md">
            <div className="flex justify-between items-center">
              <span className="text-[22px]">{users?.length} persons</span>
              <i className="fa-solid fa-user-plus fa-beat"></i>
            </div>
            <p className="text-[#7b7e7e]">Users</p>
          </div>
          <div className="flex flex-col bg-[#232323] p-4 min-w-[200px] flex-1 rounded-md">
            <div className="flex justify-between items-center">
              <span className="text-[22px]">
                {amountOrder &&
                  Math.floor(amountOrder)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                VND
              </span>
              <i className="fa-solid fa-chart-line fa-beat"></i>
            </div>
            <p className="text-[#7b7e7e]">Revenue</p>
          </div>
          <div className="flex flex-col bg-[#232323] p-4 min-w-[200px] flex-1 rounded-md">
            <div className="flex justify-between items-center">
              <span className="text-[22px]">{totalProduct} items</span>
              <i className="fa-solid fa-book fa-beat"></i>
            </div>
            <p className="text-[#7b7e7e]">Products</p>
          </div>
          <div className="flex flex-col bg-[#232323] p-4 min-w-[200px] flex-1 rounded-md">
            <div className="flex justify-between items-center">
              <span className="text-[22px]">{orders?.totalOrder} orders</span>
              <i className="fa-solid fa-cart-shopping fa-beat"></i>
            </div>
            <p className="text-[#7b7e7e]">Orders</p>
          </div>
        </div>
      </div>
      {/* outcome */}
      <div className="flex items-center gap-5 mt-5 mb-2">
        <div className="relative">
          <button
            onClick={() => setShowYear(true)}
            className="text-sm border border-dashed border-neutral-500 bg-black p-y2 w-[80px] rounded-md text-neutral-400"
          >
            Monthly
          </button>
          {showYear && (
            <ul className="absolute top-[25px] left-2 right-2 bg-neutral-100 rounded">
              {getRecentYear().map((y) => (
                <li
                  onClick={() => {
                    setType("month");
                    setByYear(y);
                    setShowYear(false);
                  }}
                  key={y}
                  className="text-neutral-500 text-center rounded hover:bg-neutral-200 px-2 py-1 text-sm cursor-pointer"
                >
                  {y}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <button
            className="text-sm border border-neutral-800 border-dashed bg-neutral-500 py2 w-[80px] rounded-md text-black"
            onClick={() => {
              setType("year")
              setShowYear(false);
            }}
          >
            Yearly
          </button>
        </div>
      </div>

      <ChartRevenue revenues={revenues} type={type} byYear={byYear} />

      {/* list order */}
      <div>
        <div className="text-[white] mt-12 text-[22px] text-center">
          List Order
        </div>
        <table className="text-[#333] mt-4">
          <thead>
            <tr>
              <th>STT</th>
              <th>Username </th>
              <th>Email</th>
              <th>Product</th>
              <th>
                Amount{" "}
                <span
                  className="text-[#07bc0c] cursor-pointer"
                  onClick={() => handleSort("amount")}
                >
                  <ShowSort sort={sort} column="amount" />
                </span>
              </th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders &&
              orders.orders &&
              orders.orders.map((c, i) => {
                const status = {
                  D0: "Delivering",
                  D1: "Delivered",
                  D2: "Canceled",
                };
                let currStatus = status[c.status];
                let textColor;
                if (c.status === "D0") textColor = "#da33caf2";
                if (c.status === "D1") textColor = "#2acd2abd";
                if (c.status === "D2") textColor = "red";

                return (
                  <tr key={c._id}>
                    <td className="text-center">{i + 1}</td>
                    <td className="capitalize">{c.userId?.username}</td>
                    <td className="">{c.userId?.email}</td>
                    <td className="">
                      {c.items.map((i) => {
                        return (
                          <div className="w-full" key={i._id}>
                            <span>
                              {i.itemId.name}({i.quantity})
                            </span>
                          </div>
                        );
                      })}
                    </td>
                    <td>
                      {c.amount
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                      đ
                    </td>
                    <td style={{ color: `${textColor}` }}>{currStatus}</td>
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
            <span>
              {orders.currPage} / {orders.totalPage}
            </span>
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
