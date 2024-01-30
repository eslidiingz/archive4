const hre = require("hardhat")

async function main() {

  const BWNFT = await hre.ethers.getContractFactory("Multicall")

  const deploy = await BWNFT.deploy()

  await deploy.deployed()

  console.log("Multicall deployed to:", deploy.address)

  // const _txn = await deploy.initialize(_name, _symbol)
  // await _txn.wait()

  try {
    await hre.run("verify:verify", {
      address: deploy.address,
      contract: "contracts/Multicall.sol:Multicall",
    })
  } catch (error) {
    console.log(error)
  }
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
