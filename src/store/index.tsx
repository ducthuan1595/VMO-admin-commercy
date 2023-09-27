import React, { createContext, useEffect, useState } from "react";

interface User {
  name: string;
  email: string;
  token: string;
  // setUser?: (user: User) => void;
}

interface UserSectionContextType {
  user: User | null;
  setUser?: React.Dispatch<React.SetStateAction<User | null>>;
  totalProduct: number | null;
  setTotalProduct: React.Dispatch<React.SetStateAction<number | null>>;
}

const currUser = localStorage.getItem("admin-book");

export const context = createContext<UserSectionContextType | null>(null);

const ProviderContext = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(
    currUser && JSON.parse(currUser)
  );
  const [totalProduct, setTotalProduct] = useState<number | null>(0);

  useEffect(() => {
    // if (user) {
    localStorage.setItem("admin-book", JSON.stringify(user));
    // }
  }, [user]);

  const value: UserSectionContextType = {
    user,
    setUser,
    totalProduct,
    setTotalProduct,
  };

  return <context.Provider value={value}>{children}</context.Provider>;
};

export default ProviderContext;
