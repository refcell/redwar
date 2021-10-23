import { Flex } from "@chakra-ui/layout";
import React from "react";
import styled from "styled-components";

const MainTrippyImage = styled.img`
  width: 212px;
  height: 213px;
  flex-grow: 0;
  margin: auto;
  transform: rotate(13deg);
  border-radius: 16px;
  grid-column-start: 1;
  grid-row-start: 1;
  z-index: 1;
`;

const MainShadowBackground = styled.div`
  width: 180px;
  height: 205px;
  border-radius: 50px 50px 180px 180px;
  flex-grow: 0;
  margin: auto;
  transform: rotate(13deg);
  -webkit-filter: blur(25px);
  filter: blur(25px);
  background-color: #EB212E;
  grid-column-start: 1;
  grid-row-start: 1;
`;

const TrippyArt = () => {
  return (
    <Flex w="100%">
      <Flex m="auto" w="auto" d="grid">
        <MainShadowBackground />
        <MainTrippyImage src="/redwar.png" alt="Main Art Piece" />
      </Flex>
    </Flex>
  );
};

export default TrippyArt;
