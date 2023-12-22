import React, { useEffect, useState } from "react";

interface EthereumAccountComponentProps {
  onConnect: (userAddress: string) => void;
}

const EthereumAccountComponent: React.FC<EthereumAccountComponentProps> = ({
  onConnect,
}) => {
  const [userAddress, setUserAddress] = useState<string | null>(null);

  useEffect(() => {
    const requestEthereumAccounts = async () => {
      try {
        // Use eth_requestAccounts
        const accountsResponse = await (window as any).ethereum.request({
          method: "eth_requestAccounts",
        });
        const accounts: string[] = accountsResponse as string[];

        console.log(`User's address is ${accounts[0]}`);
        setUserAddress(accounts[0]);
        onConnect(accounts[0]);

        // Optionally, set the default account for web3.js
        // web3.eth.defaultAccount = accounts[0];
      } catch (error) {
        console.error("Error requesting Ethereum accounts:", error);
      }
    };

    const enableEthereumAccounts = async () => {
      try {
        // Alternatively, you can use ethereum.enable()
        const accounts = await (window as any).ethereum.enable();

        console.log(`User's address is ${accounts[0]}`);
        setUserAddress(accounts[0]);
        onConnect(accounts[0]);

        // Optionally, set the default account for web3.js
        // web3.eth.defaultAccount = accounts[0];
      } catch (error) {
        console.error("Error enabling Ethereum accounts:", error);
      }
    };

    // Check if ethereum is available (Metamask or similar)
    if (typeof (window as any).ethereum !== "undefined") {
      // Use eth_requestAccounts
      requestEthereumAccounts();

      // Alternatively, you can use ethereum.enable()
      // enableEthereumAccounts();
    } else {
      console.error(
        "Ethereum provider not found. Make sure you have a compatible wallet installed."
      );
    }
  }, [onConnect]); // Run once on component mount

  return (
    <div>
      {userAddress ? (
        <p>User's address is {userAddress}</p>
      ) : (
        <p>Connecting to Ethereum...</p>
      )}
    </div>
  );
};

export default EthereumAccountComponent;
