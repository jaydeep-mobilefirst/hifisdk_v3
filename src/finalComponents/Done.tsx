import React from "react";
import CheckCircle from "@/components/images/CheckCircle.svg";
import logo from "@/components/images/hifi9.svg";
import Image from "next/image";

const Done = ({ merchantName }: any) => {
  return (
    <div className="bg-white">
      <div className="h-[29rem] w-[35rem] shadow-md mx-auto my-auto bg-white rounded-xl">
        <div className="h-['150px'] grdiantbackground flex justify-center pl-5 pr-8 pt-5 pb-6 rounded-t-md">
          {/* <h1 className="text-6xl text-white font-bold text-poppins">
            HIFI <span className="font-light text-poppins">Pay</span>{" "}
          </h1> */}
          <Image src={logo} alt="icon" className="h-[60px] mt-[14px]" />
        </div>
        <div className=" flex justify-center flex-col items-center text-poppins">
          <div className="mt-10 font-normal text-xl text-black  overflow-hidden text-poppins">
            {" "}
            Thanks for shopping with us!
          </div>
          <div className="mt-4 font-mono text-xl text-poppins">
            {" "}
            A receipt has been sent to your e-mail
          </div>
          <div className="mt-10">
            <Image src={CheckCircle} alt="icon" width={80} height={80} />
          </div>
          <div className="mt-10 mb-10 font-semibold text-3xl text-poppins">
            Payment Complete
          </div>
        </div>
      </div>
    </div>
  );
};

export default Done;
