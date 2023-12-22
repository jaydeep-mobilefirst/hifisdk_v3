import React from "react";

const WalletButton = ({ buttontext, logo, onClick } : any) => {
  return (
    <div>
      <button onClick={onClick} className="w-48 mt-[14px] h-10 bg-white rounded-md flex items-center justify-start hover:bg-slate-100">
        <div className="ml-[12px]">
          <img src={logo} alt={buttontext} />
        </div>
        <div className="text-[#252C32] text-base font-normal text-poppins leading-normal pl-3 pr-3.5 py-1">
          {buttontext}
        </div>
      </button>
    </div>
  );
};

export default WalletButton;
