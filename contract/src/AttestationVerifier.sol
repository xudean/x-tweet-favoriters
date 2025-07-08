// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "./utils/StringUtils.sol";
import {IPrimusZKTLS, Attestation} from "@primuslabs/zktls-contracts/src/IPrimusZKTLS.sol";
import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import {JsonParser} from "./utils/JsonParser.sol";
import "forge-std/console.sol";

contract AttestationVerifier is OwnableUpgradeable {
    IPrimusZKTLS public primusZKTLS;
    string[] private supportedTweetUrls;
    string[] private favorites;
    event Verified(address recipient);

    using StringUtils for string;
    using JsonParser for string;

    function initialize(address owner, IPrimusZKTLS primusZKTLS_) public initializer {
        __Ownable_init(owner);
        primusZKTLS = primusZKTLS_;
    }

    function addSupportTweet(string memory tweetUrl) public onlyOwner {
        supportedTweetUrls.push(tweetUrl);
    }

    function addFavorite(string memory tweetUrl) public onlyOwner {
        favorites.push(tweetUrl);
    }

    function verifyAndSenToken(Attestation calldata attestation) external payable {
        primusZKTLS.verifyAttestation(attestation);
        address recipient = checkLikesAttestation(attestation);
        require(recipient != address(0), "recipient is zero address");
        //transfer token to recipient
        console.log("transfer token to: ", recipient);
        payable(recipient).transfer(1 ether);
        emit Verified(recipient);
    }

    function checkLikesAttestation(Attestation calldata attestation) public view returns (address) {
        string memory baseUrl = attestation.request.url.extractStr("?");
        require(baseUrl.startsWith("https://x.com/i/api/graphql"), "att url error");
        require(baseUrl.suffixWith("Favoriters"), "att suffix url error");
        require(
            attestation.reponseResolve[0].parsePath.equals(
                "$.data.favoriters_timeline.timeline.instructions[0].entries[*]+"
            ),
            "json path error"
        );
        string memory tweetUrl = attestation.additionParams.extractValue("launch_page");
        bool isSupported = false;
        require(supportedTweetUrls.length > 0, "no supported tweet url");
        for (uint256 i = 0; i < supportedTweetUrls.length; i++) {
            if (tweetUrl.equals(supportedTweetUrls[i])) {
                isSupported = true;
                break;
            }
        }
        if (!isSupported) {
            revert("tweet url not supported");
        }
        //get favorite from attestation
        string memory key = "value";
        string memory favorite = attestation.attConditions.extractValue(key);

        require(favorites.length > 0, "no favorite");
        bool isFavorite = false;
        for (uint256 i = 0; i < favorites.length; i++) {
            if (favorite.equals(favorites[i])) {
                isFavorite = true;
                break;
            }
        }
        if (!isFavorite) {
            revert("favoriter  not favorite");
        }
        console.log("favorite: ", favorite);
        // Attestation is valid
        return attestation.recipient;
    }

    receive() external payable {}
}
