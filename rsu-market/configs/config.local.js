const ConfigLocal = {
  CHAIN_ID: 80001,
  RPC: "https://nd-299-036-938.p2pify.com/c71df2def425f67d749b283c5bba1dfa",

  ASSET_CA: "0xA0B537f9D329606B718a8B1417B871e487dc09B8", // update [2022-07-06 11:00]
  MARKETPLACE_CA: "0xAEfc687860ff5FD7D5eb9e4b900d369a251b76Cf",

  ASSET_ABI: require("../abis/local/Asset.json"),
  MARKETPLACE_ABI: require("../abis/local/Marketplace.json"),
  ERC20_ABI: require("../abis/local/Erc20.json"),
  MULTICALL_ABI: require("../abis/local/Multicall.json"),

  MARKETPLACE_BLOCK_START: 26669410,
  ASSET_BLOCK_START: 26669506,

  GET_FILE_URI: "http://206.189.85.8:18800",
  FILE_SERVER_URI: "http://206.189.85.8:3100/upload",
  REST_URI: "",
  GQL_URI: "http://206.189.85.8:8080/v1/graphql",
};

export default ConfigLocal;
