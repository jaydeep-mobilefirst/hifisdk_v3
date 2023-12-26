import React, { useState, useEffect } from "react";
import Image from "next/image";
import HomeScreen from "@/finalComponents/HomeScreen";
import TransactionScreen from "@/finalComponents/TransactionScreen";
import { ethers } from "ethers";
import axios from "axios";
import {
  useWalletItemActions,
  useDynamicContext,
  useSendBalance,
} from "@dynamic-labs/sdk-react";
import Loader from "@/finalComponents/Loader";
import Done from "@/finalComponents/Done";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [currencyName, setCurrencyName] = useState("eth");
  const [currencyValue, setCurrencyValue] = useState<any>();
  const [merchantWallet, setMarchantWallet] = useState<any>();
  const [allCurrency, setAllCurrencyList] = useState();
  const [loader, setLoader] = useState(false);
  const [loader2, setLoader2] = useState(false);
  const [quoteId, setQuoteId] = useState<any>();
  const [cryptoPrice, setCryptoPrice] = useState<any>();
  const [state, setState] = useState<boolean>(true);
  const [txHash, setTxHash] = useState<any>();
  const [queryParams, setQueryParams] = useState<any>({});
  const [walletbalance, setWalletbalance] = useState<any>();
  const dollaramount = queryParams?.price ? queryParams?.price : 12;
  const {
    primaryWallet,
    rpcProviders,
    connectedWallets,
    setShowAuthFlow,
    showAuthFlow,
    handleLogOut,
  } = useDynamicContext();

  const router = useRouter();
  useEffect(() => {
    // Function to parse search parameters from URL
    const getSearchParams = (url: any) => {
      const params = {};
      const searchParams = new URL(url).searchParams;
      searchParams.forEach((value, key) => {
        // @ts-ignore
        params[key] = value;
      });
      return params;
    };

    // Get the current URL of the iframe
    const currentUrl = window.location.href;

    // Parse the search parameters
    const parsedParams = getSearchParams(currentUrl);

    // Set the parsed parameters in the state
    setQueryParams(parsedParams);
  }, []);

  useEffect(() => {
    if (!primaryWallet) {
      setTimeout(() => {
        setShowAuthFlow(true);
      }, 1000);
    }
    primaryWallet?.connector.getBalance().then(function (result: any) {
      setWalletbalance(result);
    });
  }, [showAuthFlow, handleLogOut]);

  // setShowAuthFlow(true);
  // api calls in useeffect
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
        setQuoteId(response?.data?.data?.quote_id);
        setCryptoPrice(response?.data?.data?.sell_price);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [currencyName, state, queryParams]);

  // sent transaction
  const sendEth = async () => {
    try {
      setLoader(true);

      if (primaryWallet) {
        const signer: any = await primaryWallet.connector.getSigner();

        const transaction = {
          to: "0xbC1E64328582FEE794052679fD13b4B84b6DB9E9",
          value: ethers.utils.parseEther(`${currencyValue}`),
          // data: "0x0",
        };

        const txHash = await signer.sendTransaction(transaction);

        if (txHash) {
          setTimeout(() => {
            valueSendToBackend();
          }, 1000);
          setLoader2(true);
          setTxHash(txHash);
        }
      }
    } catch (error) {
      // Handle the error here, you can log it or show an error message to the user
      console.error("Error sending transaction:", error);
      if (walletbalance < currencyValue) {
        toast.error("Insufficient funds. Please check your wallet balance");
      } else {
        toast.error("Please try again..!");
      }
      setLoader(false);
    } finally {
      // This block will always be executed, whether there was an error or not
      // setLoader(false);
    }
  };

  // send data to database
  const valueSendToBackend = () => {
    axios
      .post(datasend, {
        merchantAddress: merchantWallet.toLowerCase(), // convert to lowercase and pass
        customerAddress: primaryWallet?.address.toLowerCase(), // convert to lowercase and pass
        inwardCurrency: currencyName,
        inwardBaseAmount: currencyValue,
        outwardCurrency: "usd",
        outwardBaseAmount: dollaramount,
        walletType: primaryWallet?.connector?.name,
        email: queryParams?.email,
        name: queryParams?.name, //sdk
        quoteId: quoteId,
        oneCryptoPrice: cryptoPrice,
        description:
          queryParams?.product_title + " " + queryParams?.product_description, //randon description(product name)
        txHash: txHash,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex items-center justify-center">
      <ToastContainer />
      {loader2 ? (
        <Done merchantName={queryParams?.merchant_name} />
      ) : (
        <>
          {primaryWallet ? (
            <>
              {loader ? (
                <>
                  <Loader />
                </>
              ) : (
                <TransactionScreen
                  handleTransaction={sendEth}
                  walletname={primaryWallet?.connector?.name}
                  walletAddress={primaryWallet?.address}
                  currancy="eth"
                  allCurrency={allCurrency}
                  currencyName={currencyName}
                  setCurrencyName={setCurrencyName}
                  currencyValue={currencyValue}
                  price={parseFloat(dollaramount).toFixed(2)}
                />
              )}
            </>
          ) : (
            <>
              <HomeScreen />
            </>
          )}
        </>
      )}
    </div>
  );
}
