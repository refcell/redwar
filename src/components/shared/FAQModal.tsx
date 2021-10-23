import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Heading,
  Text,
  OrderedList,
  ListItem,
  Link as ChakraLink,
  UnorderedList,
  Stack,
  Flex,
  Code,
  List,
  ListIcon
} from "@chakra-ui/react";
import { ExternalLinkIcon, CloseIcon } from "@chakra-ui/icons";
import { useTranslation } from "react-i18next";

import { NascentBadge } from ".";

const FAQModal = ({ isOpen = false, onClose = () => {} }) => {
  const { t } = useTranslation();
  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior={"inside"}>
      <ModalOverlay />
      <ModalContent maxWidth={"800px"}>
        <ModalHeader>{t("FAQ")}</ModalHeader>
        <ModalCloseButton />
        <ModalBody width={"auto"}>
          <Flex direction="column" my="1em">
            <Heading mb="0.5em" as="h4" size="md">
              {t("What is RedWar?")}
            </Heading>
            <Text>{t("RedWar is an NFT turn-based multiplayer wargame expanding the metaverse to Redwall! ")}</Text>
            <Text>{t("It is an NFT Game built by Andreas Bigger during the Alkes Cohort of the NFT mini-game course.")}</Text>
            <Stack direction="row">
              <Text>{t("All the source code is available on GitHub at")}</Text>
              <Stack
                marginInlineStart="0.2em"
                width="min-content"
                direction="row"
              >
                <ChakraLink
                  display="flex"
                  margin="auto"
                  color="red.800"
                  isExternal
                  href="https://github.com/abigger87/redwar"
                >
                  RedWar
                  <span style={{ margin: "auto", paddingLeft: "0.2em" }}>
                    <ExternalLinkIcon />
                  </span>
                </ChakraLink>
              </Stack>
            </Stack>
            <Stack direction="row">
              <Text>{t("The NFT mini-game course is available on ")}</Text>
              <Stack
                marginInlineStart="0.2em"
                width="min-content"
                direction="row"
              >
                <ChakraLink
                  display="flex"
                  margin="auto"
                  color="red.800"
                  isExternal
                  href="https://buildspace.so"
                >
                  Buildspace
                  <span style={{ margin: "auto", paddingLeft: "0.2em" }}>
                    <ExternalLinkIcon />
                  </span>
                </ChakraLink>
              </Stack>
            </Stack>
            <Text>{t("How to Play?")}</Text>
            <OrderedList pl="1em" maxWidth="calc(100% - 1em)">
              <ListItem>
                {t("Connect to the Rinbkeby Test Network (Chain ID) with Metamask.")}
                <ListItem>
                  {t("Connect to the Rinbkeby Test Network (Chain ID) with Metamask.")}
                </ListItem>
              </ListItem>
              <ListItem>
                {t(
                  "You can relieve your styling worries using the many Chakra prebuilt components!"
                )}
              </ListItem>
              <ListItem>{t("You can quickly deploy on Vercel for extremely rapid development.")}</ListItem>
            </OrderedList>
          </Flex>

          <Flex direction="column" my="1em">
            <Heading mb="0.5em" as="h4" size="md">
              {t("What Can't RedWar Do?")}
            </Heading>
            <List pl="1em" maxWidth="calc(100% - 1em)">
              <ListItem>
                <ListIcon as={CloseIcon} color="red.500" />
                {t("Promise any financial value. These NFTs are purely for enabling gameplay and should not be considered any form of investment.")}
              </ListItem>
            </List>
            <Text>{t("")}</Text>
            <Text>{t("Not guaranteed to be bug free! This was basically hacked together in one sitting!")}</Text>
            <Text>{t("Provide the contract SDK to integrate into the Dapp. This must be done yourself in the src/web3context-sdk directory.")}</Text>
          </Flex>

          <Flex direction="column" my="1em">
            <Heading mb="0.5em" as="h4" size="md">
              {t("Who's built Nextjs Chakra Dapp?")}
            </Heading>
            <UnorderedList pl="1em" maxWidth="calc(100% - 1em)">
              <ListItem>
                <Stack direction="row">
                  <ChakraLink
                    display="flex"
                    mr="0.2em"
                    color="blue.400"
                    isExternal
                    href="https://twitter.com/andreasbigger"
                  >
                    Andreas Bigger
                    <span style={{ margin: "auto", paddingLeft: "0.2em" }}>
                      <ExternalLinkIcon />
                    </span>
                  </ChakraLink>
                  <NascentBadge />
                </Stack>
              </ListItem>
            </UnorderedList>
          </Flex>

          <Flex direction="column" my="1em">
            <Heading mb="0.5em" as="h4" size="md">
              {t("How to reach out?")}
            </Heading>
            <Stack direction="row">
              <Text>
                {t(
                  "Reach out to on Twitter (links above) or create an issue on the"
                )}
              </Text>
              <Stack
                marginInlineStart="0.2em"
                width="min-content"
                direction="row"
              >
                <ChakraLink
                  display="flex"
                  color="purple.400"
                  isExternal
                  href="https://github.com/abigger87/redwar"
                >
                  GitHub Repo
                  <span style={{ margin: "auto", paddingLeft: "0.2em" }}>
                    <ExternalLinkIcon />
                  </span>
                </ChakraLink>
                !
              </Stack>
            </Stack>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default FAQModal;
