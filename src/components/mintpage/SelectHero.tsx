import { useState } from 'react';
import {
  Heading,
  Flex,
  Text,
  Image,
  CircularProgress
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";

import { NoShadowButton } from "src/components";
import { useWeb3Context } from "src/contexts/Web3Context";
import { onTxSubmitted, onTxFailed, userRejectedCallback, onTxConfirmed } from "src/utils";

const SelectHero = ({ character, characters, fetchNFTMetadata }) => {
  const { t } = useTranslation();
  const { web3Context, address } = useWeb3Context();
  const [minting, setMinting] = useState(false);
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
      (msg) => {
        setMinting(true);
        onTxSubmitted();
      },
      () => {
        setMinting(false);
        onTxFailed()
      },
      async () => {
        setMinting(false);
        // ** Once our character NFT is minted we can fetch the metadata from our contract **
        // ** and set it in state to move onto the Arena **
        onTxConfirmed();
        await fetchNFTMetadata();
      },
      () => {
        setMinting(false);
        userRejectedCallback()
      },
    );
  };

  return (
    <SelectHeroContainer>
      {minting && (
        <Flex flexDirection="column" alignItems="center" pt="50px" mb="50px">
          <Flex>
            <CircularProgress isIndeterminate color="green.300" />
            <Text fontWeight="bold" fontSize="28px" paddingLeft="5px">{t("Minting In Progress...")}</Text>
          </Flex>
          <Image
            width="400px"
            pt="25px"
            src="https://media2.giphy.com/media/61tYloUgq1eOk/giphy.gif?cid=ecf05e47dg95zbpabxhmhaksvoy8h526f96k4em0ndvx078s&rid=giphy.gif&ct=g"
            alt="Minting loading indicator"
          />
        </Flex>
      )}
      <Heading as="h2" pb="1em">{t("Mint Your Hero. Choose wisely.")}</Heading>
      <Flex
        flexWrap="wrap"
        justifyContent="center"
      >
        {characters !== null ? characters.map((character, index) => (
          <CharacterItem key={character.name}>
            <CharacterItemImage src={`https://cloudflare-ipfs.com/ipfs/${character.imageURI}`} alt={character.name} />
            <CharacterNameContainer>
              <CharacterNameCode>
                <CharacterNameP>{character.name}</CharacterNameP>
              </CharacterNameCode>
            </CharacterNameContainer>
            <CharacterStatsContainer>
              <CharacterStatsCode>
                <CharacterStatsP>Attack: {character.attackDamage}</CharacterStatsP>
                <CharacterStatsP>HP: {character.hp}</CharacterStatsP>
                <CharacterStatsP>Max HP: {character.maxHp}</CharacterStatsP>
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
  border-radius: 10px;
  border: none;
  cursor: pointer;
  background-color: var(--chakra-colors-blue-600);
  color: white;
  font-weight: bold;
  font-size: 16px;

  &:hover {
    background-color: var(--chakra-colors-blue-500);
  }
`;

const CharacterNameContainer = styled(Flex)`
  position: absolute;
  width: 100%;
  display: flex;
  flex-direction: column;
  width: auto;
`;

const CharacterStatsContainer = styled(Flex)`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  width: auto;
  margin-bottom: 40px;
  padding-bottom: 10px;
`;

const CharacterNameCode = styled.div`
  background-color: var(--chakra-colors-red-700);
  border-radius: 5px;
  margin: 10px;
  width: auto;
`;

const CharacterNameP = styled.p`
  margin: 0;
  padding: 5px 10px 5px 10px;
  font-weight: bold;
  width: auto;
`;

const CharacterStatsCode = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0.8em 0 0.2em 0;
`;

const CharacterStatsP = styled.p`
  padding: 0.5em;
  background-color: var(--chakra-colors-gray-700);
  border-radius: 5px;
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
