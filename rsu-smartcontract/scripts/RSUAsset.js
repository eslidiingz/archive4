const hre = require("hardhat")

async function main() {
  const _name = "RSU NFT"
  const _symbol = "RSUNFT"

  const BWNFT = await hre.ethers.getContractFactory("RSUAsset")

  const deploy = await BWNFT.deploy()

  await deploy.deployed()

  console.log("RSUAsset deployed to:", deploy.address)

  // const _txn = await deploy.initialize(_name, _symbol)
  // await _txn.wait()

  try {
    await hre.run("verify:verify", {
      address: deploy.address,
      contract: "contracts/RSUAsset.sol:RSUAsset",
    })
  } catch (error) {
    console.log(error)
  }
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
