//SPDX-License-Identifier: MIT;
pragma solidity ^0.8.0;

contract Validate{
  uint public storedNumber;

  mapping (address => Validation) validations;

  enum ValidationStatus {
    NEWLY_VALIDATED,
    ALREADY_VALIDATED,
    EXPIRED_VALIDATION
  }

  struct Validation {
    uint expirationTime;
    ValidationStatus currentStatus;
  }

  function validate() public returns(uint){
    if(!validations[msg.sender].currentStatus) {
      validations[msg.sender] = Validation({
        expirationTime: block.timestamp + 60,
        currentStatus: ValidationStatus.NEWLY_VALIDATED;
      });
      return validations[msg.sender].currentStatus;
    } else if(validations[msg.sender].currentStatus == ValidationStatus.NEWLY_VALIDATED) {
      return ValidationStatus.ALREADY_VALIDATED;
    } else if(validations[msg.sender].currentStatus == ValidationStatus.EXPIRED_VALIDATION) {
      return ValidationStatus.EXPIRED_VALIDATION;
    }
  }

  modifier checkValidity {
    bool isValid = validations[msg.sender].expirationTime > block.timestamp;
    if (!isValid) {
      require(false, 'user is not currently valid');
    }
    _;
  }

  function setStoredNumber(uint _num) public checkValidity returns(uint) {
    storedNumber = _num;
    return(storedNumber);
  }

  function getStoredNumber() public returns(uint){
    return(storedNumber);
  }
}

function validate() public returns(uint, uint, uint) {
    if(validations[msg.sender].expirationTime == 0) {
      validations[msg.sender] = Validation({
          expirationTime: block.timestamp + 10
      });
      return (0, validations[msg.sender].expirationTime, block.timestamp); //validates new user
    } else if(validations[msg.sender].expirationTime >= block.timestamp) {
        return (1, validations[msg.sender].expirationTime, block.timestamp); //already validated
    } else {
        validations[msg.sender] = Validation({
            expirationTime: block.timestamp + 10
        });
        return (2, validations[msg.sender].expirationTime, block.timestamp); // return 2; //renew validation
    }
}

modifier checkValidity {
  bool isValid;
  if(validations[msg.sender].expirationTime < block.timestamp) {
      isValid = true;
  } else {
      isValid = false;
  }
  require(isValid, 'user is not currently valid');
  _;
}

function setStoredNumber(uint _num) public checkValidity returns(uint) {
  storedNumber = _num;
  return storedNumber;
}

function getStoredNumber() public view returns(uint){
  return storedNumber;
}





function validate() public returns(uint) {
    if(validations[msg.sender].expirationTime == 0) {
      validations[msg.sender] = Validation({
          expirationTime: block.timestamp + 15
      });
      return 0; //validates new user
    } else if(validations[msg.sender].expirationTime < block.timestamp) {
        return 1; //already validated
    } else {
        return 2; // return 2; //expired validation
    }
}

function validate() public returns(uint, uint) {
    if(validations[msg.sender].expirationTime >= block.timestamp && validations[msg.sender].expirationTime != 0) {
       return 4;
        // return validations[msg.sender].expirationTime; //already validated
    } else if(validations[msg.sender].expirationTime < block.timestamp && validations[msg.sender].expirationTime != 0) {
        return 5;
        // return validations[msg.sender].expirationTime; //expired validation
    } else {
        validations[msg.sender] = Validation({
            expirationTime: block.timestamp + 15
          });
        // return 2; //validates new user
        return validations[msg.sender].expirationTime, block.timestamp;
    }
}

// mapping (address => Validation) validations;
//
// struct Validation {
//   uint expirationTime;
//   bool currentlyValid;
// }
//
// funtion validate() public {
//   validations[msg.sender] = Validation({
//     expirationTime: block.timestamp + 15724800,
//     currentlyValid: true;
//   });
// }
//
// modifier checkValidity {
//   bool isValid = validations[msg.sender].expirationTime > block.timestamp;
//   if (!isValid) {
//     validations[msg.sender].currentlyValid = false;
//     require(false, 'user is not currently valid');
//   }
//   require(true);
// }
