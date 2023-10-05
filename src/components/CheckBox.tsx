import React, { useEffect, useState } from "react";
import { ItemType } from "../page/item/Item";
import { ItemStateFlashSaleType } from "../page/flashSale/AddFlashSale";
import { ItemFlashSaleType } from "../page/flashSale/AddFlashSale";

export default function CheckBox({
  items,
  setArrItem,
  arrItem,
}: {
  items: ItemType[] | null;
  setArrItem: any;
  arrItem: any;
}) {
  const handleSelectItem = (
    e: React.ChangeEvent<HTMLInputElement>,
    itemId: string
  ) => {
    if (e.target.checked) {
      setArrItem([...arrItem, { itemId, quantity: 0 }]);
    } else {
      setArrItem(arrItem.filter((cp: any) => cp.itemId !== itemId));
    }
  };

  const handleInputQuantity = (
    e: React.ChangeEvent<HTMLInputElement>,
    itemId: string
  ) => {
    const index = arrItem.findIndex((i: any) => i.itemId === itemId);
    if (index >= 0) {
      const updatedItem = {
        ...arrItem[index],
        quantity: Number(e.target.value),
      };
      setArrItem([
        ...arrItem.slice(0, index),
        updatedItem,
        ...arrItem.slice(index + 1),
      ]);
    }
  };
  console.log(arrItem);

  // useEffect(() => {
  //   if (itemsValue.length && setArrItem) {
  //     setArrItem(itemsValue);
  //   }
  // }, [itemsValue]);

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
