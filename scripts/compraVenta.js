const { ethers } = require("hardhat");

async function main() {
  const [emisor, comprador] = await ethers.getSigners();

  console.log("Iniciando prueba de compra y canje...");

  // Desplegar contrato con 1000 tokens iniciales
  const Token = await ethers.getContractFactory("TokenDeActivo");
  const cantidadInicial = ethers.parseUnits("1000", 18);
  const token = await Token.deploy(cantidadInicial);
  await token.waitForDeployment();

  console.log("Token desplegado correctamente.");
  console.log("Dirección del contrato:", token.target); // v6 usa `target`

  // Ver saldos iniciales
  let saldoEmisor = await token.balanceOf(emisor.address);
  console.log(`Saldo emisor: ${ethers.formatUnits(saldoEmisor, 18)} TDA`);

  // Transferir 10 tokens al comprador
  const tx = await token.transfer(comprador.address, ethers.parseUnits("10", 18));
  await tx.wait();
  console.log("Transferencia realizada.");

  let saldoComprador = await token.balanceOf(comprador.address);
  console.log(`Saldo comprador: ${ethers.formatUnits(saldoComprador, 18)} TDA`);

  // Comprador canjea 5 tokens
  const canjeTx = await token.connect(comprador).canjear(ethers.parseUnits("5", 18));
  await canjeTx.wait();
  console.log("Canje realizado.");

  // Mostrar saldo final del comprador
  saldoComprador = await token.balanceOf(comprador.address);
  console.log(`Saldo comprador después del canje: ${ethers.formatUnits(saldoComprador, 18)} TDA`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});