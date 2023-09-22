import { Outlet, useNavigate } from "react-router-dom";
import React, { useContext, useEffect } from "react";
import { context } from "../store";

const CheckOutlet = ({
  children,
}: {
  children?: React.ReactElement | undefined;
}) => {
  const navigate = useNavigate();
  const value = useContext(context);

  useEffect(() => {
    const checkAdmin = () => {
      if (!value || !value.user) {
        navigate("/login", { replace: true });
      }
    };
    checkAdmin();
  }, [value, navigate]);

  return <>{children ? children : <Outlet />}</>;
};

export default CheckOutlet;
