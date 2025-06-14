// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TokenDeActivo is ERC20, Ownable {
    // Constructor que permite definir la cantidad inicial
    constructor(uint256 cantidadInicial) ERC20("Token De Activo", "TDA") Ownable(msg.sender) {
        _mint(msg.sender, cantidadInicial);
    }

    // Función para canjear tokens
    function canjear(uint256 cantidad) public {
        require(balanceOf(msg.sender) >= cantidad, "Saldo insuficiente para canjear");
        _burn(msg.sender, cantidad);
    }
}