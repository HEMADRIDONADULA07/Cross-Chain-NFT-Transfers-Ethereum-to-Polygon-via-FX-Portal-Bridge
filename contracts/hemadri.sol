// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "erc721a/contracts/ERC721A.sol";

contract hemadri is ERC721A {
    address public owner;
    uint256 public maximumNFTs = 5;
    string public baseURI = "https://gateway.pinata.cloud/ipfs/QmXzZnvJAuzSiEUi95eP5LwUzuQjhL4vS8MniSMZYp2YoJ/";
    string public promptMessage = "Welcome to Hemadri NFT Collection!"; // Updated prompt message

    constructor() ERC721A("Hemadri", "MVSO") {
        owner = msg.sender;
    }

    // Modifier 
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can access");
        _;
    }

    // Function to mint NFTs
    function mint(uint256 quantity) external payable onlyOwner {
        require(totalSupply() + quantity <= maximumNFTs, "not more than 5 nfts can be minted");
        _mint(msg.sender, quantity);
    }

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    // Function for displaying the updated prompt message
    function getPromptMessage() external view returns (string memory) {
        return promptMessage;
    }
}
