require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
import { ethers } from 'ethers';

const SEPOLIA_URL = process.env.SEPOLIA_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const provider = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_SEPOLIA_URL);
const wallet = new ethers.Wallet(process.env.NEXT_PUBLIC_PRIVATE_KEY, provider);

if (!SEPOLIA_URL || !PRIVATE_KEY) {
  throw new Error("Please set your SEPOLIA_URL and PRIVATE_KEY in a .env file");
}

module.exports = {
  solidity: "0.8.28",
  networks: {
    sepolia: {
      chainId: 11155111,
      url: SEPOLIA_URL,
      accounts: [PRIVATE_KEY],
    },
  },
};

// Interact with your smart contracts using `wallet` and `provider`


