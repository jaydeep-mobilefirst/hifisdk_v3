import React, { useState, useEffect } from "react";
// import { useSDK } from "@metamask/sdk-react";
import Transaction from "./Transaction";
import Connection from "./Connection";
import axios from "axios";
import Loader from "./Loader";
import Done from "./Done";
import web3 from "web3";
import { convertToHex } from "../utils/value";
import Transaction3 from "./Transaction3";
import EthereumAccountComponent from "../utils/EthereumAccountComponent";

const Walletscreen = ({ queryParams }: any) => {
  const [account, setAccount] = useState<any>();
  const [showTransaction, setTansaction] = useState(false);
  const [currencyName, setCurrencyName] = useState("eth");
  const [currencyValue, setCurrencyValue] = useState<any>();
  const [merchantWallet, setMarchantWallet] = useState<any>();
  const [allCurrency, setAllCurrencyList] = useState();
  const [loader, setLoader] = useState(false);
  const [transactionDone, setTransactionDone] = useState(false);
  const [tnxHax, setTnxHax] = useState<any>();
  const [quoteId, setQuoteId] = useState<any>();
  const [cryptoPrice, setCryptoPrice] = useState<any>();
  const [state, setState] = useState<boolean>(true);
  const dollaramount = queryParams?.price ? queryParams?.price : 5;
  const account2 = "0x484d16Ff3D39EC5F525206aa2b902Bd369189dE8";

  // const { sdk, connected, connecting, provider, chainId, balance } = useSDK();

  // 838a911a-3e2a-4411-842a-7befaf0f0ae0
  // 4fb4ef7b-5576-431b-8d88-ad0b962be1df
  const merchant = "4fb4ef7b-5576-431b-8d88-ad0b962be1df";
  const MerchantWalletAddress = `https://api.hifibridge.com/user/${merchant}/wallet/address/${currencyName}`;
  const getCurrency = "https://api.hifibridge.com/currency/list";
  const convertCurrancy = `https://api.hifibridge.com/user/${merchant}/currency/quote`;
  const datasend = `https://api.hifibridge.com/customer/${merchant}/wallet/address`;

  // merchant wallet address
  useEffect(() => {
    axios
      .get(MerchantWalletAddress)
      .then((response) => {
        setMarchantWallet(response?.data?.data?.address);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [currencyName]);

  // currancy list
  useEffect(() => {
    axios
      .get(getCurrency)
      .then((response) => {
        setAllCurrencyList(response?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // convert doller to selected currancy
  useEffect(() => {
    axios
      .post(convertCurrancy, {
        amount: dollaramount,
        currency: currencyName,
      })
      .then((response) => {
        setCurrencyValue(response?.data?.data?.quantity);
        console.log(response?.data?.data?.quantity, "crypto quant");
        setQuoteId(response?.data?.data?.quote_id);
        console.log(response?.data?.data?.quote_id, "id");
        setCryptoPrice(response?.data?.data?.sell_price);
        console.log(response?.data?.data?.sell_price, "price");
      })
      .catch((error) => {
        console.log(error);
      });
  }, [currencyName, state]);

  // send crypto currancy
  const sendEth = async () => {
    setLoader(true);
    
    try {
      // @ts-ignore
      const txHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: account2,
            to: merchantWallet, // Replace with the actual recipient address
            value: convertToHex(currencyValue), // Replace with the actual value in wei
            // value: web3.utils.toWei(currencyValue.toString(), "ether"),
            // gasLimit: "0x5028",
            // maxPriorityFeePerGas: "0x3b9aca00",
            // maxFeePerGas: "0x2540be400",
          },
        ],
      });
      setLoader(false);
      if (txHash) {
        setTransactionDone(true);
        valueSendToBackend();
      }
      setTnxHax(txHash);
    } catch (error) {
      setLoader(false);
      console.error(error);
    }
  };

  // send data to database
  const valueSendToBackend = () => {
    axios
      .post(datasend, {
        merchantAddress: merchantWallet.toLowerCase(), // convert to lowercase and pass
        customerAddress: account.toLowerCase(), // convert to lowercase and pass
        inwardCurrency: currencyName,
        inwardBaseAmount: currencyValue,
        outwardCurrency: "usd",
        outwardBaseAmount: dollaramount,
        walletType: "MetaMask",
        email: queryParams?.email,
        name: queryParams?.name, //sdk
        quoteId: quoteId,
        oneCryptoPrice: cryptoPrice,
        description:
          queryParams?.product_title + " " + queryParams?.product_description, //randon description(product name)
        txHash: tnxHax,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // connect wallet
  const connect = async () => {
    setState(!state);

    try {
      // Request Ethereum accounts
      // @ts-ignore
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
        params: [],
      });

      // Update the state with the selected account
      // @ts-ignore
      setAccount(accounts[0]);

      setTansaction(true);
    } catch (error) {
      console.error("Error requesting accounts:", error);
    }
    // try {
    //   const accounts = await sdk?.connect();
    //   // @ts-ignore
    //   setAccount(accounts?.[0]);
    //   setTansaction(true);
    // } catch (err) {
    //   console.warn(`failed to connect..`, err);
    // }
  };

  const connectCoinbase = (userAddress: string) => {
    // Your logic to handle the connected user address (e.g., store it in state, dispatch an action, etc.)
    console.log(`Connected to Coinbase. User's address: ${userAddress}`);
  };

  return (
    <div className="flex items-center justify-center">
      <EthereumAccountComponent onConnect={connectCoinbase} />
      {transactionDone ? (
        <Done merchantName={queryParams?.merchant_name} />
      ) : (
        <>
          {" "}
          {showTransaction ? (
            <>
              {loader ? (
                <>
                  <Loader />
                </>
              ) : (
                <>
                  <Transaction3
                    handleTransaction={sendEth}
                    walletname="MetaMask"
                    walletAddress={account}
                    currancy="chainid"
                    allCurrency={allCurrency}
                    currencyName={currencyName}
                    setCurrencyName={setCurrencyName}
                    currencyValue={currencyValue}
                    price={queryParams?.price}
                  />
                </>
              )}
            </>
          ) : (
            <>
              <Connection connect={connect} />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Walletscreen;
