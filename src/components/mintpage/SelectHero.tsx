import React, { useEffect, useState } from 'react';
import {
  Heading,
  useDisclosure,
  Flex
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
  const [characters, setCharacters] = useState(null);

  // ** Check if user has an NFT on param change **
  useEffect(() => {
    console.log(web3Context)
    const fetchNFTMetadata = async () => {
      console.log('Checking for Character NFT on address:', address);
      const character = await web3Context.checkIfUserHasNFT(address);
      console.log("Got character:", character)
      setCharacterNFT(character)
    };

    const fetchCharacters = async () => {
      console.log('Fetching default characters with address:', address);
      const characters = await web3Context.getAllDefaultCharacters(address);
      console.log("Got characters:", characters)
      setCharacters(characters)
    }

    if (isAuthed) {
      console.log('address:', address);
      fetchNFTMetadata();

      console.log("fetching characters...");
      fetchCharacters();
    }
  }, [address, chainId]);

  const mintCharacterNFTAction = (characterId) => async () => {
    const name_to_mint = characters[characterId].name;
    const mint_result = await web3Context.mintCharacterNFT(characterId, address);
    console.log("Got minting result:", mint_result)
    if(mint_result){
      toast.error({
        title: `Successfully minted ${name_to_mint}!`,
        description:
          "",
        status: "success",
        position: "bottom",
        duration: 2000,
        isClosable: true,
      });
    } else {
      toast.error({
        title: "Transaction Failed!",
        description:
          "Please confirm the mint transaction and try again!",
        status: "error",
        position: "bottom",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <SelectHeroContainer>
      <Heading as="h2" pb="1em">Mint Your Hero. Choose wisely.</Heading>
      <Flex
        flexWrap="wrap"
        justifyContent="center"
      >
        {characters !== null ? characters.map((character, index) => (
          <CharacterItem key={character.name}>
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
            <CharacterItemImage src={character.imageURI} alt={character.name} />
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

const CharacterItem = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  justify-self: center;
  align-self: center;
  margin: 1em;
`;

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
  position: absolute;
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
