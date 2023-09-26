import React, { useEffect, useState } from "react";
import { ItemType } from "../page/item/Item";
import { ItemFlashSaleType } from "../page/flashSale/AddFlashSale";

export default function CheckBox({
  items,
  setArrItem,
}: {
  items: ItemType[];
  setArrItem: any;
}) {
  const [itemsValue, setItemsValue] = useState<
    { itemId: string; quantity: number }[]
  >([]);

  const handleSelectItem = (
    e: React.ChangeEvent<HTMLInputElement>,
    itemId: string
  ) => {
    if (e.target.checked) {
      setItemsValue([...itemsValue, { itemId, quantity: 0 }]);
    } else {
      setItemsValue(itemsValue.filter((cp) => cp.itemId !== itemId));
    }
  };

  const handleInputQuantity = (
    e: React.ChangeEvent<HTMLInputElement>,
    itemId: string
  ) => {
    const index = itemsValue.findIndex((i) => i.itemId === itemId);
    if (index >= 0) {
      const updatedItem = {
        ...itemsValue[index],
        quantity: Number(e.target.value),
      };
      setItemsValue([
        ...itemsValue.slice(0, index),
        updatedItem,
        ...itemsValue.slice(index + 1),
      ]);
    }
  };
  console.log(itemsValue);

  useEffect(() => {
    setArrItem(itemsValue);
  }, [itemsValue]);

  return (
    <div>
      {items &&
        items.map((item: ItemType) => {
          return (
            <div key={item._id} className="mb-2">
              <input
                id={item._id}
                type="checkbox"
                // value={itemsValue}
                onChange={(e) => handleSelectItem(e, item._id)}
              />
              <label htmlFor={item._id}>{item.name}</label>
              <input
                className="w-[80px] rounded-xl px-1 ml-2 text-[#333]"
                type="number"
                // value={quantity}
                placeholder="Quantity"
                onChange={(e) => handleInputQuantity(e, item._id)}
              />
            </div>
          );
        })}
    </div>
  );
}
