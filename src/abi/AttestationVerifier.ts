export const abi = [
    {
        "type": "receive",
        "stateMutability": "payable"
    },
    {
        "type": "function",
        "name": "addFavorite",
        "inputs": [
            {
                "name": "tweetUrl",
                "type": "string",
                "internalType": "string"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "addSupportTweet",
        "inputs": [
            {
                "name": "tweetUrl",
                "type": "string",
                "internalType": "string"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "checkLikesAttestation",
        "inputs": [
            {
                "name": "attestation",
                "type": "tuple",
                "internalType": "struct Attestation",
                "components": [
                    {
                        "name": "recipient",
                        "type": "address",
                        "internalType": "address"
                    },
                    {
                        "name": "request",
                        "type": "tuple",
                        "internalType": "struct AttNetworkRequest",
                        "components": [
                            {
                                "name": "url",
                                "type": "string",
                                "internalType": "string"
                            },
                            {
                                "name": "header",
                                "type": "string",
                                "internalType": "string"
                            },
                            {
                                "name": "method",
                                "type": "string",
                                "internalType": "string"
                            },
                            {
                                "name": "body",
                                "type": "string",
                                "internalType": "string"
                            }
                        ]
                    },
                    {
                        "name": "reponseResolve",
                        "type": "tuple[]",
                        "internalType": "struct AttNetworkResponseResolve[]",
                        "components": [
                            {
                                "name": "keyName",
                                "type": "string",
                                "internalType": "string"
                            },
                            {
                                "name": "parseType",
                                "type": "string",
                                "internalType": "string"
                            },
                            {
                                "name": "parsePath",
                                "type": "string",
                                "internalType": "string"
                            }
                        ]
                    },
                    {
                        "name": "data",
                        "type": "string",
                        "internalType": "string"
                    },
                    {
                        "name": "attConditions",
                        "type": "string",
                        "internalType": "string"
                    },
                    {
                        "name": "timestamp",
                        "type": "uint64",
                        "internalType": "uint64"
                    },
                    {
                        "name": "additionParams",
                        "type": "string",
                        "internalType": "string"
                    },
                    {
                        "name": "attestors",
                        "type": "tuple[]",
                        "internalType": "struct Attestor[]",
                        "components": [
                            {
                                "name": "attestorAddr",
                                "type": "address",
                                "internalType": "address"
                            },
                            {
                                "name": "url",
                                "type": "string",
                                "internalType": "string"
                            }
                        ]
                    },
                    {
                        "name": "signatures",
                        "type": "bytes[]",
                        "internalType": "bytes[]"
                    }
                ]
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "initialize",
        "inputs": [
            {
                "name": "owner",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "primusZKTLS_",
                "type": "address",
                "internalType": "contract IPrimusZKTLS"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "owner",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "primusZKTLS",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "contract IPrimusZKTLS"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "renounceOwnership",
        "inputs": [],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "transferOwnership",
        "inputs": [
            {
                "name": "newOwner",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "verifyAndSenToken",
        "inputs": [
            {
                "name": "attestation",
                "type": "tuple",
                "internalType": "struct Attestation",
                "components": [
                    {
                        "name": "recipient",
                        "type": "address",
                        "internalType": "address"
                    },
                    {
                        "name": "request",
                        "type": "tuple",
                        "internalType": "struct AttNetworkRequest",
                        "components": [
                            {
                                "name": "url",
                                "type": "string",
                                "internalType": "string"
                            },
                            {
                                "name": "header",
                                "type": "string",
                                "internalType": "string"
                            },
                            {
                                "name": "method",
                                "type": "string",
                                "internalType": "string"
                            },
                            {
                                "name": "body",
                                "type": "string",
                                "internalType": "string"
                            }
                        ]
                    },
                    {
                        "name": "reponseResolve",
                        "type": "tuple[]",
                        "internalType": "struct AttNetworkResponseResolve[]",
                        "components": [
                            {
                                "name": "keyName",
                                "type": "string",
                                "internalType": "string"
                            },
                            {
                                "name": "parseType",
                                "type": "string",
                                "internalType": "string"
                            },
                            {
                                "name": "parsePath",
                                "type": "string",
                                "internalType": "string"
                            }
                        ]
                    },
                    {
                        "name": "data",
                        "type": "string",
                        "internalType": "string"
                    },
                    {
                        "name": "attConditions",
                        "type": "string",
                        "internalType": "string"
                    },
                    {
                        "name": "timestamp",
                        "type": "uint64",
                        "internalType": "uint64"
                    },
                    {
                        "name": "additionParams",
                        "type": "string",
                        "internalType": "string"
                    },
                    {
                        "name": "attestors",
                        "type": "tuple[]",
                        "internalType": "struct Attestor[]",
                        "components": [
                            {
                                "name": "attestorAddr",
                                "type": "address",
                                "internalType": "address"
                            },
                            {
                                "name": "url",
                                "type": "string",
                                "internalType": "string"
                            }
                        ]
                    },
                    {
                        "name": "signatures",
                        "type": "bytes[]",
                        "internalType": "bytes[]"
                    }
                ]
            }
        ],
        "outputs": [],
        "stateMutability": "payable"
    },
    {
        "type": "event",
        "name": "Initialized",
        "inputs": [
            {
                "name": "version",
                "type": "uint64",
                "indexed": false,
                "internalType": "uint64"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "OwnershipTransferred",
        "inputs": [
            {
                "name": "previousOwner",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "newOwner",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "Verified",
        "inputs": [
            {
                "name": "recipient",
                "type": "address",
                "indexed": false,
                "internalType": "address"
            }
        ],
        "anonymous": false
    },
    {
        "type": "error",
        "name": "InvalidInitialization",
        "inputs": []
    },
    {
        "type": "error",
        "name": "NotInitializing",
        "inputs": []
    },
    {
        "type": "error",
        "name": "OwnableInvalidOwner",
        "inputs": [
            {
                "name": "owner",
                "type": "address",
                "internalType": "address"
            }
        ]
    },
    {
        "type": "error",
        "name": "OwnableUnauthorizedAccount",
        "inputs": [
            {
                "name": "account",
                "type": "address",
                "internalType": "address"
            }
        ]
    }
]