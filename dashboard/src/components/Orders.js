import React, { useState, useEffect } from "react";
import axios from "axios";

const Orders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get((process.env.REACT_APP_API_URL + "/allOrders"), {
        headers: { authorization: token },
      })
      .then((res) => setAllOrders(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="orders">
      {allOrders.length === 0 ? (
        <>
          <h6 style={{ fontWeight: 600, padding: "20px" }}>You haven't placed any orders today</h6>
          <p style={{ padding: "0 20px", color: "grey" }}>
            Your orders will show up here once you place a buy or sell order.
          </p>
        </>
      ) : (
        <div className="order-table" style={{ padding: "20px" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={thStyle}>Instrument</th>
                <th style={thStyle}>Qty.</th>
                <th style={thStyle}>Price</th>
                <th style={thStyle}>Mode</th>
                <th style={thStyle}>Time</th>
              </tr>
            </thead>
            <tbody>
              {allOrders.map((order, index) => (
                <tr key={index}>
                  <td style={tdStyle}>{order.name}</td>
                  <td style={tdStyle}>{order.qty}</td>
                  <td style={tdStyle}>{order.price}</td>
                  <td style={{ ...tdStyle, color: order.mode === "SELL" ? "red" : "green", fontWeight: "bold" }}>
                    {order.mode}
                  </td>
                  <td style={tdStyle}>{new Date(order.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const thStyle = { textAlign: "left", padding: "10px", borderBottom: "2px solid #eee", color: "grey" };
const tdStyle = { padding: "10px", borderBottom: "1px solid #eee" };

export default Orders;
