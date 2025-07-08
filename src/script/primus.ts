import {PrimusZKTLS} from "@primuslabs/zktls-js-sdk"
import {ethers} from "ethers";
import {abi} from "../abi/AttestationVerifier.ts";
// Initialize parameters.
const primusZKTLS = new PrimusZKTLS();

//**** Set appId and appSecret here!!!
const appId = "0x17ae11d76b72792478d7b7bcdc76da9574ab3cf8";
const appSecret =
    "0xafa01caf44f07d2b21bc5e2bde1de2a8ba56f33ac2e223169f99634f57d049b5";
if (!appId || !appSecret) {
    alert("appId or appSecret is not set.")
    throw new Error("appId or appSecret is not set.");
}
const viteprivatekey = import.meta.env.VITE_PRIVATE_KEY;
const viterpcurl = import.meta.env.VITE_RPC_URL;
console.log("viterpcurl=", viterpcurl)
const contractAddr = import.meta.env.VITE_CONTRACT_ADDRESS;
const provider = new ethers.JsonRpcProvider(viterpcurl);
const wallet = new ethers.Wallet(viteprivatekey, provider);
console.log("wallet=", wallet.address)

// Contract address
const contract = new ethers.Contract(contractAddr, abi, wallet);
const contractBalance: ethers.BigNumberish = await provider.getBalance(contractAddr);
console.log(`contractAddr ${contractAddr}:${contractBalance}`);
//just for test
const options = {
    env: "production"
}
const initAttestaionResult = await primusZKTLS.init(appId, appSecret,options);
console.log("primusProof initAttestaionResult=", initAttestaionResult);

export async function primusProofTest(launchPage: string, myFavoritor: string, callback: (attestation: string) => void) {
    // Set TemplateID and user address.
    const attTemplateID = "fe26c3d4-f9d0-471a-828f-b1dfdf954d70";
    // ***You change address according to your needs.***
    const userAddress = wallet.address;
    // Generate attestation request.
    const request = primusZKTLS.generateRequestParams(attTemplateID, userAddress);
    const addtionParams = {
        "launch_page": launchPage
    }
    request.setAdditionParams(JSON.stringify(addtionParams))
    request.setAttConditions([
        [
            {
                type: "CONDITION_EXPANSION",
                op: "MATCH_ONE",
                key: "my_favoriter",
                field: "$.data.favoriters_timeline.timeline.instructions[0].entries[*]+",
                value: [
                    {
                        type: "FIELD_RANGE",
                        op: "STREQ",
                        field: "+.content.itemContent.user_results.result.core.screen_name",
                        value: myFavoritor,
                    }
                    // {
                    //     type: "FIELD_RANGE",
                    //     op: "STREQ",
                    //     field: "+.content.entryType",
                    //     value: "TimelineTimelineItem",
                    // },
                    // {
                    //     "type": "CONDITION_EXPANSION",
                    //     "op": "&",
                    //     "subconditions": [
                    //         {
                    //             type: "FIELD_RANGE",
                    //             op: "STREQ",
                    //             field: "+.content.itemContent.user_results.result.core.screen_name",
                    //             value: myFavoritor,
                    //         },
                    //         {
                    //             type: "FIELD_RANGE",
                    //             op: "STREQ",
                    //             field: "+.content.entryType",
                    //             value: "TimelineTimelineItem",
                    //         },
                    //     ]
                    // },
                ],
            },
        ],
    ]);
    // request.setAttMode({
    //     algorithmType: "proxytls"
    // });

    // Transfer request object to string.
    const requestStr = request.toJsonString();

    // Sign request.
    const signedRequestStr = await primusZKTLS.sign(requestStr);

    // Start attestation process.
    const attestation = await primusZKTLS.startAttestation(signedRequestStr);
    console.log("attestation=", attestation);

    // Verify siganture.
    const verifyResult = await primusZKTLS.verifyAttestation(attestation)
    console.log("verifyResult=", verifyResult);

    if (verifyResult === true) {
        // Business logic checks, such as attestation content and timestamp checks
        // do your own business logic.
        callback(attestation)
    } else {
        // If failed, define your own logic.
    }
}

export async function verifyAndClaimToken(attestation: any){
    const balance: ethers.BigNumberish = await provider.getBalance(wallet.address);
    console.log(`Before claim balance of ${wallet.address}: ${balance.toString()} wei`);
    console.log(`In ETH: ${ethers.formatEther(balance)} ETH`);
    console.log("verifyAndClaimToken attestation=", attestation)
    const tx =await contract.verifyAndSenToken(attestation);
    const txreceipt = await tx.wait();
    console.log("receipt", txreceipt);
    setTimeout(async ()=>{
        const balanceAfter = await provider.getBalance(wallet.address);
        console.log(`After claim balance of${wallet.address}: ${balanceAfter.toString()} wei`);
        console.log(`In ETH: ${ethers.formatEther(balanceAfter)} ETH`);
    }, 2000)

}