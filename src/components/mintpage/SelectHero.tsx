import React, { useEffect, useState } from 'react';
import {
  Heading,
  useDisclosure
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { toast } from "material-react-toastify";
import { useTranslation } from "react-i18next";

import { ConnectWallet, NoShadowButton } from "src/components";
import { useWeb3Context } from "src/contexts/Web3Context";

const SelectHeroContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
`;

const SelectHero = ({ setCharacterNFT }) => {
  const { t } = useTranslation();
  const { isAuthed, balance, web3Context, address, chainId } = useWeb3Context();
  const [validParams, setValidParams] = useState(false);
  const [placingBid, setPlacingBid] = useState(false);

  // ** Does the user want to see a modal to confirm placing bids? **
  const [isNovice, setIsNovice] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [transactionTimedOut, setTransactionTimedOut] = useState(false);

  useEffect(() => {
    if (!isOpen) setTransactionTimedOut(false);
  }, [isOpen]);

  useEffect(() => {
    setIsNovice(localStorage.getItem("BASED_WEB3_APE_MODE") !== "I_AM_BASED");
  }, []);

  // ** Insufficient Funds **
  const [insufficentFunds, setInsufficientFunds] = useState(false);

  // ** Bid Inputs **
  const [bidPrice, setBidPrice] = useState(0.0);
  const [bidQty, setBidQty] = useState(0);

  // ** Are bid inputs empty **
  const [bidPriceEmpty, setBidPriceEmpty] = useState(false);
  const [bidQtyEmpty, setBidQtyEmpty] = useState(false);

  // ** Frozen bid price and qty when submitting a transaction **
  const [frozenBidPrice, setFrozenBidPrice] = useState(bidPrice);
  const [frozenBidQty, setFrozenBidQty] = useState(bidQty);

  // ** Checks if we have enough ETH balance in the connected wallet **
  useEffect(() => {
    setInsufficientFunds(bidPrice * bidQty > balance || balance == 0);
  }, [bidPrice, bidQty, balance]);

  // ** Gas Estimates **
  // TODO: fetch these predicted fees every x time
  // ?? use previous bids to predict new fees ??
  const [lowGasFee, setLowGasFee] = useState(0);
  const [mediumGasFee, setMediumGasFee] = useState(0);
  const [highGasFee, setHighGasFee] = useState(0);

  // ** Helper function to fetch gas timeouts **
  const updateGasEstimates = () => {
    // TODO::::
    console.log("updating gas estimates...");
  };

  // ** Every 15 seconds, update gas estimates **
  useEffect(() => {
    let gasTimer = setTimeout(() => updateGasEstimates(), 15 * 1000);
    return () => {
      clearTimeout(gasTimer);
    };
  }, []);

  // ** Bid placed helper function **
  const placeBid = () => {
    setPlacingBid(true);

    // ** Freeze Inputs **
    const _frozenBidPrice = bidPrice;
    setFrozenBidPrice(_frozenBidPrice);
    const _frozenBidQty = bidQty;
    setFrozenBidQty(_frozenBidQty);

    // ** Validate Frozen Inputs (sanity check) **
    if (validateParams(_frozenBidPrice, _frozenBidQty)) {
      // ** If novice, Pop up modal and await confirmation to continue **
      if (isNovice) {
        onOpen();

        // Set a 1 minute transaction timeout
        setTimeout(() => {
          setTransactionTimedOut(true);
        }, 60 * 1000);
      } else {
        // ** Continue with placing bid **
        submitBid(_frozenBidPrice, _frozenBidQty);
      }
    } else {
      // !! Invalid Inputs !!
      toast.error({
        title: "Invalid Inputs!",
        description:
          "Please enter a valid bid price and quantity and try again!",
        status: "error",
        position: "bottom",
        duration: 3000,
        isClosable: true,
      });
      setPlacingBid(false);
    }
  };

  const submitBid = (_frozenBidPrice, _frozenBidQty) => {
    // TODO: submit transaction
    console.log("placing bid...");

    // ** Unfreeze Everything **
    // TODO: move this to once transaction is placed
    setPlacingBid(false);
  };

  // ** Helper function to validate parameters
  const validateParams = (_bidPrice, _bidQty) => {
    if (_bidPrice && _bidPrice > 0 && _bidQty && _bidQty > 0) {
      setValidParams(true);
      return true;
    }
    // ** Any other case we reject **
    setValidParams(false);
    return false;
  };

  // ** Whenever our input values change, we want to validate them **
  useEffect(() => {
    validateParams(bidPrice, bidQty);
  }, [bidPrice, bidQty]);


  // ** Check if user has an NFT on param change **
  useEffect(() => {
    console.log(web3Context)
    const fetchNFTMetadata = async () => {
      console.log('Checking for Character NFT on address:', address);
      const character = await web3Context.checkIfUserHasNFT();
      console.log("Got character:", character)
      setCharacterNFT(character)
    };

    if (isAuthed) {
      console.log('address:', address);
      fetchNFTMetadata();
    }
  }, [address, chainId]);

  return (
    <SelectHeroContainer>
      <Heading as="h2">Mint Your Hero. Choose wisely.</Heading>
    </SelectHeroContainer>
  );
};

export default SelectHero;
