const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const { ethers } = hre;
  const [emisor] = await ethers.getSigners();

  console.log("Iniciando proceso de tokenización...");

  // Cantidad inicial de tokens: 1000 con 18 decimales
  const cantidadInicial = ethers.parseUnits("1000", 18);

  // Desplegar el contrato
  const Token = await ethers.getContractFactory("TokenDeActivo");
  const token = await Token.deploy(cantidadInicial);
  await token.waitForDeployment(); // Para ethers v6

  const tokenAddress = await token.getAddress();
  console.log("Contrato desplegado en:", tokenAddress);

  // Obtener el saldo del emisor
  const saldo = await token.balanceOf(emisor.address);

  // Crear la entrada del log
  const logEntry = {
    timestamp: new Date().toISOString(),
    emisor: emisor.address,
    contrato: tokenAddress,
    tokens_creados: ethers.formatUnits(saldo, 18),
    evento: "Tokenizacion exitosa"
  };

  // Guardar en log_tokenizacion.json
  const path = "log_tokenizacion.json";
  let log = [];

  if (fs.existsSync(path)) {
    const data = fs.readFileSync(path);
    log = JSON.parse(data);
  }

  log.push(logEntry);
  fs.writeFileSync(path, JSON.stringify(log, null, 2));

  console.log("Tokenización registrada exitosamente en log_tokenizacion.json");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});