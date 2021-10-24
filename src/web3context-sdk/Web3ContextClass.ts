/* eslint-disable */
import Web3 from "web3";
import axios from "axios";
import Big from "big.js";

import { Cache } from ".";

var myEpicGameAbi = require("." + "/abi/MyEpicGame.json");

class Web3ContextClass {
  // ** ------------------------------ **
  // ** TYPE YOUR STATE VARIABLES HERE **
  // ** ------------------------------ **

  // ** Types **
  web3: Web3;
  cache: Cache;
  getEthUsdPriceBN: () => Big;
  someAsyncFunction: () => Promise<any>;
  checkIfUserHasNFT: () => Promise<any>;
  getAllDefaultCharacters: () => Promise<any>;
  mintCharacterNFT: () => Promise<boolean>;

  // ** Class Statics **
  static Web3 = Web3;

  // ?? web3 utils should have BN ??
  // @ts-ignore
  static BN = Web3.utils.BN;

  // ** Constructor **
  constructor(web3Provider) {
    // ** -------------------------------- **
    // ** DEFINE YOUR STATE VARIABLES HERE **
    // ** -------------------------------- **

    this.web3 = new Web3(web3Provider);
    this.cache = new Cache({ allTokens: 86400, ethUsdPrice: 300 });

    var self = this;

    this.MyEpicGameContractAddress = "0x6f1008a1546400BBF825f320cb7587C2E3F1e221";
    this.MyEpicGame = new this.web3.eth.Contract(
      myEpicGameAbi.abi,
      this.MyEpicGameContractAddress
    );

    this.transformCharacterData = function (txn) {
      console.log("transforming character data:", txn)
      if(txn.name) {
        return {
            name: txn.name,
            imageURI: txn.imageURI,
            hp: parseFloat(txn.hp),
            maxHp: parseFloat(txn.maxHp),
            attackDamage: parseFloat(txn.attackDamage),
          };
      }
    }

    this.checkIfUserHasNFT = async function (address: string) {
      let txn = await this.MyEpicGame.methods.checkIfUserHasNFT().call({from: address});
      return this.transformCharacterData(txn);
    }

    this.getAllDefaultCharacters = async function (address: string) {
      let txn = await this.MyEpicGame.methods.getAllDefaultCharacters().call({from: address});
      console.log("Got characters:", txn);
      return txn.map((character) => this.transformCharacterData(character));
    }

    this.mintCharacterNFT = async function (characterId: number, address: string) {
      let txn = await this.MyEpicGame.methods.mintCharacterNFT(characterId).send({from: address});
      console.log("Got mintCharacterNFT:", txn);
      return true;
    }


    // ** --------------------- **
    // ** DEFINE FUNCTIONS HERE **
    // ** (functions are vars)  **
    // ** --------------------- **

    this.getEthUsdPriceBN = async function () {
      return await self.cache.getOrUpdate("ethUsdPrice", async function () {
        try {
          return Web3.utils.toBN(
            new Big(
              (
                await axios.get(
                  "https://api.coingecko.com/api/v3/simple/price?vs_currencies=usd&ids=ethereum"
                )
              ).data.ethereum.usd
            )
              .mul(1e18)
              .toFixed(0)
          );
        } catch (error) {
          throw new Error("Error retrieving data from Coingecko API: " + error);
        }
      });
    };

    this.someAsyncFunction = async function (cacheTimeout = 86400) {
      // ** example async function definition
    };
  }
}

export default Web3ContextClass;
