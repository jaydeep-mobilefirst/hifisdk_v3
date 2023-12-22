import React, { useState } from "react";

type Props = {};

function Transacction2({}: Props) {
  const [isChecked, setIsChecked] = useState(true);

  function handleProcedChange(e: any) {
    console.log(e.target.checked);
    setIsChecked(e.target.checked);
  }
  return (
    <div className="h-[41.5rem] w-[46rem] mx-auto shadow-md rounded bg-white ">
      <div className="h-['150px'] bg-gradient-to-r from-purple-600 via-purple-700 to-purple-700 flex justify-center pl-5 pr-8 pt-5 pb-6 rounded-md">
        <h1 className="text-6xl text-white font-bold">
          HIFI <span className="font-light">Pay</span>{" "}
        </h1>
      </div>
      <div className="mt-[59px] ">
        <p className="font-normal text-sm font-poppins  text-[#4B5563] ml-8 mr-[105] mb-5">
          Paying with - Coinbase wallet Ox846y2_48572
        </p>
        <p className="font-normal text-sm font-poppins text-[#4B5563] ml-8 mr-[105]">
          {" "}
          Paying to Macy’s - Ox846y2_48572
        </p>
      </div>

      <div className="p-8 bg-[#F3F4F6] mt-[107px] rounded-sm ">
        <div className="flex justify-between mb-5">
          <span className="text-[#4B5563] font-poppins text-left">
            Total Amount
          </span>
          <span className="text-right font-[500]">$1275.85</span>
        </div>
        <div className="flex justify-between mb-8">
          <div className="border-b-2">
            <span className="text-[#4B5563] font-poppins text-left ">
              Network Fee
            </span>
          </div>
          <span className="text-right font-[500] mb-4">$0.35</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#4B5563] font-poppins text-left font-normal text-[16px]">
            Order Total
          </span>
          <span className="text-right text-[#9747FF] ">$1276.20</span>
        </div>

        <div className="mt-7 flex items-center mb-7">
          <input
            className="h-5 w-5 inline-block"
            onChange={handleProcedChange}
            type="checkbox"
            name="check"
            id=""
          />
          <label
            className="ml-2 font-normal font-poppins   text-[12px] "
            htmlFor="terms"
          >
            I agree to Terms of Service & Privacy Policy
          </label>
        </div>
        <button
          disabled={!isChecked}
          className={`${
            !isChecked ? "" : "bg-[#6200EE]"
          } px-5 text-white font-poppins font-[500] py-4 w-full bg-[#D0CBF2] rounded`}
        >
          Proceed to complete payment
        </button>
      </div>
    </div>
  );
}

export default Transacction2;