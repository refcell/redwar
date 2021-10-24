import { useState, useEffect } from "react";
import {
  Heading,
  Flex
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { SelectHero, Arena } from ".";
import { useTranslation } from "react-i18next";

import { NoShadowButton } from "src/components";
import { useWeb3Context } from "src/contexts/Web3Context";
import { onTxSubmitted, onTxFailed, userRejectedCallback, onTxConfirmed } from "src/utils";

const AppPageMain = () => {
  const { t } = useTranslation();
  const { isAuthed, balance, web3Context, address, chainId } = useWeb3Context();
  const [characters, setCharacters] = useState(null);
  const [waitingForMint, setWaitingForMint] = useState(false);
  const [mintingCharacter, setMintingCharacter] = useState(null);
  const [character, setCharacterNFT] = useState(null);
  const [boss, setBoss] = useState(null);
  const [attackState, setAttackState] = useState(''); // '' | 'hit' | 'attacking'

  const runAttackAction = async () => {
    try {
      let attackTxn = await web3Context.attackBoss(
        address,
        onTxSubmitted,
        onTxFailed,
        async (msg) => {
          onTxConfirmed(msg);
          await fetchBoss();
          await fetchNFTMetadata();
        },
        userRejectedCallback
      );
      console.log('attackTxn:', attackTxn);
      setAttackState('hit');
    } catch (error) {
      console.error('Error attacking boss:', error);
      setAttackState('');
    }
  };

  // ** Refactored function to check if the user has an nft **
  const fetchNFTMetadata = async () => {
    const tempCharacter = await web3Context.checkIfUserHasNFT(address);
    setCharacterNFT(tempCharacter)
  };

  // ** Refactored function to get the list of characters available to mint **
  const fetchCharacters = async () => {
    const characters = await web3Context.getAllDefaultCharacters(address);
    setCharacters(characters)
  }

  // ** Refactored function to fetch the big boss **
  const fetchBoss = async () => {
    const characters = await web3Context.getBigBoss(address);
    setBoss(characters)
  }

  // ** On address of chainId change, and authed, call hooks **
  useEffect(() => {
    if (isAuthed) {
      // ** Add a callback listener for minting events **
      // web3Context.addCharacterNFTMintedEventListener(onCharacterMint);
      
      // ** Fetch the NFT Metadata **
      fetchNFTMetadata();

      // ** Fetch the default Characters **
      fetchCharacters();

      // ** Fetch the Boss **
      fetchBoss();
    }

    // ** Remove on component dismount **
    // return () => {
    //   web3Context.removeCharacterNFTMintedEventListener(onCharacterMint);
    // }
  }, [address, chainId]);
  
  return (
    <Flex minHeight="100px" height="auto" flexGrow={1} p={8}>
      <PageGroup>
        <MarginEightPix>
          <Flex flexDirection="column" alignItems="center" justifyContent="space-between" pb="2em">
            <Arena character={character} boss={boss} attackState={attackState} runAttackAction={runAttackAction} />
            <SelectHero character={character} fetchNFTMetadata={fetchNFTMetadata} characters={characters} />
          </Flex>
        </MarginEightPix>
      </PageGroup>
    </Flex>
  )
};

const PageGroup = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SelectRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 2em;
`;

const OpenBidRow = styled.div`
  margin: auto;
  width: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const MarginEightPix = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto auto auto;
`;

export default AppPageMain;
