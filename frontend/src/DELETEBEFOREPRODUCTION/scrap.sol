mapping (address => Validation) validations;

struct Validation {
  uint expirationTime;
  bool currentlyValid;
}

funtion validate() public {
  validations[msg.sender] = Validation({
    expirationTime: block.timestamp + 15724800,
    currentlyValid: true;
  });
}

modifier checkValidity {
  bool isValid = validations[msg.sender].expirationTime > block.timestamp;
  if (!isValid) {
    validations[msg.sender].currentlyValid = false;
    require(false, 'user is not currently valid');
  }
  require(true);
}
