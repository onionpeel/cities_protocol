//SPDX-License-Identifier: MIT;
pragma solidity ^0.8.0;

contract TaroSimple {
  event TitleAdded(
    string indexed newTitle,
    uint indexed newBudget
  );

  struct User {
    string title;
    uint budget;
  }

  mapping (address => User) public users;

  function addUser(string memory _title, uint _budget) public {
    users[msg.sender] = User({
      title: _title,
      budget: _budget
    });

    emit TitleAdded(users[msg.sender].title, users[msg.sender].budget);
  }

  function getUserTitle() public view returns(string memory){
    return users[msg.sender].title;
  }

  function getUserBudget() public view returns(uint) {
    return users[msg.sender].budget;
  }
}
