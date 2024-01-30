require("dotenv").config()
require("@nomiclabs/hardhat-etherscan") //for verify blockscout
require("@nomiclabs/hardhat-waffle")
require("hardhat-deploy-ethers")
require("hardhat-gas-reporter")
require("solidity-coverage")
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.4.24",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.8.4",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.5.7",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      }
    ],

  },
  defaultNetwork: "mumbai",
  networks: {
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${process.env.INFURA_KEY}`,
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },

    mainnet: {
      url: "https://bsc-dataseed.binance.org",
      chainId: 56,
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    testnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      chainId: 97,
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    mumbai: {
      url: "https://nd-299-036-938.p2pify.com/c71df2def425f67d749b283c5bba1dfa",
      chainId: 80001,
      accounts:
      process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    }
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: process.env.MUMBAI_KEY,
  },
}
