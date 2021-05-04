//SPDX-License-Identifier: MIT;
pragma solidity ^0.5.16;

contract Validate{
  uint public storedNumber;

  mapping (address => Validation) validations;

  struct Validation {
    uint expirationTime;
  }

  //The front end will respond based on the uint value that is returned.
  //The user cannot validate if the user is currently validated.
  function validate(uint _tokens) public returns(uint) {
    if(validations[msg.sender].expirationTime == 0) {
      validations[msg.sender] = Validation({
          expirationTime: block.timestamp + 15
      });
      return 0; //validates new user
    } else if(validations[msg.sender].expirationTime >= block.timestamp) {
        return 1; //already validated
    } else {
        validations[msg.sender] = Validation({
            expirationTime: block.timestamp + 10
        });
        return 2; // return 2; //renew validation
    }
  }

  //Ensure that the user is validated and making the function call prior to the expiration time.
  modifier checkValidity {
    bool isValid;
    if(validations[msg.sender].expirationTime > block.timestamp) {
        isValid = true;
    } else {
        isValid = false;
    }
    require(isValid, 'user is not currently validated');
    _;
  }

  function setStoredNumber(uint _num) public checkValidity returns(uint) {
    storedNumber = _num;
    return storedNumber;
  }

  function getStoredNumber() public view returns(uint){
    return storedNumber;
  }
}
