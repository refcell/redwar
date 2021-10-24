// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

// NFT contract to inherit from.
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

// Helper functions OpenZeppelin provides.
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

import "hardhat/console.sol";

// Helper we wrote to encode in Base64
import "./Base64.sol";

/// @title Redwall
/// @author Andreas Bigger <andreas@nascent.xyz>
/// @notice An ERC721 turn-based mini-game built for the Buildspace NFT Game Alkes Cohort
contract Redwar is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    
    /// @notice The attributes of our characters
    struct CharacterAttributes {
        uint256 characterIndex;
        string name;
        string imageURI;
        uint256 hp;
        uint256 maxHp;
        uint256 attackDamage;
    }

    /// @notice previous time Boss Healed
    uint256 public previousBossHealing;

    /// @dev Honorary tokens for minting when characters die
    Counters.Counter private _honoraryTokenIds;

    /// @dev Maximum honorary token id
    uint256 private _maxHonoryTokenId;

    /// @notice A list of characters
    CharacterAttributes[] public defaultCharacters;

    /// @dev price + developmentFee = 0.02 ether
    uint256 public price = 0.018 ether;
    uint256 public developmentFee = 0.002 ether;

    /// @notice Mapping from nft tokenId => attributes.
    mapping(uint256 => CharacterAttributes) public nftHolderAttributes;

    /// @dev developer
    address private developer;

    /// @notice The Evolving Redwall BigBoss
    struct BigBoss {
      string name;
      string imageURI;
      uint256 level;
      uint256 hp;
      uint256 maxHp;
      uint256 attackDamage;
    }
    BigBoss public bigBoss;

    /// @notice Mapping from address => tokenId
    /// @dev Lazy way of quickly referencing an owner's token id
    mapping(address => uint256) public nftHolders;

    /* -------------------------- *
     *          EVENTS            *
     * -------------------------- */
    
    /// @notice Emitted when a Character is minted by a user
    event CharacterNFTMinted(uint256 indexed tokenId, address sender, uint256 characterIndex);
    
    /// @notice Emitted when a Character finised attacking the BigBoss
    event AttackComplete(uint newBossHp, uint newPlayerHp);

    /// @notice Emitted when the BigBoss dies and is reincarnated
    event BossUpgraded(uint256 indexed level, address conqueror, uint256 maxHp, uint256 attackDamage);

    /// @notice Character Dies
    event CharacterDied(uint256 indexed tokenId, address owner);

    /// @notice Honorary token minted
    event HonoraryMint(uint256 indexed  nextHonoraryToken, address owner, uint256 _characterIndex);


    constructor(
        string[] memory characterNames,
        string[] memory characterImageURIs,
        uint256[] memory characterHp,
        uint256[] memory characterAttackDmg,
        string memory bossName,
        string memory bossImageURI,
        uint256 bossHp,
        uint256 bossAttackDamage,
        uint256 maximumHonoraryTokenId,
        address _developer
    )
        ERC721("Redwar", "RWAR")
    {
      bigBoss = BigBoss({
        name: bossName,
        imageURI: bossImageURI,
        level: 0,
        hp: bossHp,
        maxHp: bossHp,
        attackDamage: bossAttackDamage
      });

      for (uint256 i = 0; i < characterNames.length; i += 1) {
          defaultCharacters.push(
              CharacterAttributes({
                  characterIndex: i,
                  name: characterNames[i],
                  imageURI: characterImageURIs[i],
                  hp: characterHp[i],
                  maxHp: characterHp[i],
                  attackDamage: characterAttackDmg[i]
              })
          );
          CharacterAttributes memory c = defaultCharacters[i];
      }

      // We want to increase the general tokenIds to above the honorary set
      for (uint256 x = 0; x <= maximumHonoraryTokenId; x += 1) {
        _tokenIds.increment();
      }

      // Set the maximum id of the honorary token set
      _maxHonoryTokenId = maximumHonoraryTokenId;
      
      // Increment so we always start at 1 :)
      _honoraryTokenIds.increment();

      // Set the developer
      developer = _developer;
    }

    /// @notice Heals the boss
    function healBoss() public {
      // Check last block update for boss health and try to increase
      if(block.timestamp - previousBossHealing > 43_200) {
        // we are past a day and can give the boss a break
        if(bigBoss.hp + 10 < bigBoss.maxHp) {
          bigBoss.hp = bigBoss.hp + 10;
          previousBossHealing = block.timestamp;
        }
      }
    }

    /// @notice Function to attack the Big Boss
    function attackBoss() public {
      // CHECKS
      // Try and heal boss
      healBoss();

      // TODO: prevent reentrency bug here since player can hit the big boss for damage multiple times
      // while their player storage only gets updated once (overwritten)
      // Get the state of the player's NFT.
      uint256 nftTokenIdOfPlayer = nftHolders[msg.sender];
      CharacterAttributes storage player = nftHolderAttributes[nftTokenIdOfPlayer];

      // Make sure the player has more than 0 HP.
      require (
        player.hp > 0,
        "CHARACTER_HAS_NO_HEALTH"
      );
      
      // Allow player to attack boss.
      if (bigBoss.hp < player.attackDamage) {
        bigBoss.hp = 0;

        // EFFECTS
        // Now we upgrade the boss
        bigBoss.level = bigBoss.level + 1;
        bigBoss.maxHp = bigBoss.maxHp * 2;
        bigBoss.hp = bigBoss.maxHp;
        bigBoss.attackDamage = bigBoss.attackDamage + 5;
        emit BossUpgraded(bigBoss.level, msg.sender, bigBoss.maxHp, bigBoss.attackDamage);

        // INTERACTIONS
        // Transfer reward to user
        payable(msg.sender).call{value: address(this).balance}("");
      } else {
        bigBoss.hp = bigBoss.hp - player.attackDamage;
      }

      // Allow boss to attack player.
      if (player.hp < bigBoss.attackDamage) {
        player.hp = 0;

        emit CharacterDied(nftTokenIdOfPlayer, msg.sender);

        // Get current honorary token id (starts at 1 since we incremented in the constructor).
        uint256 nextHonoraryToken = _honoraryTokenIds.current();

        // Check if we can mint them an honorary token (:
        if(nextHonoraryToken <= _maxHonoryTokenId) {
          // MINT
          _safeMint(msg.sender, nextHonoraryToken);

          // choose the character using the index
          uint256 _characterIndex = nextHonoraryToken % defaultCharacters.length;

          // Store tokenId to character attributes mapping
          nftHolderAttributes[nextHonoraryToken] = CharacterAttributes({
              characterIndex: _characterIndex,
              name: defaultCharacters[_characterIndex].name,
              imageURI: defaultCharacters[_characterIndex].imageURI,
              hp: defaultCharacters[_characterIndex].hp,
              maxHp: defaultCharacters[_characterIndex].hp,
              attackDamage: defaultCharacters[_characterIndex].attackDamage
          });

          // Keep an easy way to see who owns what NFT.
          nftHolders[msg.sender] = nextHonoraryToken;

          // Increment the _honoraryTokenIds for the next person that uses it.
          _honoraryTokenIds.increment();

          emit HonoraryMint(nextHonoraryToken, msg.sender, _characterIndex);
        }
      } else {
        player.hp = player.hp - bigBoss.attackDamage;
      }

      emit AttackComplete(bigBoss.hp, player.hp);
    }

    function checkIfUserHasNFT() public view returns (CharacterAttributes memory) {
      // Get the tokenId of the user's character NFT
      uint256 userNftTokenId = nftHolders[msg.sender];
      // If the user has a tokenId in the map, return their character.
      if (userNftTokenId > 0) {
        return nftHolderAttributes[userNftTokenId];
      }
      // Else, return an empty character.
      else {
        CharacterAttributes memory emptyStruct;
        return emptyStruct;
      }
    }

    /// @notice Return the list of Characters
    function getAllDefaultCharacters() public view returns (CharacterAttributes[] memory) {
      return defaultCharacters;
    }

    /// @notice gets the BigBoss
    /// @return BigBoss
    function getBigBoss() public view returns (BigBoss memory) {
      return bigBoss;
    }

    /// @notice mints a user an NFT
    /// @param _characterIndex the specific character to mint
    function mintCharacterNFT(uint256 _characterIndex) external payable {
      // CHECKS
      healBoss(); // Try and heal boss first
      require(msg.value >= price + developmentFee, "PRICE_NOT_MET");
      require(_characterIndex < defaultCharacters.length, "CHARACTER_NON_EXISTANT");

      // Get current tokenId (starts at 1 since we incremented in the constructor).
      uint256 newItemId = _tokenIds.current();

      // The magical function! Assigns the tokenId to the caller's wallet address.
      _safeMint(msg.sender, newItemId);

      // Try to send fee to developooor
      payable(developer).call{value: developmentFee}("");

      // We map the tokenId => their character attributes. More on this in
      // the lesson below.
      nftHolderAttributes[newItemId] = CharacterAttributes({
          characterIndex: _characterIndex,
          name: defaultCharacters[_characterIndex].name,
          imageURI: defaultCharacters[_characterIndex].imageURI,
          hp: defaultCharacters[_characterIndex].hp,
          maxHp: defaultCharacters[_characterIndex].hp,
          attackDamage: defaultCharacters[_characterIndex].attackDamage
      });

      // Keep an easy way to see who owns what NFT.
      nftHolders[msg.sender] = newItemId;

      // Increment the tokenId for the next person that uses it.
      _tokenIds.increment();

      emit CharacterNFTMinted(newItemId, msg.sender, _characterIndex);
    }

    /// @notice The meat and potatoes returning the token metadata
    /// @dev uses IPFS x Pinata X cloudflare to fetch the metada
    /// @param _tokenId The token Id to fetch the URI for
    /// @return a Base64 encoded string packed with the metadata
    function tokenURI(uint256 _tokenId)
        public
        view
        override
        returns (string memory)
    {
        CharacterAttributes memory charAttributes = nftHolderAttributes[
            _tokenId
        ];

        string memory strHp = Strings.toString(charAttributes.hp);
        string memory strMaxHp = Strings.toString(charAttributes.maxHp);
        string memory strAttackDamage = Strings.toString(charAttributes.attackDamage);

        string memory json = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{"name": "',
                        charAttributes.name,
                        " -- NFT #: ",
                        Strings.toString(_tokenId),
                        '", "description": "Welcome to the Redwood Metaverse", "image": "ipfs://',
                        charAttributes.imageURI,
                        '", "attributes": [ { "trait_type": "Health Points", "value": ',
                        strHp,
                        ', "max_value":',
                        strMaxHp,
                        '}, { "trait_type": "Attack Damage", "value": ',
                        strAttackDamage,
                        "} ]}"
                    )
                )
            )
        );

        string memory output = string(
            abi.encodePacked("data:application/json;base64,", json)
        );

        return output;
    }
}
