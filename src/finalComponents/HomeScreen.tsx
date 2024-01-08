import React from "react";
import { DynamicWidget, useDynamicContext } from "@dynamic-labs/sdk-react";
import FirstLoader from "./FirstLodaer";

const HomeScreen = ({ connect }: any) => {
  const { showAuthFlow } = useDynamicContext();
  return (
    <>
      <div className={`hidden`}>
        <DynamicWidget />
      </div>
    </>
  );
};

export default HomeScreen;
