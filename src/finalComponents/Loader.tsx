import React from "react";
import logo from "@/components/images/hifi9.svg";
import Image from "next/image";

const Loader = () => {
  return (
    <div className="flex items-center justify-center mx-auto">
      <div className="h-[29rem] w-[35rem] shadow-md mx-auto my-auto bg-white rounded-xl">
        <div className="h-['150px'] grdiantbackground  flex justify-center pl-5 pr-8 pt-5 pb-6 rounded-t-md">
          {/* <h1 className="text-6xl text-white font-bold">
          HIFI <span className="font-light">Pay</span>{" "}
        </h1> */}
          <Image src={logo} alt="icon" className="h-[60px] mt-[14px]" />
        </div>
        <div className="flex justify-center flex-col items-center gap-10 mt-20">
          <div className="font-normal text-black text-xl overflow-hidden">
            Your order is almost complete
          </div>
          <div className="">
            <div
              className="inline-block h-8 w-8 text-purple-700 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            >
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
              </span>
            </div>
          </div>
          <div className=" font-semibold text-3xl ">Payment processing..</div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
