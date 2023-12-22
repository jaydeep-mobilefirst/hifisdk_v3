import React, { useState } from "react";
import Hifi9 from "@/components/images/hifi9.svg";
import metamask from "@/components/images/metamask.svg";
import Select from "react-select";
import Image from "next/image";
import coinbase from "@/components/images/coinbase.svg";
import { useDynamicContext } from "@dynamic-labs/sdk-react";
import { useRouter } from "next/router";

const customStyles = {
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected ? "white" : "gray",
    color: state.isSelected ? "black" : "grey",
  }),
};

const TransactionScreen = ({
  handleTransaction,
  walletname,
  walletAddress,
  currancy,
  currencyName,
  setCurrencyName,
  currencyValue,
  price,
  allCurrency,
}: any) => {
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [dropdownImage, setDropdownImage] = useState(
    "https://hifibridgedocs.s3.amazonaws.com/ethereum-eth-logo.png"
  );

  const { handleLogOut } = useDynamicContext();
  const router = useRouter();

  const handleCheckboxChange = () => {
    setIsCheckboxChecked(!isCheckboxChecked);
  };

  const handleDropdownChange = (newValue: any, actionMeta: any) => {
    const selectedValue = newValue ? newValue.code : null;
    setCurrencyName(selectedValue);
    setDropdownImage(newValue?.logoUrl);
  };

  const CustomOption = (props: any) => (
    <div
      {...props.innerProps}
      className="flex h-10 items-center px-3 py-3 hover:bg-stone-100"
    >
      <Image
        src={props.data.logoUrl}
        alt={props.data.value}
        className="w-5 h-5"
        width={20}
        height={20}
      />
      <span className="ml-2 uppercase text-poppins text-sm">
        {props.data.code}
      </span>
    </div>
  );

  const getImage = (status: string) => {
    switch (status) {
      case "MetaMask":
        return metamask;
      case "Coinbase":
        return coinbase;
    }
  };

  const handleLogOut2 = () => {
    handleLogOut();
    setTimeout(() => {
      router.reload();
    }, 1000);
  };

  return (
    <>
      {allCurrency && (
        <div className="w-full flex justify-center items-center">
          <div className="flex flex-col w-full lg:w-[618px] justify-center items-center border border-[#D1D5DB] bg-white rounded-xl">
            <div className="grdiantbackground h-[89px] w-full flex justify-center items-center rounded-t-xl ">
              <Image src={Hifi9} alt="hifi" className="h-[40px] mt-[10px]" />
            </div>
            <div className="flex flex-col py-4 px-6 w-full gap-4">
              <div className="flex flex-col gap-3">
                <p className="text-[#4B5563] text-[12px] text-poppins font-[500]">
                  Wallet Type
                </p>
                <div className="flex items-center gap-3 border border-[#D1D5DB] rounded-[4px] w-full px-4 py-3">
                  <Image
                    src={getImage(walletname)}
                    alt="wallet-img"
                    width={20}
                    height={20}
                  />
                  <p className="text-[#1F2937] text-poppins text-sm font-medium">
                    {walletname}
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <p className="text-[#4B5563] text-[12px] text-poppins font-[500]">
                  Wallet Name:
                </p>
                <div className="flex items-center gap-3 border border-[#D1D5DB] rounded-[4px] w-full px-4 py-3">
                  <p className="text-[#1F2937] text-poppins text-sm font-medium">
                    {walletAddress ? walletAddress : "walletAddress"}
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <p className="text-[#4B5563] text-[12px] text-poppins font-[500]">
                  Selected Currency
                </p>

                <div className="flex flex-col lg:flex-row items-center gap-3">
                  <div className="relative w-full lg:w-[50%]">
                    <div className="relative">
                      <Select
                        components={{ Option: CustomOption }}
                        onChange={handleDropdownChange}
                        className="basic-single uppercase text-poppins text-sm"
                        classNamePrefix="select"
                        defaultValue={allCurrency[6]}
                        isDisabled={false}
                        isLoading={false}
                        isClearable={true}
                        isRtl={false}
                        isSearchable={true}
                        name="code"
                        options={allCurrency}
                        styles={customStyles}
                        getOptionLabel={(option) => option.code}
                      />

                      {dropdownImage && (
                        <div className="absolute cursor-pointer top-[15px] left-2">
                          <Image
                            src={dropdownImage}
                            width={20}
                            height={20}
                            alt=""
                            className=""
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 border border-[#D1D5DB] rounded-[4px] px-4 py-3  w-full lg:w-[50%] h-[51px]">
                    <p className="text-[#1F2937] text-poppins text-sm font-medium">
                      {currencyValue}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col py-4 px-6 w-full gap-4 bg-[#F3F4F6] rounded-b-xl">
              <div className="flex w-full items-center justify-between">
                <p className="text-[#4B5563] text-poppins text-sm">
                  Total Amount
                </p>
                <p className="text-[#1F2937] text-poppins text-base font-medium">
                  ${price}
                </p>
              </div>

              <hr className="w-[100px] bg-[#D1D5DB] h-px" />
              <div className="flex w-full items-center justify-between">
                <p className="text-[#4B5563] text-poppins text-base">
                  Order Total
                </p>
                <p className="text-[#1D4ED8] text-poppins text-base font-medium">
                  ${price}
                </p>
              </div>
              <div className="w-full flex items-center gap-3 mt-3">
                <input
                  type="checkbox"
                  className=""
                  checked={isCheckboxChecked}
                  onChange={handleCheckboxChange}
                />
                <p className="text-black text-poppins text-[12px] ">
                  I agree to Terms of Service & Privacy Policy
                </p>
              </div>
              <button
                className={`bg-[#6200EE] rounded-md px-0 py-3 text-white text-poppins text-base mt-2 ${
                  !isCheckboxChecked && "opacity-50 cursor-not-allowed"
                }`}
                disabled={!isCheckboxChecked}
                onClick={handleTransaction}
              >
                Proceed Payment
              </button>
              <button
                onClick={handleLogOut2}
                className={`bg-[#6200EE] rounded-md px-0 py-3 text-white text-poppins text-base mt-0 `}
              >
                Change Wallet
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TransactionScreen;
