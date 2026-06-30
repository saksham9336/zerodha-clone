import React, { useState, useEffect } from "react";
import axios from "axios";

const Funds = () => {
  const [availableMargin, setAvailableMargin] = useState(0);
  const [usedMargin, setUsedMargin] = useState(0);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showAccountModal, setShowAccountModal] = useState(false);

  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  const fetchFunds = () => {
    axios
      .get("http://localhost:3002/funds", {
        headers: { authorization: token },
      })
      .then((res) => {
        setAvailableMargin(res.data.availableMargin);
        setUsedMargin(res.data.usedMargin);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchFunds();
  }, []);

  const handleAddFunds = () => {
    if (!amount || amount <= 0) {
      setMessage("Please enter a valid amount");
      return;
    }
    axios
      .post(
        "http://localhost:3002/funds/add",
        { amount },
        { headers: { authorization: token } }
      )
      .then((res) => {
        if (res.data.success) {
          setAvailableMargin(res.data.funds.availableMargin);
          setMessage("");
          setAmount("");
          setShowAddModal(false);
        }
      })
      .catch(() => setMessage("Something went wrong"));
  };

  const handleWithdraw = () => {
    if (!amount || amount <= 0) {
      setMessage("Please enter a valid amount");
      return;
    }
    axios
      .post(
        "http://localhost:3002/funds/withdraw",
        { amount },
        { headers: { authorization: token } }
      )
      .then((res) => {
        if (res.data.success) {
          setAvailableMargin(res.data.funds.availableMargin);
          setMessage("");
          setAmount("");
          setShowWithdrawModal(false);
        } else {
          setMessage(res.data.msg);
        }
      })
      .catch(() => setMessage("Something went wrong"));
  };

  return (
    <>
      <div className="funds">
        <p>Instant, zero-cost fund transfers with UPI </p>
        <button className="btn btn-green" onClick={() => { setShowAddModal(true); setMessage(""); setAmount(""); }}>
          Add funds
        </button>
        <button className="btn btn-blue" onClick={() => { setShowWithdrawModal(true); setMessage(""); setAmount(""); }}>
          Withdraw
        </button>
      </div>

      <div className="row">
        <div className="col">
          <span><p>Equity</p></span>
          <div className="table">
            <div className="data">
              <p>Available margin</p>
              <p className="imp colored">{availableMargin.toFixed(2)}</p>
            </div>
            <div className="data">
              <p>Used margin</p>
              <p className="imp">{usedMargin.toFixed(2)}</p>
            </div>
            <div className="data">
              <p>Available cash</p>
              <p className="imp">{availableMargin.toFixed(2)}</p>
            </div>
            <hr />
            <div className="data">
              <p>Opening Balance</p>
              <p>{availableMargin.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="commodity">
            <p>You don't have a commodity account</p>
            <button className="btn btn-blue" onClick={() => setShowAccountModal(true)}>
              Open Account
            </button>
          </div>
        </div>
      </div>

      {/* Add Funds Modal */}
      {showAddModal && (
        <div style={overlayStyle}>
          <div style={modalStyle}>
            <h3>Add Funds</h3>
            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={inputStyle}
            />
            {message && <p style={{ color: "red" }}>{message}</p>}
            <div style={btnRowStyle}>
              <button className="btn btn-green" onClick={handleAddFunds}>Add</button>
              <button className="btn btn-grey" onClick={() => setShowAddModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Withdraw Modal */}
      {showWithdrawModal && (
        <div style={overlayStyle}>
          <div style={modalStyle}>
            <h3>Withdraw Funds</h3>
            <p>Available: ₹{availableMargin.toFixed(2)}</p>
            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={inputStyle}
            />
            {message && <p style={{ color: "red" }}>{message}</p>}
            <div style={btnRowStyle}>
              <button className="btn btn-blue" onClick={handleWithdraw}>Withdraw</button>
              <button className="btn btn-grey" onClick={() => setShowWithdrawModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Open Account Modal */}
      {showAccountModal && (
        <div style={overlayStyle}>
          <div style={modalStyle}>
            <h3>Open Commodity Account</h3>
            <p>Your commodity account request has been submitted successfully! Our team will reach out within 24 hours.</p>
            <div style={btnRowStyle}>
              <button className="btn btn-blue" onClick={() => setShowAccountModal(false)}>OK</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const overlayStyle = {
  position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
  background: "rgba(0,0,0,0.5)", display: "flex",
  alignItems: "center", justifyContent: "center", zIndex: 1000,
};

const modalStyle = {
  background: "#fff", padding: "30px", borderRadius: "8px",
  width: "320px", boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
};

const inputStyle = {
  width: "100%", padding: "10px", margin: "10px 0",
  border: "1px solid #ccc", borderRadius: "5px",
};

const btnRowStyle = {
  display: "flex", gap: "10px", marginTop: "10px",
};

export default Funds;