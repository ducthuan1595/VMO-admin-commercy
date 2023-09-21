import React, { useState } from "react";
import MainLayout from "../../layout/MainLayout";

const AddVoucher: React.FC = () => {
  const [code, setCode] = useState("");
  const [expirateDate, setExpirateDate] = useState("");
  const [discount, setDiscount] = useState("");
  const [image, setImage] = useState("");
  const [quantity, setQuantity] = useState(0);

  return (
    <MainLayout>
      <div>
        <form>
          <h1>ADD VOUCHER</h1>
          <div>
            <div>
              <label>Code</label>
              <input
                type="text"
                onChange={(e) => setCode(e.target.value)}
                name="code"
                value={code}
                placeholder="Enter code"
              />
            </div>
            <div>
              <label>Code</label>
              <input
                type="text"
                onChange={(e) => setExpirateDate(e.target.value)}
                name="code"
                value={expirateDate}
                placeholder="Enter code"
              />
            </div>
          </div>
          <button>Add</button>
        </form>
      </div>
    </MainLayout>
  );
};

export default AddVoucher;
