const main = async () => {
  const gameContractFactory = await hre.ethers.getContractFactory('MyEpicGame');
  const gameContract = await gameContractFactory.deploy(
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
      "https://ibb.co/93N8HQK",
      "https://ibb.co/8sTf5zv",
      "https://ibb.co/XjsfjJP",
      "https://ibb.co/ChfWZK7",
      "https://ibb.co/cT57yX9",
      "https://ibb.co/YDyRjHR",
      "https://ibb.co/JxCjbv3",
      "https://ibb.co/894drdy",
      "https://ibb.co/XxQhhtd"
    ],
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
    ]
  );
  await gameContract.deployed();
  console.log("Contract deployed to:", gameContract.address);

  let txn;

  // We only have three characters.
  // an NFT w/ the character at index 2 of our array.
  txn = await gameContract.mintCharacterNFT(2);
  await txn.wait();

  // Get the value of the NFT's URI.
  let returnedTokenUri = await gameContract.tokenURI(1);
  console.log("Token URI:", returnedTokenUri);

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