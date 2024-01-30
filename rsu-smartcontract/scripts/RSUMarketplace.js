const hre = require("hardhat");

async function main () {
    const RSU_MARKETPLACE =  await hre.ethers.getContractFactory("RSUMarketplace");
    const recipientWallet = "0xE40845297c6693863Ab3E10560C97AACb32cbc6C";

    const deploy = await RSU_MARKETPLACE.deploy(recipientWallet);
    await deploy.deployed()

    console.log("RSU Marketplace deployed : ", deploy.address);
    try {
        await hre.run("verify:verify", {
          address: deploy.address,
          contract: "contracts/RSUMarketplace.sol:RSUMarketplace",
          constructorArguments: [recipientWallet],
        })
      } catch (error) {
        console.log(error) 
      }
}


main();