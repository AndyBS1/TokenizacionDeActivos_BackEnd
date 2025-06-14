const { ethers } = require("hardhat");

async function main() {
  const Token = await ethers.getContractFactory("TokenDeActivo");
  const token = await Token.deploy();

  console.log("Token desplegado en:", token.target); 
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});