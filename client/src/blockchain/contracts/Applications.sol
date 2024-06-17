// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Applications{
    address public owner;
    uint public value;
    struct Application {
         string Title;
         string Description;
         string userId;
         string Cid;
         string Inventor;

     }
     Application[] public applicationsID;
     uint256 public applicationCount;

  

    function changeValue(string calldata newTitle, string calldata newDescription, string calldata newInventor, string calldata newUserID, string calldata newCid) public payable {
applicationsID.push(Application({Title:newTitle,Description:newDescription,userId:newUserID,Cid:newCid,Inventor:newInventor}));
        // string memory newTitle, string memory newDescription
        // patentsID[patentCount] = Patent(newTitle, newDescription); , ,
        // patentCount++;

    }
}