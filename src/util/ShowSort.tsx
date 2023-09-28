import React from "react";

export interface SortType {
  type: "default" | "desc" | "asc";
  column: string;
}

const ShowSort = ({ sort, column }: { sort: SortType; column: string }) => {
  const currType = sort.column === column ? sort.type : "default";
  const icons = {
    default: "fa-solid fa-sort",
    asc: "fa-solid fa-arrow-up-wide-short",
    desc: "fa-solid fa-arrow-down-wide-short",
  };
  const types = {
    default: "asc",
    asc: "desc",
    desc: "asc",
  };

  const icon = icons[currType];
  const type = types[currType];

  return (
    <>
      <i className={icon}></i>
    </>
  );
};

export default ShowSort;
