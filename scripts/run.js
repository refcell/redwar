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