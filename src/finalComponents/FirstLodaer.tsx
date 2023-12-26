import React from "react";
import Image from "next/image";
import logo from "@/components/images/hifi9.svg";

const FirstLoader = () => {
  return (
    <div>
      <div className="bg-gradient-to-b p-[32px] rounded-xl from-violet-700 via-purple-500 to-purple-500 flex items-center flex-row">
        <div className="hidden sm:flex p-[32px] items-center justify-center flex-col">
          <div className="w-full flex items-center justify-between">
            <div></div>
            {/* <img src={X} alt="close" /> */}
          </div>
          <div>
            <div>
              <div className="w-[349px] mt-[32px] text-center text-white text-base font-bold text-poppins">
                The future of payments is finally here.
              </div>
            </div>
            <div className="mt-[54px] scale-75 flex items-center justify-center">
              <Image src={logo} alt="whitelogo" />
            </div>
            <div className="mt-[32px] mb-[32px]">
              <div className="w-[349px] text-center text-white text-base font-normal text-poppins">
                Connect a wallet to get started
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstLoader;
