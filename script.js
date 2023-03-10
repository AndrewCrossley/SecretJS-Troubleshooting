const { SecretNetworkClient } = require("secretjs");

const contract = "secret1kqsmaakeas3ns2cjrqd5yuxjse7n93elted7pj";
const contractHash = "0xab7aadde70fed716abd093b25839f2a56a6c46b8511f8b7b8199328b91f92c44";

const secretjs = new SecretNetworkClient({
    url: "http://localhost:1317",
    chainId: "secretdev-1"
});

document.getElementById("hello").innerHTML = "SecretJS!";

const queryButton = document.getElementById("queryContract");
const keplrButton = document.getElementById("openKeplr");
const queryOutput = document.getElementById("output");

///Get this error at the last line of this function: "Uncaught (in promise) {code: 12, message: 'Not Implemented', details: Array(0)}"
queryButton.addEventListener("click", async function (event) {
    event.preventDefault();
    //// This works... from SecretJS-Templates/1_connecting_to_node
    //const latestBlock = await secretjs.query.tendermint.getLatestBlock({});
    //console.log("ChainId:", latestBlock.block.header.chain_id);
    //console.log("Block height:", latestBlock.block.header.height);
    //console.log("Successfully connected to Secret Network");

    //// Adding the code here from query.js from the 3rd tutorial SecretJS-Templates/3_query_node also works.

    //// For testing purposes, why does this give a 501?:
    const q = await secretjs.query.compute.contractInfo({ contract_address: "secret1kqsmaakeas3ns2cjrqd5yuxjse7n93elted7pj" });
    queryOutput.innerHTML = JSON.stringify(q.contract_address);

    ////What I'd like to have run, but also gives a 501 Not Implemented error:

    //const query = await secretjs.query.compute.queryContract({
    //    contract_address: contract,
    //    code_hash: contractHash,
    //    query: { get_sellers: {} },
    //}).catch((error) => {
    //    console.log("Error in queryContract():", error.message);
    //    throw error; // re-throw the error to propagate it to the next catch block
    //});

    //query.then((result) => {
    //    console.log("Query results: ", result);
    //    queryOutput.innerHTML = JSON.stringify(result);
    //}).catch((error) => {
    //    console.log("Error in query promise: ", error.message);
    //    queryOutput.innerHTML = "Error: " + error.message;
    //});
});

//    try {
//        const query = secretjs.query.compute.queryContract({ //may need "await" after the equals sign.
//            contract_address: contract,
//            query: '{"get_sellers": ()}',
//        });
//        console.log("Query results: ", query);
//        queryOutput.innerHTML = JSON.stringify(query);
//    }
//
//    catch (error) {
//        console.log("Error: ", error);
//        queryOutput.innerHTML = "Error: " + error.message;
//    }


///ingored for now.
keplrButton.addEventListener("click", async () => {
    if (window.keplr) {
        await window.keplr.experimentalSuggestChain({

            chainId: "secretdev-1",
            chainName: "LocalSecret",
            rpc: "http://localhost:26657",
            rest: "http://localhost:1317",
            bip44: {
                coinType: 529,
            }

            ,
            bech32Config: {
                bech32PrefixAccAddr: "secret",
                bech32PrefixAccPub: "secretpub",
                bech32PrefixValAddr: "secretvaloper",
                bech32PrefixValPub: "secretvaloperpub",
                bech32PrefixConsAddr: "secretvalcons",
                bech32PrefixConsPub: "secretvalconspub",
            }

            ,
            currencies: [{
                coinDenom: "SCRT",
                coinMinimalDenom: "uscrt",
                coinDecimals: 6,
                coinGeckoId: "secret",
            }

                ,
            ],
            feeCurrencies: [{
                coinDenom: "SCRT",
                coinMinimalDenom: "uscrt",
                coinDecimals: 6,
                coinGeckoId: "secret",
            }

                ,
            ],
            stakeCurrency: {
                coinDenom: "SCRT",
                coinMinimalDenom: "uscrt",
                coinDecimals: 6,
                coinGeckoId: "secret",
            }

            ,
            coinType: 529,
            gasPriceStep: {
                low: 0.1,
                average: 0.25,
                high: 1,
            }

            ,
            features: ["secretwasm", "stargate", "ibc-transfer", "ibc-go"],
        });
        //const chainId = "secretdev-1";
        //
        //// Enabling before using the Keplr is recommended.
        //// This method will ask the user whether to allow access if they haven't visited this website.
        //// Also, it will request that the user unlock the wallet if the wallet is locked.
        //await window.keplr.enable(chainId);
        //
        //const offlineSigner = window.keplr.getOfflineSigner(chainId);
        //
        //// You can get the address/public keys by `getAccounts` method.
        //// It can return the array of address/public key.
        //// But, currently, Keplr extension manages only one address/public key pair.
        //// XXX: This line is needed to set the sender address for SigningCosmosClient.
        //const accounts = await offlineSigner.getAccounts();
        //
        //// Initialize the gaia api with the offline signer that is injected by Keplr extension.
        //const cosmJS = new SigningCosmosClient(
        //    "https://lcd-cosmoshub.keplr.app",
        //    accounts[0].address,
        //    offlineSigner,
        //);
    }

    else {
        console.error("Keplr extension not found");
    }
});
