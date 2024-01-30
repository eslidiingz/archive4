const hre = require("hardhat")
async function main () {
    // const recipientWallet = "0xE40845297c6693863Ab3E10560C97AACb32cbc6C";
    // const RSU_MARKETPLACE =  await hre.ethers.getContractFactory("RSUMarketplace");
    // const deploy = await RSU_MARKETPLACE.deploy(recipientWallet);
    // await deploy.deployed()
    // console.log("RSU Marketplace deployed : ", deploy.address);
    // -------------

    const assetContract = await hre.ethers.getContractFactory("RSUAsset")
    const deployAsset = await assetContract.deploy();
    await deployAsset.deployed();

    console.log("RSUAsset deployed to:", deployAsset.address)

}

main();