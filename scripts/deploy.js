const TaroSimple = require('../frontend/src/contracts/contracts/TaroSimple.sol/TaroSimple.json');

async function main() {
  // const [deployer] = await ethers.getSigners();
  //
  // console.log(
  //   "Deploying contracts with the account:",
  //   deployer.address
  // );


  // const TaroSimple = await ethers.getContractFactory('TaroSimple');
  // const taroSimple = await TaroSimple.deploy();
  // //
  // console.log(`TaroSimple address: ${taroSimple.address}`);
  //
  // let expectedEvent = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("this is the title"));
  //
  // let titleAddedEvent = new Promise((res, rej) => {
  //   taroSimple.on('TitleAdded', (title, budget, event) => {
  //     event.removeListener();
  //     res({title, budget});
  //   });
  // });
  //
  // let tx = await taroSimple.addUser('this is the title', ethers.BigNumber.from(100));
  // // await tx.wait(1);
  // let titleEvent = await titleAddedEvent;
  // console.log('titleEvent: ', titleEvent.title);
  // console.log('expectedEvent: ', expectedEvent);
  // let num = titleEvent.budget.toString();
  // // let num = ethers.BigNumber(titleEvent.budget);
  // // num = num.toString();
  // console.log('budgetEvent: ', num);
  //
  // setAddressInCompiledContracts(taroSimple, 'TaroSimple');
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
