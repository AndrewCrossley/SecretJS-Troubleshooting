// Various failed SecretNetworkClient implementation attempts:

//const { SecretNetworkClient } = require("secretjs");
//const { SecretNetworkClient } = require("./node_modules/secretjs/dist/index");
//const { SecretNetworkClient } = require("./node_modules/secretjs/dist/secret_network_client.js");
//import { SecretNetworkClient } from "./node_modules/secretjs/dist/index.js";
//import { SecretNetworkClient } from "./node_modules/secretjs/dist/secret_network_client.js";
import { SecretNetworkClient } from "secretjs";

const contract = "secret1kqsmaakeas3ns2cjrqd5yuxjse7n93elted7pj";

const secretjs = new SecretNetworkClient({
    url: "http://localhost:1317"
});

document.getElementById("hello").innerHTML = "Hello World, from JavaScript!";

const queryButton = document.getElementById("queryContract");
const keplrButton = document.getElementById("openKeplr");

queryButton.addEventListener("click", async () => {
    try {
        const query = await secretjs.query.compute.queryContract({
            contract_address: contract,
            query: '{"get_sellers": ()}',
        });
        console.log("Query results: ", query);
    }

    catch (error) {
        console.log("Error: ", error);
    }
});

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
