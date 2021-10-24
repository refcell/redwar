const main = async () => {
  const gameContractFactory = await hre.ethers.getContractFactory('Redwar');
  // ** Creates a local network and deploys the contract
  // ** This network will be destroyed when this script is done executing
  const gameContract = await gameContractFactory.deploy(
    // Names
    [
      "Matthias",
      "Vitch",
      "Cheese Thief",
      "Dark Claw",
      "Methuselah",
      "Friar Hugo",
      "Abbott Mortimer",
      "Fangburn",
      "Deadnose"
    ],
    // Images
    // [
    //   "https://i.ibb.co/yBXfFHv/Matthias.webp",
    //   "https://i.ibb.co/MSWtV8w/Vitch.webp",
    //   "https://i.ibb.co/vVPCVzW/Cheesethief.webp",
    //   "https://i.ibb.co/0hxQSyM/Darkclaw.webp",
    //   "https://i.ibb.co/MNT3g5H/Methuselah.webp",
    //   "https://i.ibb.co/k39HcNH/Friar-Hugo.webp",
    //   "https://i.ibb.co/N172k9T/Abbot-Mortimer.webp",
    //   "https://i.ibb.co/JHFyvyY/Fangburn.webp",
    //   "https://i.ibb.co/9HDFFWf/Deadnose.webp"
    // ],
    [
      "QmXMmmWotv3veUHpdJgj4EQSz45VNZtEPdiU5Gwjmf7geo", // Matthias
      "QmYgpsS3Bk7VcKeCgJdYvJLopWYMTiZVKcB26LFFBhRetk", // Vitch
      "QmeE93BUKWzVpnKREvACpxWYakvBEJ5BNTnMHcFrC9L4kf", // Cheese Thief
      "QmbM9msGpM1mSosNFUUBoZun5sa4ESZXMA4pxk5k5BLye8", // Dark Claw
      "QmNtw3e59Qn3wQJ8ThrrxiMCSksCoYTKDLXvoHZXFoE6nk", // Methuselah
      "Qmf8cwMsVrY3w9PJkgPKauJ75xx4eNAaZQMnjkSR5dLmLy", // Friar Hugo
      "QmPcHWYqJgNCHurj74LmaWKi4TsxhxB5oXFeotRhTD9YBk", // Abbott Mortimer
      "QmV7HHJBmRfkkjVkevh5vZJXbAm8PL6AsJ3JthYt34KW5i", // Fangburn
      "QmTFucw6dhpoGfmxN5HBL5iDcXHprbCZP7HyrimUMTGZGk" // Deadnose
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
    "Qmeih56pnVeuGzCpqYLWts1Gdv3Gmb29FX6CGTCgjzjqS7", // Boss Image
    // "https://i.ibb.co/6BK1jHL/Slager-The-Cruel.jpg", // Boss image
    // Boss imgbb link: https://ibb.co/TLQb94d
    300, // Boss hp
    75, // Boss attack damage
    10, // Maximum Honorary tokens
    "0xf25e32C0f2928F198912A4F21008aF146Af8A05a"
  );
  await gameContract.deployed();
  console.log("Contract deployed to:", gameContract.address);


  let txn;

  // We only have three characters.
  // an NFT w/ the character at index 2 of our array.
  txn = await gameContract.mintCharacterNFT(2, { value: hre.ethers.utils.parseEther("0.5") });
  await txn.wait();
  
  txn = await gameContract.mintCharacterNFT(7, { value: hre.ethers.utils.parseEther("0.5") });
  await txn.wait();

  console.log("Checking if user has nft...");
  let user_character = await gameContract.checkIfUserHasNFT();
  console.log("Got user character:", user_character);

  // Get the value of the NFT's URI.
  let returnedTokenUri = await gameContract.tokenURI(1);
  console.log("Token URI:", returnedTokenUri);

  // let's test attacking the boss!
  txn = await gameContract.attackBoss();
  await txn.wait();
  txn = await gameContract.attackBoss();
  await txn.wait();
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();