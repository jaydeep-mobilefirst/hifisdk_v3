import {
  DynamicContextProvider,
  DynamicWidget,
} from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";

const App = () => (
  <DynamicContextProvider
    settings={{
      environmentId: "c2c8cbaa-1aa8-4030-b258-1402ad88aa75", //Replace with your environmentId
      walletConnectors: [EthereumWalletConnectors],
    }}
  >
    <DynamicWidget />
  </DynamicContextProvider>
);
export default App;
