const { ethers } = require('hardhat');

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log(
    "Deploying contracts with the account:",
    deployer.address
  );

  // const Timelock = await ethers.getContractFactory('Timelock');
  // const timelock = await Timelock.deploy(deployer.address, 259200);
  // await timelock.deployed();
  // console.log('Timelock address: ', timelock.address);
  // setAddressInCompiledContracts(timelock, 'Timelock');

  // const SafeMath = await ethers.getContractFactory('SafeMath');
  // const safeMath = await SafeMath.deploy();
  // await safeMath.deployed();
  // console.log('SafeMath address: ', safeMath.address);
  // setAddressInCompiledContracts(safeMath, 'SafeMath');

  const Taro = await ethers.getContractFactory('Taro');
  let taro = await Taro.deploy(deployer.address);
  await taro.deployed();
  console.log('Taro address: ', taro.address);
  setAddressInCompiledContracts(taro, 'Taro');

  const GovernorAlpha = await ethers.getContractFactory('contracts/GovernorAlpha.sol:GovernorAlpha');
  // let governorAlpha = await GovernorAlpha.deploy(timelock.address, taro.address, deployer.address);
  let governorAlpha = await GovernorAlpha.deploy(taro.address);
  await governorAlpha.deployed();
  console.log('GovernorAlpha address: ', governorAlpha.address);
  setAddressInCompiledContracts(governorAlpha, 'GovernorAlpha');

  //The initial balance is transfered from the Taro contract to the deployer.  Now it gets transfered to the governorAlpha address so that governorAlpha can transfer tokens to individual users when they get validated.
  let deployerBalance = await taro.balanceOf(deployer.address);
  let transfer = await taro.connect(deployer).transfer(governorAlpha.address, deployerBalance);
  await transfer.wait(1);
  let governorAlphaBalance = await taro.balanceOf(governorAlpha.address);
  console.log('governorAlphaBalance: ', governorAlphaBalance.toString());
};

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });

//This function gives the front end access to the address of the contract, which Ethers uses to generate a local instance
const setAddressInCompiledContracts = (instance, contractAsString) => {
  const fs = require("fs");
  const path = require('path');

  const contractsDir = path.join(__dirname, "..", "frontend", "src", "contracts", "contracts", `${contractAsString}`);

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  };

  instanceAddressPath = path.join(contractsDir, "contract-address.json");
  //Write the address of the deployed contract to the src directory of the front end
  fs.writeFileSync(
    instanceAddressPath,
    JSON.stringify({ [contractAsString]: instance.address }, undefined, 2)
  );
};
