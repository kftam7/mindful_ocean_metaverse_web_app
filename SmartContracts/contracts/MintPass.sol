// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/token/common/ERC2981.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "operator-filter-registry/src/DefaultOperatorFilterer.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract MintPassNFT is ERC721, ERC721URIStorage, Pausable, Ownable, ERC721Burnable, ERC2981, DefaultOperatorFilterer {
    
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;
    using ECDSA for bytes32;
    address private systemAddress;

    // constructor takes the systemAddress for signature verification and mintPass contract address for checking burn status
    constructor(address _systemAddress) ERC721("MintPass", "MPASS") {
        systemAddress = _systemAddress;
    }

    // pause minting action
    function pause() public onlyOwner {
        _pause();
    }

    // unpause minting action
    function unpause() public onlyOwner {
        _unpause();
    }

    //check if signature is valid
    function isValidSignature(bytes32 hash, bytes memory signature) internal view returns (bool isValid) {
        bytes32 signedHash = keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", hash));
        return signedHash.recover(signature) == systemAddress;
    }

    //check if data is valid
    function isDataValid(uint256 timestamp, bytes memory signature) public view {
        // Build the hash and check the sig
        // We only accept sigs from the system
        bytes32 msgHash = keccak256(abi.encodePacked(msg.sender, timestamp));
        require(
            isValidSignature(msgHash, signature),          
            "Invalid signature"
        );
    }

    // mint Metaverse NFT
    function mintMintPass(address recipient, string memory uri, address royaltFeeReceiver, uint96 fee) public payable returns(uint256){
        
        // set the mint price
        require(msg.value >= 10, "Not enough ETH sent; check price!"); 

        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();

        // set tokeID & recipient
        _safeMint(recipient, tokenId);

        // set metadata
        _setTokenURI(tokenId, uri);

        // set loyalty fee
        _setTokenRoyalty(tokenId, royaltFeeReceiver, fee);

        return tokenId;
    }


    // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize)
        internal
        whenNotPaused
        //override(ERC721, ERC721Enumerable)
        override(ERC721)
    {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        //override(ERC721, ERC721Enumerable, ERC2981)
        override(ERC721, ERC2981)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function setApprovalForAll(address operator, bool approved) public override onlyAllowedOperatorApproval(operator) {
        super.setApprovalForAll(operator, approved);
    }

    function approve(address operator, uint256 tokenId) public override onlyAllowedOperatorApproval(operator) {
        super.approve(operator, tokenId);
    }

    function transferFrom(address from, address to, uint256 tokenId) public override onlyAllowedOperator(from) {
        super.transferFrom(from, to, tokenId);
    }

    function safeTransferFrom(address from, address to, uint256 tokenId) public override onlyAllowedOperator(from) {
        super.safeTransferFrom(from, to, tokenId);
    }

    function safeTransferFrom(address from, address to, uint256 tokenId, bytes memory data)
        public
        override
        onlyAllowedOperator(from)
    {
        super.safeTransferFrom(from, to, tokenId, data);
    }

}
