// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Patents{
    address public owner;
    uint public value;
    struct Patent {
         string Title;
         string Description;
         string userId;
         string Cid;
         string Inventor;
         string ApplicationID;

     }
     Patent[] public patentsID;
     uint256 public patentCount;

  

    function changeValue(string calldata newTitle, string calldata newDescription, string calldata newInventor, string calldata newUserID, string calldata newCid,string memory newapplicationid) public payable {
patentsID.push(Patent({Title:newTitle,Description:newDescription,userId:newUserID,Cid:newCid,Inventor:newInventor,ApplicationID:newapplicationid}));
        // string memory newTitle, string memory newDescription
        // patentsID[patentCount] = Patent(newTitle, newDescription); , ,
        // patentCount++;

    }
}