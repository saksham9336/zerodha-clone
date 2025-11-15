import React from "react";

const appsList = [
  {
    name: "Kite",
    desc: "Ultra-fast trading platform with sleek UI and powerful tools.",
    link: "https://kite.zerodha.com",
  },
  {
    name: "Coin",
    desc: "Invest in mutual funds directly without commissions.",
    link: "https://coin.zerodha.com",
  },
  {
    name: "Streak",
    desc: "Strategy backtesting and algo-trading simplified.",
    link: "https://www.streak.tech",
  },
  {
    name: "Sensibull",
    desc: "Options trading platform with strategies & tools.",
    link: "https://sensibull.com",
  },
  {
    name: "Smallcase",
    desc: "Curated baskets of stocks for long-term investing.",
    link: "https://www.smallcase.com",
  },
  {
    name: "Ditto Insurance",
    desc: "Simple health & term insurance guidance.",
    link: "https://joinditto.in",
  },
];

const Apps = () => {
  return (
    <div className="apps-page">
      <h2>Explore Zerodha Apps</h2>
      <p className="apps-subtitle">
        All investing & trading apps linked with your Zerodha account.
      </p>

      <div className="app-grid">
        {appsList.map((app, index) => (
          <div className="app-card" key={index}>
            <h3>{app.name}</h3>
            <p>{app.desc}</p>
            <a href={app.link} target="_blank" rel="noopener noreferrer">
              Visit App →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Apps;
