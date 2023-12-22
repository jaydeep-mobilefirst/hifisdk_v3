import React, { useState } from "react";
import "./transaction.css";
import axios from "axios";

interface Option {
  value: string;
  label: string;
}

const options: Option[] = [
  {
    value: "eth",
    label: "Ethereum",
  },
  {
    value: "avax",
    label: "Avalanche",
  },
  {
    value: "zrx",
    label: "0x",
  },
  {
    value: "near",
    label: "Near Protocol",
  },
  {
    value: "usdc",
    label: "USDC Stablecoin",
  },
  {
    value: "link",
    label: "Chainlink",
  },
  {
    value: "yfi",
    label: "Yearn Finance",
  },
  {
    value: "bat",
    label: "Basic Attention Token",
  },

  {
    value: "usdt",
    label: "Tether Stablecoin",
  },
  {
    value: "sol",
    label: "Solana",
  },
  {
    value: "uni",
    label: "Uniswap",
  },
  {
    value: "sushi",
    label: "SushiSwap",
  },
];

const Transaction = ({
  handleTransaction,
  walletname,
  walletAddress,
  currancy,
  currencyName,
  setCurrencyName,
  currencyValue
}: any) => {
  const handleDropdownChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedValue = event.target.value;
    const currencyName =
      options.find((option) => option.value === selectedValue) || null;
    setCurrencyName(currencyName?.value);
  };
  return (
    <>
      <div className="container">
        <div className="header-style"></div>
        <div style={{ padding: "8px 24px" }}>
          <p className="text">Wallet Type</p>
          <div className="wallet-type">
            <div className="wallet-type-text">{walletname}</div>
          </div>
        </div>
        <div style={{ padding: "8px 24px" }}>
          <p className="text">Wallet Name</p>
          <div className="wallet-type">
            <div className="wallet-type-text">{walletAddress}</div>
          </div>
        </div>
        <div style={{ padding: "8px 24px" }}>
          <p className="text">Selected Currancy</p>
          {/* <div className="wallet-type"> */}
          {/* <div className="wallet-type-text">{currancy}</div> */}

          <div className="wallet-type">
            <select
              onChange={handleDropdownChange}
              value={currencyName || ""}
              className="wallet-type-text"
            >
              {/* <option value="eth">Ethereum</option> */}
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {/* </div> */}
          </div>
        </div>
        <div style={{ padding: "8px 24px" }}>
          <div className="wallet-type">
            {currencyValue}
          </div>
        </div>

        <div style={{ padding: "8px 24px" }}>
          <button className="button" onClick={handleTransaction}>
            <div className="button-text">Proceed Payment</div>
          </button>
        </div>
      </div>
    </>
  );
};

export default Transaction;
