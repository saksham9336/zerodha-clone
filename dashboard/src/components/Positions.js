import React, { useState, useEffect } from "react";
import axios from "axios";

const Positions = () => {
  const [allPositions, setAllPositions] = useState([]);

  useEffect(() => {
    axios.get((process.env.REACT_APP_API_URL + "/allPositions")).then((res) => {
      setAllPositions(res.data);
    });
  }, []);

  return (
    <>
      <h3 className="title">Positions ({allPositions.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg.</th>
              <th>LTP</th>
              <th>P&L</th>
              <th>Chg.</th>
            </tr>
          </thead>
          <tbody>
            {allPositions.length === 0 ? (
              <tr><td colSpan="7" style={{ textAlign: "center" }}>No positions found</td></tr>
            ) : (
              allPositions.map((stock, index) => {
                const avg = stock.avg || 0;
                const price = stock.price || 0;
                const qty = stock.qty || 0;

                const curValue = price * qty;
                const isProfit = curValue - avg * qty >= 0.0;
                const profClass = isProfit ? "profit" : "loss";
                const dayClass = stock.isLoss ? "loss" : "profit";

                return (
                  <tr key={index}>
                    <td>{stock.product}</td>
                    <td>{stock.name}</td>
                    <td>{qty}</td>
                    <td>{avg.toFixed(2)}</td>
                    <td>{price.toFixed(2)}</td>
                    <td className={profClass}>
                      {(curValue - avg * qty).toFixed(2)}
                    </td>
                    <td className={dayClass}>{stock.day}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Positions;
