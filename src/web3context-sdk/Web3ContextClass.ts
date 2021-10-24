/* eslint-disable */
import Web3 from "web3";
import axios from "axios";
import Big from "big.js";

import { Cache } from ".";

var redwarAbi = require("." + "/abi/Redwar.json");

class Web3ContextClass {
  // ** Types **
  web3: Web3;
  cache: Cache;
  RedwarContractAddress: string;
  Redwar: any;
  checkIfUserHasNFT: (address: string) => Promise<any>;
  getAllDefaultCharacters: (address: string) => Promise<any>;
  transformCharacterData: (txn: any) => any;
  mintCharacterNFT: (
    characterId: number,
    address: string,
    txSubmitCallback: any,
    txFailCallback: any,
    txConfirmedCallback: any,
    userRejectedCallback: any
  ) => Promise<boolean>;
  addCharacterNFTMintedEventListener: (callback) => boolean;
  removeCharacterNFTMintedEventListener: (callback) => boolean;
  getBigBoss: (address: string) => Promise<any>;
  attackBoss: (
    address: string,
    txSubmitCallback: any,
    txFailCallback: any,
    txConfirmedCallback: any,
    userRejectedCallback: any
  ) => Promise<any>;

  // ** Class Statics **
  static Web3 = Web3;

  // ?? web3 utils should have BN ??
  // @ts-ignore
  static BN = Web3.utils.BN;

  // ** Constructor **
  constructor(web3Provider) {

    this.web3 = new Web3(web3Provider);
    this.cache = new Cache({ allTokens: 86400, ethUsdPrice: 300 });

    var self = this;

    this.RedwarContractAddress = "0x18dbFD4B6952C4f6412f8076C5e788cc980b4208";
    this.Redwar = new this.web3.eth.Contract(
      redwarAbi.abi,
      this.RedwarContractAddress
    );

    this.transformCharacterData = function (txn) {
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

    this.attackBoss = async function (
      address: string,
      txSubmitCallback: any,
      txFailCallback: any,
      txConfirmedCallback: any,
      userRejectedCallback: any
    ) {
      console.log("in attack boss function...")
      let attackBossMethod = this.Redwar.methods.attackBoss();
      console.log("got attack boss method:", attackBossMethod);
      let txn = await attackBossMethod.send({from: address}, (err, transactionHash) => {
        if(err) {
          console.log("TRANSACTION_FAILED:", err);
          userRejectedCallback();
          // return err;
        } else {
          console.log("TRANSACTION_SUBMITTED:", transactionHash);
          txSubmitCallback();
          // return txn;
        }
      }).on('receipt', () => {
        txConfirmedCallback('⚔️ Attacked Boss ⚔️')
        // return txn;
      });
      try {
        return txn.status;
      } catch (e) {
        console.error("Failed to parse tx status for", txn);
      }
      return txn;
    }

    this.getBigBoss = async function (address: string) {
      let txn = await this.Redwar.methods.getBigBoss().call({from: address});
      console.log("big boss data:", txn);
      return this.transformCharacterData(txn);
    }

    this.checkIfUserHasNFT = async function (address: string) {
      let txn = await this.Redwar.methods.checkIfUserHasNFT().call({from: address});
      return this.transformCharacterData(txn);
    }

    this.getAllDefaultCharacters = async function (address: string) {
      let txn = await this.Redwar.methods.getAllDefaultCharacters().call({from: address});
      return txn.map((character) => this.transformCharacterData(character));
    }

    this.mintCharacterNFT = async function (characterId: number, address: string, txSubmitCallback: any, txFailCallback: any, txConfirmedCallback: any, userRejectedCallback: any) {
      console.log("contract mint method:", this.Redwar.methods)
      let mint_method = this.Redwar.methods.mintCharacterNFT(characterId);
      console.log("got mint method:", mint_method);
      const amountToSend = this.web3.utils.toWei("0.02", "ether");
      console.log("Sending", amountToSend, "ethers...");
      let txn = await mint_method.send({from: address, value: amountToSend}, (err, transactionHash) => {
        if(err) {
          console.log("TRANSACTION_FAILED:", err);
          userRejectedCallback();
          return;
        } else {
          console.log("TRANSACTION_SUBMITTED:", transactionHash);
          txSubmitCallback();
        }
      }).on('receipt', txConfirmedCallback);
      try {
        return txn.status;
      } catch (e) {
        console.error("Failed to parse tx status for", txn);
      }
    }

    this.addCharacterNFTMintedEventListener = function (callback) {
      console.log(this.Redwar.events)
      this.Redwar.events.CharacterNFTMinted().on('data', callback);
      return true;
    }

    this.removeCharacterNFTMintedEventListener = function (callback) {
      this.Redwar.events.CharacterNFTMinted().off('data', callback);
      return true;
    }
  }
}

export default Web3ContextClass;
