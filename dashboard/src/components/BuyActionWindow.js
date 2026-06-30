import React, { useState, useContext } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid, mode }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);

  const generalContext = useContext(GeneralContext);
  const token = localStorage.getItem("token");

  const handleActionClick = () => {
    axios
      .post(
        "http://localhost:3002/newOrder",
        {
          name: uid,
          qty: stockQuantity,
          price: stockPrice,
          mode: mode, // BUY ya SELL
        },
        { headers: { authorization: token } }
      )
      .then(() => {
        alert(`${mode === "SELL" ? "Sell" : "Buy"} order placed for ${uid}!`);
        handleClose();
      })
      .catch(() => alert("Order failed. Try again."));
  };

  const handleClose = () => {
    if (mode === "SELL") {
      generalContext.closeSellWindow();
    } else {
      generalContext.closeBuyWindow();
    }
  };

  return (
    <div className="container" id="buy-window" draggable="true">
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              onChange={(e) => setStockQuantity(e.target.value)}
              value={stockQuantity}
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
              onChange={(e) => setStockPrice(e.target.value)}
              value={stockPrice}
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span>Margin required ₹140.65</span>
        <div>
          <button
            className={mode === "SELL" ? "btn btn-red" : "btn btn-blue"}
            onClick={handleActionClick}
            style={mode === "SELL" ? { backgroundColor: "#e74c3c" } : {}}
          >
            {mode === "SELL" ? "Sell" : "Buy"}
          </button>
          <button className="btn btn-grey" onClick={handleClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;