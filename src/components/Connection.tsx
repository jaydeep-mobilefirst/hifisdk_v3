import React from "react";
import Logo from "./images/hifiblacksvg.svg";
import WalletButton from "./WalletButton";
import Metamask from "./images/metamask.svg";
import Coinbase from "./images/coinbase.svg";
import WalletConnect from "./images/walletconnect.svg";
import X from "./images/x.svg";
import Whitelogo from "./images/whitelogo.svg";

const Connection = ({ connect }: any) => {
  return (
    <>
      {" "}
      <div className="sm:w-[739px] bg-gradient-to-b rounded-xl from-violet-700 via-purple-500 to-purple-500 flex items-start flex-row">
        <div className="p-[32px] bg-white border rounded-xl sm:rounded-none sm:rounded-s-xl border-gray-200">
          <div>
            <img src={Logo} alt="logo" className="w-[126px] h-[32px]" />
          </div>
          <div className="mt-[80px] mb-[210px]">
            <WalletButton
              logo={Metamask}
              buttontext="MetaMask"
              onClick={connect}
            />
            <WalletButton logo={Coinbase} buttontext="Coinbase" />
            <WalletButton logo={WalletConnect} buttontext="Wallet Connect" />
          </div>
        </div>
        <div className="hidden sm:flex p-[32px] ml-4 items-start justify-between flex-col">
          <div className="w-full flex items-center justify-between">
            <div></div>
            {/* <img src={X} alt="close" /> */}
          </div>
          <div>
            <div>
              <div className="w-[349px] mt-[120px] text-center text-white text-base font-bold text-poppins">
                The future of payments is finally here.
              </div>
            </div>
            <div className="mt-[54px] scale-75">
              <img src={Whitelogo} alt="whitelogo" />
            </div>
            <div className="mt-[32px]">
              <div className="w-[349px] text-center text-white text-base font-normal text-poppins">
                Connect a wallet to get started
              </div>
            </div>
          </div>
          <div>
            <div className="mt-[80px]">
              <span className="text-white text-xs font-normal text-poppins leading-3">
                By connecting, you agree to the{" "}
              </span>
              <a href="https://www.hifibridge.com/terms" target="_blank" className="text-violet-700 text-xs font-normal text-poppins leading-3">
                Terms of Service
              </a>
              <span className="text-white text-xs font-normal text-poppins leading-3">
                {" "}
                &{" "}
              </span>
              <a href="https://www.hifibridge.com/privacypolicy" target="_blank" className="text-violet-700 text-xs font-normal text-poppins leading-3">
                Privacy Policy
              </a>
              <span className="text-white text-xs font-normal text-poppins leading-3">
                .
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Connection;
