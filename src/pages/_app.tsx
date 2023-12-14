import React from "react";
import {
  DynamicContextProvider,
  useWalletItemActions,
  useDynamicContext,
  useSendBalance,
} from "@dynamic-labs/sdk-react";
import { useEffect, useState } from "react";
import "../styles/globals.css";
import { ethers } from "ethers";

const configuration = {
  environmentId: "c2c8cbaa-1aa8-4030-b258-1402ad88aa75",
  shadowDOMEnabled: false,
  walletsFilter: (wallets: any) =>
    wallets.filter((wallet: any) => wallet.key === "walletconnect"),
  newToWeb3WalletChainMap: {
    primary_chain: "evm",
    wallets: {
      evm: "metamask",
    },
  },
};

const ConnectWalletButtons = () => {
  const { openWallet } = useWalletItemActions();
  const { setShowAuthFlow } = useDynamicContext();
  const { handleLogOut } = useDynamicContext();

  return (
    <div className="flex m-5 justify-center items-start gap-5">
      <button
        onClick={() => openWallet("metamask")}
        className="bg-blue-600 text-white h-8 px-4 rounded-md"
      >
        Connect Metamask
      </button>
      <button
        onClick={() => openWallet("coinbase")}
        className="bg-blue-600 text-white h-8 px-4 rounded-md"
      >
        Connect Coinbase
      </button>
      <button
        onClick={() => setShowAuthFlow(true)}
        className="bg-blue-600 text-white h-8 px-4 rounded-md"
      >
        Connect WalletConnect
      </button>

      <button
        onClick={handleLogOut}
        className="bg-red-600 text-white h-8 px-4 rounded-md"
      >
        Logout
      </button>
    </div>
  );
};

const MyComponent = () => {
  const { primaryWallet, rpcProviders, connectedWallets } = useDynamicContext();
  const { open } = useSendBalance();
  const [balance, setBalance] = useState<any>(null);

  const sendTransaction = async () => {
    if (primaryWallet) {
      const signer: any = await primaryWallet.connector.getSigner();
      const transaction = {
        to: "0xFC162195D5425b4F5363F1E047fd02EC2dcDED47",
        value: ethers.utils.parseEther("0.0001"),
        // data: "0x0",
      };
      const txHash = await signer.sendTransaction(transaction);
      return txHash;
    }
    return null;
  };

  useEffect(() => {
    const fetchBalance = async () => {
      if (primaryWallet && rpcProviders.evmDefaultProvider?.provider) {
        const provider = rpcProviders.evmDefaultProvider.provider;
        const value = await provider.getBalance(primaryWallet.address);
        setBalance(value.toString());
      }
    };
    fetchBalance();
  }, [primaryWallet, rpcProviders]);

  console.log("connectedWallets", connectedWallets);
  console.log("primaryWallet", primaryWallet);
  console.log("balance", balance);

  return (
    <div className="flex flex-col m-5 justify-center items-start gap-5">
      <p>Address: {primaryWallet?.address}</p>
      <p>Balance: {balance}</p>
      <button
        onClick={() => sendTransaction()}
        className="bg-green-600 text-white h-8 px-4 rounded-md"
      >
        Send Transaction
      </button>
    </div>
  );
};

function App() {
  return (
    <DynamicContextProvider settings={configuration}>
      <ConnectWalletButtons />
      <MyComponent />
    </DynamicContextProvider>
  );
}

export default App;