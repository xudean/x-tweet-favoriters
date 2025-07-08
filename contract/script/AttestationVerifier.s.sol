// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "../lib/zktls-contracts/src/IPrimusZKTLS.sol";
import {AttestationVerifier} from "../src/AttestationVerifier.sol";
import {PrimusZKTLS} from "../lib/zktls-contracts/src/PrimusZKTLS.sol";
import {Script, console} from "forge-std/Script.sol";

contract AttestationVerifierDeployer is Script {
    AttestationVerifier public attestationVerifier;

    function setUp() public {}

    function run() public {
        uint256 privateKey = vm.envUint("PRIVATE_KEY");
        address deployerAddress = vm.addr(privateKey);
        console.log("Deployer address: ", deployerAddress);
        vm.startBroadcast(privateKey);
        console.log("deployer balance:",deployerAddress.balance);
        // deploy PrimusZKTLS
        PrimusZKTLS primusZKTLS = new PrimusZKTLS();
        primusZKTLS.initialize(deployerAddress);
        Attestor memory attestor = Attestor({
            attestorAddr: 0xDB736B13E2f522dBE18B2015d0291E4b193D8eF6,
            url: "https://primuslabs.xyz/"
        });

        primusZKTLS.setAttestor(attestor);
        console.log("PrimusZKTLS deployed to: ", address(primusZKTLS));
        attestationVerifier = new AttestationVerifier();
        console.log("msg.sender before balance:", deployerAddress.balance);
        attestationVerifier.initialize(deployerAddress, primusZKTLS);

        //Set you custom data here
        attestationVerifier.addSupportTweet("https://x.com/goose_eggsss/status/1940597194823975242/likes");
        attestationVerifier.addFavorite("goose_eggsss");


        console.log("AttestationVerifier deployed to: ", address(attestationVerifier));

        // transfer 10 ether to attestationVerifier for testing
        (bool success, ) = payable(address(attestationVerifier)).call{value: 1000 ether}("");
        require(success, "Transfer failed");
        console.log("msg.sender:", deployerAddress);
        console.log("msg.sender balance:", deployerAddress.balance);
        console.log("AttestationVerifier balance:", address(attestationVerifier).balance);
        vm.stopBroadcast();
    }
}
