import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { providers } from "ethers";

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      rpc: {
        97: "https://data-seed-prebsc-1-s1.binance.org:8545",
      },
      chainId: 97,
    },
  },
};

export function modalConnect() {
  if (typeof window.ethereum === "undefined") return null;
  return new Web3Modal({
    cacheProvider: true,
    providerOptions,
  });
}

export function connectProvider() {
  if (typeof window.ethereum === "undefined") return null;
  return new providers.Web3Provider(window.ethereum);
}
