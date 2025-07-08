import {PrimusZKTLS} from "@primuslabs/zktls-js-sdk"

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

//just for test
const options = {
    env: "dev"
}
const initAttestaionResult = await primusZKTLS.init(appId, appSecret,options);
console.log("primusProof initAttestaionResult=", initAttestaionResult);

export async function primusProofTest(launchPage: string, myFavoritor: string, callback: (attestation: string) => void) {
    // Set TemplateID and user address.
    const attTemplateID = "fe26c3d4-f9d0-471a-828f-b1dfdf954d70";
    // ***You change address according to your needs.***
    const userAddress = "0x7ab44DE0156925fe0c24482a2cDe48C465e47573";
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