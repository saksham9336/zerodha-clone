import React, { useState, useEffect } from "react";

import Menu from "./Menu";

const TopBar = () => {
  const [nifty, setNifty] = useState({ value: 24812.50, change: 0.32 });
  const [sensex, setSensex] = useState({ value: 81562.75, change: -0.18 });

  useEffect(() => {
    // Har 5 second mein thoda random fluctuation simulate karo (jaise real market)
    const interval = setInterval(() => {
      setNifty((prev) => {
        const delta = (Math.random() - 0.5) * 20;
        const newValue = prev.value + delta;
        const newChange = ((delta / prev.value) * 100).toFixed(2);
        return { value: newValue, change: parseFloat(newChange) };
      });

      setSensex((prev) => {
        const delta = (Math.random() - 0.5) * 60;
        const newValue = prev.value + delta;
        const newChange = ((delta / prev.value) * 100).toFixed(2);
        return { value: newValue, change: parseFloat(newChange) };
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="topbar-container">
      <div className="indices-container">
        <div className="nifty">
          <p className="index">NIFTY 50</p>
          <p className="index-points">{nifty.value.toFixed(2)}</p>
          <p className={`percent ${nifty.change >= 0 ? "up" : "down"}`}>
            {nifty.change >= 0 ? "+" : ""}
            {nifty.change}%
          </p>
        </div>
        <div className="sensex">
          <p className="index">SENSEX</p>
          <p className="index-points">{sensex.value.toFixed(2)}</p>
          <p className={`percent ${sensex.change >= 0 ? "up" : "down"}`}>
            {sensex.change >= 0 ? "+" : ""}
            {sensex.change}%
          </p>
        </div>
      </div>

      <Menu />
    </div>
  );
};

export default TopBar;