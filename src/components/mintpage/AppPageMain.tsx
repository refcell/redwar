import { useState } from "react";
import { Flex } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { PlaceBidFrame, NFTFrame, OpenBidsFrame, SelectHero } from ".";

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
  max-width: 800px;
  width: 100%;
  margin: 2em auto auto auto;
`;

const AppPageMain = () => {
  const [character, setCharacterNFT] = useState(null);

  return (
    <Flex minHeight="100px" height="auto" flexGrow={1} p={8}>
      <PageGroup>
        <MarginEightPix>
          <SelectRow>
            <SelectHero setCharacterNFT={setCharacterNFT} />
          </SelectRow>
          {/* <OpenBidRow>
            <OpenBidsFrame />
          </OpenBidRow> */}
        </MarginEightPix>
      </PageGroup>
    </Flex>
  )
}

export default AppPageMain;
