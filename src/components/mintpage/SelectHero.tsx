import React, { useEffect, useState } from 'react';
import {
  Heading,
  Flex
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";

import { NoShadowButton } from "src/components";
import { useWeb3Context } from "src/contexts/Web3Context";
import { onTxSubmitted, onTxFailed, userRejectedCallback, onTxConfirmed } from "src/utils";

const SelectHero = ({ characters, fetchNFTMetadata }) => {
  const { t } = useTranslation();
  const { web3Context, address } = useWeb3Context();

  // ** Add a callback method that will fire when this event is received **
  // const onCharacterMint = async (sender, tokenId, characterIndex) => {
  //   console.log(
  //     `CharacterNFTMinted - sender: ${sender} tokenId: ${tokenId !== null || tokenId !== undefined ? parseInt(tokenId) : 'UNKNOWN'} characterIndex: ${characterIndex !== null || characterIndex !== undefined ? parseInt(characterIndex) : 'UNKNOWN'}`
  //   );

  //   // ** Once our character NFT is minted we can fetch the metadata from our contract **
  //   // ** and set it in state to move onto the Arena **
  //   await fetchNFTMetadata();

  //   if(waitingForMint) {
  //     setWaitingForMint(false);
  //     toast(`💰 Successfully minted ${mintingCharacter ? mintingCharacter.name : 'UNKNOWN'} 💰`, {
  //       position: "bottom-center",
  //       autoClose: 3000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //     });
  //   }
  // };

  const mintCharacterNFTAction = (characterId) => async () => {
    const name_to_mint = characters[characterId].name;
    const mint_result = await web3Context.mintCharacterNFT(
      characterId,
      address,
      onTxSubmitted,
      onTxFailed,
      async () => {
        // ** Once our character NFT is minted we can fetch the metadata from our contract **
        // ** and set it in state to move onto the Arena **
        onTxConfirmed();
        await fetchNFTMetadata();
      },
      userRejectedCallback
    );
  };

  return (
    <SelectHeroContainer>
      <Heading as="h2" pb="1em">{t("Mint Your Hero. Choose wisely.")}</Heading>
      <Flex
        flexWrap="wrap"
        justifyContent="center"
      >
        {characters !== null ? characters.map((character, index) => (
          <CharacterItem key={character.name}>
            <CharacterItemImage src={character.imageURI} alt={character.name} />
            <CharacterStatsContainer>
              <CharacterStatsCode>
                <CharacterItemP>{character.name}</CharacterItemP>
              </CharacterStatsCode>
              <CharacterStatsCode>
                <CharacterItemP>Attack: {character.attackDamage}</CharacterItemP>
              </CharacterStatsCode>
              <CharacterStatsCode>
                <CharacterItemP>HP: {character.hp}</CharacterItemP>
              </CharacterStatsCode>
              <CharacterStatsCode>
                <CharacterItemP>Max HP: {character.maxHp}</CharacterItemP>
              </CharacterStatsCode>
            </CharacterStatsContainer>
            <CharacterMintButton
              type="button"
              onClick={mintCharacterNFTAction(index)}
            >{`Mint ${character.name}`}</CharacterMintButton>
          </CharacterItem>
        )) : ('')}
      </Flex>
    </SelectHeroContainer>
  );
};

const SelectHeroContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
`;

const CharacterItem = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  justify-self: center;
  align-self: center;
  margin: 1em;
`;

// NoShadowButton
const CharacterMintButton = styled.button`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 40px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border: none;
  cursor: pointer;
  background-color: rgb(32, 129, 226);
  color: white;
  font-weight: bold;
  font-size: 16px;
`;

const CharacterStatsContainer = styled(Flex)`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  width: auto;
`;

const CharacterStatsCode = styled.div`
  background-color: #838383;
  border-radius: 5px;
  margin: 10px;
  width: auto;
`;

const CharacterItemP = styled.p`
  margin: 0;
  padding: 5px 10px 5px 10px;
  font-weight: bold;
  width: auto;
`;

const CharacterItemImage = styled.img`
  height: 300px;
  width: 350px;
  border-radius: 10px;
  object-fit: cover;
`;

export default SelectHero;
