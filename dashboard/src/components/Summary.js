import React, { useState, useEffect } from "react";
import axios from "axios";

const Summary = () => {
  const [userEmail, setUserEmail] = useState("");
  const [holdingsCount, setHoldingsCount] = useState(0);
  const [totalInvestment, setTotalInvestment] = useState(0);
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (email) setUserEmail(email.split("@")[0]); // naam jaisa dikhega

    axios.get("http://localhost:3002/allHoldings").then((res) => {
      const holdings = res.data;
      setHoldingsCount(holdings.length);

      const inv = holdings.reduce((sum, s) => sum + s.avg * s.qty, 0);
      const cur = holdings.reduce((sum, s) => sum + s.price * s.qty, 0);
      setTotalInvestment(inv.toFixed(2));
      setCurrentValue(cur.toFixed(2));
    });
  }, []);

  const pnl = (currentValue - totalInvestment).toFixed(2);
  const pnlPercent = totalInvestment > 0
    ? ((pnl / totalInvestment) * 100).toFixed(2)
    : 0;

  return (
    <>
      <div className="username">
        <h6>Hi, {userEmail || "User"}!</h6>
        <hr className="divider" />
      </div>

      <div className="section">
        <span><p>Equity</p></span>
        <div className="data">
          <div className="first">
            <h3>3.74k</h3>
            <p>Margin available</p>
          </div>
          <hr />
          <div className="second">
            <p>Margins used <span>0</span></p>
            <p>Opening balance <span>3.74k</span></p>
          </div>
        </div>
        <hr className="divider" />
      </div>

      <div className="section">
        <span><p>Holdings ({holdingsCount})</p></span>
        <div className="data">
          <div className="first">
            <h3 className={pnl >= 0 ? "profit" : "loss"}>
              ₹{pnl} <small>{pnlPercent}%</small>
            </h3>
            <p>P&L</p>
          </div>
          <hr />
          <div className="second">
            <p>Current Value <span>₹{currentValue}</span></p>
            <p>Investment <span>₹{totalInvestment}</span></p>
          </div>
        </div>
        <hr className="divider" />
      </div>
    </>
  );
};

export default Summary;