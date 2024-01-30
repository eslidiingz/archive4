const ConfigLocal = {
  CHAIN_ID: 80001,
  RPC: "https://matic-mumbai.chainstacklabs.com",

  /** Contract Address */
  BUSD_CA: "0x1E03067A3CCAB676a5FFaE386a7394Ca1f103bfb", // (IERC20)
  LAND_CA: "0xD2D070DB56258E31193B0F2963b9B076FC1D9A30", // Update [06-16-2022, 14.57]
  CLAIM_CA: "0xeF562018C397c598d66Ab5A7d21827F6D1f63667", // Update [06-16-2022, 14.57]
  MARKET_CA: "0xAaB822cb629612cF8627E1E082475fB9ee4a2903", // Update [06-16-2022, 14.57]
  SWAP_CA: "0xF2F535adFc6A8074a875626C731A8dC4Ef51486d", // Update [06-16-2022, 14.57]
  TOKEN_CA: "0xF2F535adFc6A8074a875626C731A8dC4Ef51486d", // Update [06-16-2022, 14.57]

  /** ABIs */
  BUSD_ABI: require("../abis/local/BUSDToken.json"),
  LAND_ABI: require("../abis/local/MGNLand.json"),
  CLAIM_ABI: require("../abis/local/MGNClaim.json"),
  MARKET_ABI: require("../abis/local/MGNMarketplace.json"),
  SWAP_CA: require("../abis/local/MGNSwap.json"),
  TOKEN_CA: require("../abis/local/MGNToken.json"),

  /** URIs */
  METADATA_URI: "https://testapi.bitmonsternft.com/api/v1/metadata",
  REST_API_URL: "https://testapi.bitmonsternft.com/api/v1",
  INVENTORY_IMG_URL: "https://testapi.bitmonsternft.com/images",
  JSON_RPC: "https://data-seed-prebsc-1-s2.binance.org:8545/",

  HASURA_CONNECTION_URL: "https://gql.siamcannabis.io/v1/graphql",
  HASURA_SECRET_KEY: "2f64590fe77568880f4abafb2c3c4620",
};

export default ConfigLocal;
