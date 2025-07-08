pragma solidity ^0.8.20;

import "../src/AttestationVerifier.sol";
import "forge-std/Test.sol";
import "forge-std/console.sol";
import {
    Attestation,
    AttNetworkRequest,
    AttNetworkResponseResolve,
    Attestor,
    IPrimusZKTLS
} from "@primuslabs/zktls-contracts/src/IPrimusZKTLS.sol";
import {PrimusZKTLS} from "../lib/zktls-contracts/src/PrimusZKTLS.sol";

contract PrimusZKTLSMock is IPrimusZKTLS {
    function verifyAttestation(Attestation calldata) external pure override {
        return;
    }
}


contract AttestationVerifierTest is Test {
    IPrimusZKTLS public primusZKTLS;
    AttestationVerifier public attestationVerifier;

    address public owner = address(1);

    function setUp() public {
        vm.startPrank(owner);
        console.log("owner: ", owner);
        primusZKTLS = new PrimusZKTLSMock();
        console.log("primusZKTLS: ", address(primusZKTLS));
        attestationVerifier = new AttestationVerifier();
        attestationVerifier.initialize(owner, primusZKTLS);
        vm.deal(address(attestationVerifier), 1 ether);
        console.log("attestationVerifier init success!");
        attestationVerifier.addSupportTweet("https://x.com/goose_eggsss/status/1940597194823975242/likes");
        attestationVerifier.addFavorite("goose_eggsss");
        vm.stopPrank();
    }

    function test_verifyAttestation() public {
        Attestation memory att = mockAttestation();
        console.log("before value:", att.recipient.balance);
        attestationVerifier.verifyAndSenToken(att);
        console.log("after value:", att.recipient.balance);


    }

    function mockAttestation() private pure returns (Attestation memory att) {
        address receiptAddr = address(0x7ab44DE0156925fe0c24482a2cDe48C465e47573);
        AttNetworkResponseResolve[] memory response = new AttNetworkResponseResolve[](1);
        response[0] = AttNetworkResponseResolve({
            keyName: "",
            parseType: "",
            parsePath: "$.data.favoriters_timeline.timeline.instructions[0].entries[*]+"
        });

        Attestor[] memory attesters = new Attestor[](1);
        address addr = stringToAddress("0xdb736b13e2f522dbe18b2015d0291e4b193d8ef6");
        attesters[0] = Attestor({attestorAddr: addr, url: "https://primuslabs.xyz"});

        AttNetworkRequest memory request = AttNetworkRequest({
            url: "https://x.com/i/api/graphql/kZKzT7pXADFmqQByRauqNw/Favoriters?variables=%7B%22tweetId%22%3A%221940597194823975242%22%2C%22count%22%3A20%2C%22includePromotedContent%22%3Atrue%7D&features=%7B%22rweb_video_screen_enabled%22%3Afalse%2C%22payments_enabled%22%3Afalse%2C%22profile_label_improvements_pcf_label_in_post_enabled%22%3Atrue%2C%22rweb_tipjar_consumption_enabled%22%3Atrue%2C%22verified_phone_label_enabled%22%3Afalse%2C%22creator_subscriptions_tweet_preview_api_enabled%22%3Atrue%2C%22responsive_web_graphql_timeline_navigation_enabled%22%3Atrue%2C%22responsive_web_graphql_skip_user_profile_image_extensions_enabled%22%3Afalse%2C%22premium_content_api_read_enabled%22%3Afalse%2C%22communities_web_enable_tweet_community_results_fetch%22%3Atrue%2C%22c9s_tweet_anatomy_moderator_badge_enabled%22%3Atrue%2C%22responsive_web_grok_analyze_button_fetch_trends_enabled%22%3Afalse%2C%22responsive_web_grok_analyze_post_followups_enabled%22%3Atrue%2C%22responsive_web_jetfuel_frame%22%3Atrue%2C%22responsive_web_grok_share_attachment_enabled%22%3Atrue%2C%22articles_preview_enabled%22%3Atrue%2C%22responsive_web_edit_tweet_api_enabled%22%3Atrue%2C%22graphql_is_translatable_rweb_tweet_is_translatable_enabled%22%3Atrue%2C%22view_counts_everywhere_api_enabled%22%3Atrue%2C%22longform_notetweets_consumption_enabled%22%3Atrue%2C%22responsive_web_twitter_article_tweet_consumption_enabled%22%3Atrue%2C%22tweet_awards_web_tipping_enabled%22%3Afalse%2C%22responsive_web_grok_show_grok_translated_post%22%3Afalse%2C%22responsive_web_grok_analysis_button_from_backend%22%3Afalse%2C%22creator_subscriptions_quote_tweet_preview_enabled%22%3Afalse%2C%22freedom_of_speech_not_reach_fetch_enabled%22%3Atrue%2C%22standardized_nudges_misinfo%22%3Atrue%2C%22tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled%22%3Atrue%2C%22longform_notetweets_rich_text_read_enabled%22%3Atrue%2C%22longform_notetweets_inline_media_enabled%22%3Atrue%2C%22responsive_web_grok_image_annotation_enabled%22%3Atrue%2C%22responsive_web_enhance_cards_enabled%22%3Afalse%7D",
            header: "",
            method: "GET",
            body: ""
        });

        bytes[] memory sigBytes = new bytes[](1);
        bytes memory sigByte = hex"f6facb153d57ae1b8015216200033cd93d76da280372cacedaa787c0aada1b597a8b7e992277b08182dc2bf3d0c977c36321a49e52b317ce4341805a4bfd3c4c1c";
        sigBytes[0] = sigByte;
        att = Attestation({
            recipient: receiptAddr,
            request: request,
            reponseResolve: response,
            data: "",
            attConditions: "[{\"op\":\"MATCH_ONE\",\"field\":\"$.data.favoriters_timeline.timeline.instructions[0].entries[*]+\",\"subconditions\":{\"op\":\"STREQ\",\"field\":\"+.content.itemContent.user_results.result.core.screen_name\",\"value\":\"goose_eggsss\"}}]",
            timestamp: 1751955445319,
            additionParams: "{\"algorithmType\":\"proxytls\",\"launch_page\":\"https://x.com/goose_eggsss/status/1940597194823975242/likes\"}",
            attestors: attesters,
            signatures: sigBytes
        });
        return (att);
    }

    function stringToAddress(string memory _addressString) public pure returns (address) {
        bytes memory addressBytes = bytes(_addressString);
        require(addressBytes.length == 42, "Invalid address length");
        address addr;
        assembly {
            addr := mload(add(_addressString, 20))
        }
        return addr;
    }
}
