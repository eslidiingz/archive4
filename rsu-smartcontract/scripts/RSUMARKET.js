const hre = require("hardhat")

async function main() {
  const BWNFTMarket = await hre.ethers.getContractFactory("RSUMARKET")
  const recipientWallet = "0xE40845297c6693863Ab3E10560C97AACb32cbc6C" // MEX WALLET

  const deploy = await BWNFTMarket.deploy(recipientWallet)
  await deploy.deployed()

  console.log("RSUMARKET deployed to:", deploy.address)

  try {
    await hre.run("verify:verify", {
      address: deploy.address,
      contract: "contracts/RSUMarket.sol:RSUMarket",
      constructorArguments: [recipientWallet],
    })
  } catch (error) {
    console.log(error) 
  }
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
