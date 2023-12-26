import React from "react";
import { DynamicWidget, useDynamicContext } from "@dynamic-labs/sdk-react";
import FirstLoader from "./FirstLodaer";

const HomeScreen = ({ connect }: any) => {
  const { showAuthFlow } = useDynamicContext();
  return (
    <>
     
      {showAuthFlow ? (
        <>
          <div className={`${showAuthFlow ? "hidden" : "hidden"}`}>
            <DynamicWidget />
          </div>
        </>
      ) : (
        <>
          <div>
            <FirstLoader />
          </div>
        </>
      )}
    </>
  );
};

export default HomeScreen;
