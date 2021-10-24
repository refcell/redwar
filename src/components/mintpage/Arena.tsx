import React, { useEffect, useState } from 'react';
import {
  Heading,
  useDisclosure,
  Flex,
  Progress,
  Text
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { toast } from 'react-toastify';
import { useTranslation } from "react-i18next";
import { ConnectWallet, NoShadowButton } from "src/components";
import { useWeb3Context } from "src/contexts/Web3Context";

// ** Pass in characterNFT metadata **
const Arena = ({ character, boss, attackState, runAttackAction }) => {
  const { t } = useTranslation();

  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      m="auto"
    >
      <BattleHeading>Battle the Boss</BattleHeading>
      <SubHeading>The conqueror receives all minting proceeds!</SubHeading>
      {boss ? (
        <Flex
          flexDirection="column"
          justifyContent="space-around"
          mb="50px"
        >
          <Flex
            flexDirection="column"
            p="15px"
            borderRadius="10px"
            backgroundImage="linear-gradient(to right, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b12a5b 100%)"
            backgroundSize="600% 600%"
            animation={
              attackState === "attacking" ?
              "shake 1.2s cubic-bezier(0.36, 0.07, 0.19, 0.97) both infinite" :
              (attackState === "hit" ? 
                "hit-bounce 1s ease" :
                "gradient-animation 8s ease infinite"
              )
            }
            transform={attackState === "attacking" ? "translate3d(0, 0, 0)" : ""}
            backfaceVisibility={attackState === "attacking" ? "hidden" : ""}
            perspective={attackState === "attacking" ? "1000px" : ""}
            mb="25px"
          >
            <Heading fontWeight="bold" color="black" as="h2" p="5px 0 10px 0">🔥 {boss.name} 🔥</Heading>
            <ImageContent>
              <BossImage src={`https://cloudflare-ipfs.com/ipfs/${boss.imageURI}`} alt={`Boss ${boss.name}`} />
              <HealthBar className="healthBar">
                <Progress colorScheme={
                    parseFloat(boss.hp) / parseFloat(boss.maxHp) < 0.30 ? "red" : (
                      parseFloat(boss.hp) / parseFloat(boss.maxHp) < 0.60 ? "yellow" : "green"
                    )
                   } height="30px" value={boss.hp} max={boss.maxHp} />
                <HealthBarText>{`${boss.hp} / ${boss.maxHp} HP`}</HealthBarText>
              </HealthBar>
            </ImageContent>
            <Flex m="0.5em">
                <Text fontWeight="bold" color="black">{`⚔️ Attack Damage: ${boss.attackDamage} ⚔️`}</Text>
              </Flex>
          </Flex>
          <Flex
            flexDirection="column"
            justifyContent="center"
          >
            <AttackContainerButton disabled={character ? false : true} onClick={runAttackAction}>
              { character ? `💥 Attack ${boss.name} 💥` : "Can't attack - mint a hero below first!"}
            </AttackContainerButton>
          </Flex>
        </Flex>
      ) : ('')}

      {character && (<Heading as="h2" color="white !important" pb="1em">{t("Your Heros")}</Heading>)}
      {character && (
        <Flex // players-container
          justifyContent="space-around"
          width="100%"
          height="100%"
          mb="50px"
        >
          <Flex // player-container
            justifyContent="space-around"
            width="100%"
            height="100%"
          >
            <Flex // player
              flexDirection="column"
              maxHeight="80%"
              p="10px"
              borderRadius="10px"
              backgroundColor="gray"
            >
              <ImageContent>
                <Text fontWeight="bold" color="black" fontSize="20px" p="5px 0 10px 5px">{character.name}</Text>
                <PlayerImage
                  src={`https://cloudflare-ipfs.com/ipfs/${character.imageURI}`}
                  alt={`Character ${character.name}`}
                />
                <HealthBar className="healthBar">
                  <Progress colorScheme={
                    parseFloat(character.hp) / parseFloat(character.maxHp) < 0.30 ? "red" : (
                      parseFloat(character.hp) / parseFloat(character.maxHp) < 0.60 ? "yellow" : "green"
                    )
                   } height="30px" value={character.hp} max={character.maxHp} />
                  <HealthBarText>{`${character.hp} / ${character.maxHp} HP`}</HealthBarText>
                </HealthBar>
              </ImageContent>
              <Flex m="0.5em">
                <Text fontWeight="bold" color="black">{`⚔️ Attack Damage: ${character.attackDamage} ⚔️`}</Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      )}
    </Flex>
  );
};

const SubHeading = styled(Heading)`
  font-family: Impact;
  font-size: 22px !important;
  font-weight: lighter;
  line-height: 1.35;
  letter-spacing: 0.028em;
  text-align: center;
  color: #fff;
  padding-top: 0.5em;
  padding-bottom: 1.5em;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 900px) {
    font-size: 22px;
    max-width: 400px;
  }
  background-image: linear-gradient(
    70deg,
    var(--chakra-colors-blue-300) 15%,
    var(--chakra-colors-green-600) 75%
  );
  background-clip: text;
  color: transparent !important;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  transform: scale(1, 1.4);
  -webkit-transform: scale(1, 1.4); /* Safari and Chrome */
  -moz-transform: scale(1, 1.4); /* Firefox */
  -ms-transform: scale(1, 1.4); /* IE 9+ */
  -o-transform: scale(1, 1.4); /* Opera */
`;

const BattleHeading = styled(Heading)`
  margin: 0.5em;
  font-family: Impact;
  font-size: 60px !important;
  line-height: 60px !important;
  font-weight: 900;
  font-stretch: normal;
  font-style: normal;
  font-weight: bold;
  font-family: Impact;
  background-image: linear-gradient(
    70deg,
    var(--chakra-colors-yellow-300) 15%,
    var(--chakra-colors-yellow-600) 75%
  );
  text-transform: uppercase;
  background-clip: text;
  color: transparent !important;
  text-align: center;
  letter-spacing: 0.02em;
  text-decoration: none;
  display: inline-block;
  transform: scale(1, 1.6);
  -webkit-transform: scale(1, 1.6); /* Safari and Chrome */
  -moz-transform: scale(1, 1.6); /* Firefox */
  -ms-transform: scale(1, 1.6); /* IE 9+ */
  -o-transform: scale(1, 1.6); /* Opera */
`;

const PlayerImage = styled.img`
  width: 250px;
  height: 300px;
  border-radius: 10px;
  object-fit: cover;
  margin-bottom: 40px;
`;

const AttackContainerButton = styled.button`
  height: 60px;
  border-radius: 10px;
  font-size: 18px;
  background-image: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  background-size: 200% 200%;
  animation: gradient-animation 4s ease infinite;
`;


const HealthBarText = styled.p`
  position: absolute;
  width: 100%;
  font-weight: bold;
  color: black;
  bottom: 2px;
  left: 5px;
`;

const HealthBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 30px;
`;

const BossImage = styled.img`
  width: 350px;
  height: 300px;
  border-radius: 10px;
  object-fit: cover;
  margin-bottom: 40px;
`;

const ImageContent = styled.div`
  position: relative;
`;

export default Arena;