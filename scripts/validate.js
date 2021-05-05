const Timelock = require('../frontend/src/contracts/contracts/Timelock.sol/Timelock.json');
const SafeMath = require('../frontend/src/contracts/contracts/SafeMath.sol/SafeMath.json');
const Comp = require('../frontend/src/contracts/contracts/Comp.sol/Comp.json');
const Validate = require('../frontend/src/contracts/contracts/Validate.sol/Validate.json');
const GA = require('../frontend/src/contracts/contracts/GA.sol/GA.json');

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log(
    "Deploying contracts with the account:",
    deployer.address
  );

  const SafeMath = await ethers.getContractFactory('SafeMath');
  const safeMath = await SafeMath.deploy();
  console.log('SafeMath address: ', safeMath.address);
  setAddressInCompiledContracts(safeMath, 'SafeMath');

  const Timelock = await ethers.getContractFactory('Timelock');
  const timelock = await Timelock.deploy(deployer.address, 259200);
  console.log('Timelock address: ', timelock.address);
  setAddressInCompiledContracts(timelock, 'Timelock');

  const Comp = await ethers.getContractFactory('Comp');
  const comp = await Comp.deploy(deployer.address);
  console.log('Comp address: ', comp.address);
  setAddressInCompiledContracts(comp, 'Comp');

  // const Validate = await ethers.getContractFactory('Validate');
  // const validate = await Validate.deploy(deployer.address);
  // console.log('Validate address: ', validate.address);
  // setAddressInCompiledContracts(validate, 'Validate');

  const GA = await ethers.getContractFactory('GA');
  const gA = await GA.deploy(timelock.address, comp.address, deployer.address);
  console.log('GA address: ', gA.address);
  setAddressInCompiledContracts(gA, 'GA');


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
