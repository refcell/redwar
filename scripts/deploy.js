const main = async () => {
  // ** Compiles contract and generates build under artifacts directory
  const nftContractFactory = await hre.ethers.getContractFactory('MyEpicGame');

  // ** Creates a local network and deploys the contract
  // ** This network will be destroyed when this script is done executing
  const nftContract = await nftContractFactory.deploy(
    // Names
    [
      "Matthias",
      "Vitch",
      "Cheesethief",
      "DarkClaw",
      "Methuselah",
      "Friar Hugo",
      "Abbott Mortimer",
      "Fangburn",
      "Deadnose"
    ],
    // Images
    [
      "https://i.ibb.co/yBXfFHv/Matthias.webp",
      "https://i.ibb.co/MSWtV8w/Vitch.webp",
      "https://i.ibb.co/vVPCVzW/Cheesethief.webp",
      "https://i.ibb.co/0hxQSyM/Darkclaw.webp",
      "https://i.ibb.co/MNT3g5H/Methuselah.webp",
      "https://i.ibb.co/k39HcNH/Friar-Hugo.webp",
      "https://i.ibb.co/N172k9T/Abbot-Mortimer.webp",
      "https://i.ibb.co/JHFyvyY/Fangburn.webp",
      "https://i.ibb.co/9HDFFWf/Deadnose.webp"
    ],
    // uploads
    // [
    //   "https://ibb.co/93N8HQK",
    //   "https://ibb.co/8sTf5zv",
    //   "https://ibb.co/XjsfjJP",
    //   "https://ibb.co/ChfWZK7",
    //   "https://ibb.co/cT57yX9",
    //   "https://ibb.co/YDyRjHR",
    //   "https://ibb.co/JxCjbv3",
    //   "https://ibb.co/894drdy",
    //   "https://ibb.co/XxQhhtd"
    // ],
    // HP values
    [
      800,
      300,
      200,
      400,
      600,
      300,
      400,
      700,
      500
    ],
    // Attack damage values
    [
      200,
      75,
      90,
      150,
      125,
      20,
      55,
      170,
      120,
    ],
    "Slager The Cruel", // Boss name
    "https://i.ibb.co/6BK1jHL/Slager-The-Cruel.jpg", // Boss image
    // Boss imgbb link: https://ibb.co/TLQb94d
    2000, // Boss hp
    75 // Boss attack damage
  );

  // ** Wait until the contract is deployed on the network
  await nftContract.deployed();

  // ** Output the address of the newly deployed contract!
  console.log("Contract deployed to:", nftContract.address);

  // ** Call the mint function
  let tx = await nftContract.mintCharacterNFT(0);
  // ** Wait for mint to occur
  await tx.wait();
  console.log("Minted NFT #1");

  // ** Mint another one
  tx = await nftContract.mintCharacterNFT(1);
  await tx.wait();
  console.log("Minted NFT #2");

  // ** Mint another one
  tx = await nftContract.mintCharacterNFT(2);
  await tx.wait();
  console.log("Minted NFT #3");

  // ** Mint another one
  tx = await nftContract.mintCharacterNFT(3);
  await tx.wait();
  console.log("Minted NFT #4");

  // ** Mint another one
  tx = await nftContract.mintCharacterNFT(4);
  await tx.wait();
  console.log("Minted NFT #5");

  // ** Mint another one
  tx = await nftContract.mintCharacterNFT(5);
  await tx.wait();
  console.log("Minted NFT #6");

  // ** Mint another one
  tx = await nftContract.mintCharacterNFT(6);
  await tx.wait();
  console.log("Minted NFT #7");

  // ** Mint another one
  tx = await nftContract.mintCharacterNFT(7);
  await tx.wait();
  console.log("Minted NFT #8");
};

const exec = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

exec();

// 
// 
// npx hardhat verify --network rinkeby 0x6f1008a1546400BBF825f320cb7587C2E3F1e221 ["Matthias", "Vitch", "Cheesethief", "DarkClaw", "Methuselah", "Friar Hugo", "Abbott Mortimer", "Fangburn", "Deadnose" ], [ "https://i.ibb.co/yBXfFHv/Matthias.webp", "https://i.ibb.co/MSWtV8w/Vitch.webp", "https://i.ibb.co/vVPCVzW/Cheesethief.webp", "https://i.ibb.co/0hxQSyM/Darkclaw.webp", "https://i.ibb.co/MNT3g5H/Methuselah.webp", "https://i.ibb.co/k39HcNH/Friar-Hugo.webp", "https://i.ibb.co/N172k9T/Abbot-Mortimer.webp", "https://i.ibb.co/JHFyvyY/Fangburn.webp", "https://i.ibb.co/9HDFFWf/Deadnose.webp" ], [ 800, 300, 200, 400, 600, 300, 400, 700, 500 ], [ 200, 75, 90, 150, 125, 20, 55, 170, 120 ] "Slager The Cruel", "https://i.ibb.co/6BK1jHL/Slager-The-Cruel.jpg" 2000, 75

// npx hardhat verify --network rinkeby 0x6f1008a1546400BBF825f320cb7587C2E3F1e221 "[\"Matthias\", \"Vitch\", \"Cheesethief\", \"DarkClaw\", \"Methuselah\", \"Friar Hugo\", \"Abbott Mortimer\", \"Fangburn\", \"Deadnose\"]" "[\"https://i.ibb.co/yBXfFHv/Matthias.webp\", \"https://i.ibb.co/MSWtV8w/Vitch.webp\", \"https://i.ibb.co/vVPCVzW/Cheesethief.webp\", \"https://i.ibb.co/0hxQSyM/Darkclaw.webp\", \"https://i.ibb.co/MNT3g5H/Methuselah.webp\", \"https://i.ibb.co/k39HcNH/Friar-Hugo.webp\", \"https://i.ibb.co/N172k9T/Abbot-Mortimer.webp\", \"https://i.ibb.co/JHFyvyY/Fangburn.webp\", \"https://i.ibb.co/9HDFFWf/Deadnose.webp\" ]" "[ 800, 300, 200, 400, 600, 300, 400, 700, 500 ]" "[ 200, 75, 90, 150, 125, 20, 55, 170, 120 ]" "\"Slager The Cruel\"" "\"https://i.ibb.co/6BK1jHL/Slager-The-Cruel.jpg\"" "2000" "75"

// npx hardhat verify --network rinkeby 0x6f1008a1546400BBF825f320cb7587C2E3F1e221 
// ["Matthias", "Vitch", "Cheesethief", "DarkClaw", "Methuselah", "Friar Hugo", "Abbott Mortimer", "Fangburn", "Deadnose"]
// ["https://i.ibb.co/yBXfFHv/Matthias.webp", "https://i.ibb.co/MSWtV8w/Vitch.webp", "https://i.ibb.co/vVPCVzW/Cheesethief.webp", "https://i.ibb.co/0hxQSyM/Darkclaw.webp", "https://i.ibb.co/MNT3g5H/Methuselah.webp", "https://i.ibb.co/k39HcNH/Friar-Hugo.webp", "https://i.ibb.co/N172k9T/Abbot-Mortimer.webp", "https://i.ibb.co/JHFyvyY/Fangburn.webp", "https://i.ibb.co/9HDFFWf/Deadnose.webp" ]
// [ 800, 300, 200, 400, 600, 300, 400, 700, 500 ] 
// [ 200, 75, 90, 150, 125, 20, 55, 170, 120 ] 
// "Slager The Cruel"
// "https://i.ibb.co/6BK1jHL/Slager-The-Cruel.jpg"
// 2000
// 75