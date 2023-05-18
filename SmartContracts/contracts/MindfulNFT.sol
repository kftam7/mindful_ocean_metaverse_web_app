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

/*
interface burnApproveMintPass{
  //function approve(address operator, uint256 tokenId) external;
  function burn(uint256 tokenId) external;
}
*/

contract MindfulNFT is ERC721, ERC721URIStorage, Pausable, Ownable, ERC721Burnable, ERC2981, DefaultOperatorFilterer {
    
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;
    using ECDSA for bytes32;
    address private systemAddress;
    //address private mintPassContractAddress;
    IERC721 private mintPass;
    //IERC721 private NftContract;

    // constructor takes the systemAddress for signature verification and mintPass contract address for checking burn status
    constructor(address _systemAddress, IERC721 _mintPass) ERC721("MindfulNFT", "MINDFUL") {
    //constructor(address _systemAddress, address _mintPassContractAddress) ERC721("MindfulNFT", "MINDFUL") {
        systemAddress = _systemAddress;
        mintPass = _mintPass;
        //mintPassContractAddress = _mintPassContractAddress;
        //NftContract = IERC721(_mintPassContractAddress);
        //NftContract = IERC721(0x3EA34d31a669F6657331c0E041756a740717f35d);
    }

    // pause minting action
    function pause() public onlyOwner {
        _pause();
    }

    // unpause minting action
    function unpause() public onlyOwner {
        _unpause();
    }

    function recoverSigner(bytes32 hash, bytes memory signature) public pure returns (address) {
        bytes32 messageDigest = keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", hash));
        return ECDSA.recover(messageDigest, signature);
    }


    // mint Metaverse NFT
    function mintMindfulNFT(address recipient, string memory uri, address royaltFeeReceiver, uint96 fee, uint256 mintPassId, bytes32 hash, bytes memory signature) public returns(uint256){      

        bool isBurned = false;
        //bool isApproved = false;
        address NFTOwner;

        // check signature
        require(recoverSigner(hash, signature) == systemAddress, "Signature Failed");

        // create mintPass instance
        //burnApproveMintPass mintPassContract = burnApproveMintPass(mintPassContractAddress);
        
        /*
        // set approval
        try mintPassContract.approve(address(this), mintPassId) {
            isApproved = true;
        } catch Error(string memory) {
            isApproved = false;
        } catch (bytes memory) {
            isApproved = false;
        }
        require(isApproved, "Approval Failed");
        */


        /*
        // set approval
        //try NftContract.approve(address(this), mintPassId) {
        try NftContract.setApprovalForAll(address(this), true){
            isApproved = true;
        } catch Error(string memory) {
            isApproved = false;
        } catch (bytes memory) {
            isApproved = false;
        }
        require(isApproved, "Approval Failed"); 
        */   

        /*
        // burn mintPass NFT
        try mintPassContract.burn(mintPassId) {
            isBurned = true;
        } catch Error(string memory) {
            isBurned = false;
        } catch (bytes memory) {
            isBurned = false;
        }
        require(isBurned, "MintPass not burned");
        */

        // check if MintPass is burned
        try mintPass.ownerOf(mintPassId) returns (address result) {
        //try mintPass.burn(mintPassId){
            NFTOwner = result;
            isBurned = false;
        } catch Error(string memory) {
            isBurned = true;
        } catch (bytes memory) {
            isBurned = true;
        }
        require(isBurned, "MintPass not burned");

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
