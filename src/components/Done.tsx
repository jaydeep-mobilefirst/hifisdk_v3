import React from "react";
import CheckCircle from "./images/CheckCircle.svg";
import logo from "./images/hifi9.svg";

const Done = ({ merchantName }: any) => {
  return (
    <div className="bg-white">
      <div className="h-[25rem] w-[29rem] shadow-md mx-auto my-auto bg-white rounded-xl">
        <div className="h-['150px'] grdiantbackground flex justify-center pl-5 pr-8 pt-5 pb-6 rounded-t-md">
          {/* <h1 className="text-6xl text-white font-bold text-poppins">
            HIFI <span className="font-light text-poppins">Pay</span>{" "}
          </h1> */}
          <img src={logo} alt="icon" className="h-[40px] mt-[10px]" />
        </div>
        <div className=" flex justify-center flex-col items-center text-poppins">
          <p className="mt-10 font-normal text-sm text-black  overflow-hidden text-poppins">
            {" "}
            Thanks for shopping with {merchantName}!
          </p>
          <p className="mt-10 font-mono text-xs text-poppins">
            {" "}
            A receipt has been sent to your e-mail
          </p>
          <p className="mt-10">
            <img src={CheckCircle} alt="icon" />
          </p>
          <p className="mt-10 font-semibold text-3xl text-poppins">
            Payment Complete
          </p>
        </div>
      </div>
    </div>
  );
};

export default Done;
