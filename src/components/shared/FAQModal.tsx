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
        <ModalHeader fontSize="4xl" mt={4}>{t("FAQ")}</ModalHeader>
        <ModalCloseButton />
        <ModalBody width={"auto"}>
          <Flex direction="column" mb="1em">
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
                <UnorderedList pl="1em">
                  <ListItem>
                    <Stack direction="row">
                      <Text>Install </Text>
                      <ChakraLink
                        display="flex"
                        mr="0.2em"
                        color="orange.400"
                        isExternal
                        href="https://metamask.io/"
                      >
                        Metamask
                        <span style={{ margin: "auto", paddingLeft: "0.2em" }}>
                          <ExternalLinkIcon />
                        </span>
                      </ChakraLink>
                    </Stack>
                  </ListItem>
                  <ListItem>
                    <Stack direction="row">
                      <Text>Connect to </Text>
                      <ChakraLink
                        display="flex"
                        mr="0.2em"
                        color="yellow.400"
                        isExternal
                        href="https://chainlist.org/"
                      >
                        Rinkeby
                        <span style={{ margin: "auto", paddingLeft: "0.2em" }}>
                          <ExternalLinkIcon />
                        </span>
                      </ChakraLink>
                      <Text>(Chain ID 4)</Text>
                    </Stack>
                  </ListItem>
                  <ListItem>
                    <Stack direction="row">
                      <Text>Get some Rinkeby test Ether at a </Text>
                      <ChakraLink
                        display="flex"
                        mr="0.2em"
                        color="green.400"
                        isExternal
                        href="https://faucet.rinkeby.io/"
                      >
                        Faucet
                        <span style={{ margin: "auto", paddingLeft: "0.2em" }}>
                          <ExternalLinkIcon />
                        </span>
                      </ChakraLink>
                    </Stack>
                  </ListItem>
                </UnorderedList>
              </ListItem>
              <ListItem>
                {t("Launch the RedWar app, and connect your Metamask wallet!")}
              </ListItem>
              <ListItem>
                {t("Then, Choose your hero.")}
              </ListItem>
              <ListItem>
                {t("Finally, defeat Slager The Cruel - Good luck, anon!")}
              </ListItem>
            </OrderedList>
          </Flex>

          <Flex direction="column" my="1em">
            <Heading mb="0.5em" as="h4" size="md">
              {t("What Can't RedWar Do?")}
            </Heading>
            <List pl="1em" maxWidth="calc(100% - 1em)">
              <ListItem>
                <ListIcon as={CloseIcon} color="red.500" />
                {t("Promise any financial value. These NFTs are purely for gameplay and should not be considered any form of investment.")}
              </ListItem>
              <ListItem>
                <ListIcon as={CloseIcon} color="red.500" />
                {t("Guarantee the app is bug-free: remember, this was hacked together in one sitting!")}
              </ListItem>
            </List>
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
                  "Reach out to on Twitter (links above) or create an issue on"
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
                  GitHub
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
