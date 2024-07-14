// import type { NextApiRequest, NextApiResponse } from 'next';
// import { ethers } from 'ethers';

// // Chainlink AggregatorV3Interface ABI
// const aggregatorV3InterfaceABI = [
//   {
//     "inputs": [],
//     "name": "decimals",
//     "outputs": [
//       {
//         "internalType": "uint8",
//         "name": "",
//         "type": "uint8"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "inputs": [],
//     "name": "description",
//     "outputs": [
//       {
//         "internalType": "string",
//         "name": "",
//         "type": "string"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "inputs": [],
//     "name": "version",
//     "outputs": [
//       {
//         "internalType": "uint256",
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "uint80",
//         "name": "_roundId",
//         "type": "uint80"
//       }
//     ],
//     "name": "getRoundData",
//     "outputs": [
//       {
//         "components": [
//           {
//             "internalType": "uint80",
//             "name": "roundId",
//             "type": "uint80"
//           },
//           {
//             "internalType": "int256",
//             "name": "answer",
//             "type": "int256"
//           },
//           {
//             "internalType": "uint256",
//             "name": "startedAt",
//             "type": "uint256"
//           },
//           {
//             "internalType": "uint256",
//             "name": "updatedAt",
//             "type": "uint256"
//           },
//           {
//             "internalType": "uint80",
//             "name": "answeredInRound",
//             "type": "uint80"
//           }
//         ],
//         "internalType": "struct AggregatorV3Interface.RoundData",
//         "name": "",
//         "type": "tuple"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "inputs": [],
//     "name": "latestRoundData",
//     "outputs": [
//       {
//         "components": [
//           {
//             "internalType": "uint80",
//             "name": "roundId",
//             "type": "uint80"
//           },
//           {
//             "internalType": "int256",
//             "name": "answer",
//             "type": "int256"
//           },
//           {
//             "internalType": "uint256",
//             "name": "startedAt",
//             "type": "uint256"
//           },
//           {
//             "internalType": "uint256",
//             "name": "updatedAt",
//             "type": "uint256"
//           },
//           {
//             "internalType": "uint80",
//             "name": "answeredInRound",
//             "type": "uint80"
//           }
//         ],
//         "internalType": "struct AggregatorV3Interface.RoundData",
//         "name": "",
//         "type": "tuple"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//   }
// ];

// // Chainlink price feed addresses
// const feeds = [
//   { name: "SOL/USD", address: "0x4ffC43a60e009B551865A93d232E33Fce9f01507" },
// ];

// // Infura API key
// const INFURA_API_KEY = "324aa45506434bc78534893da579e4ff";
// const provider = new ethers.InfuraProvider("mainnet", INFURA_API_KEY);

// const getChainlinkPrice = async () => {
//   try {
//     const prices = await Promise.all(feeds.map(async (feed) => {
//       const priceFeed = new ethers.Contract(feed.address, aggregatorV3InterfaceABI, provider);
//       const latestRoundData = await priceFeed.latestRoundData();
//       const price = latestRoundData.answer.toNumber() / 1e8;
//       return {
//         name: feed.name,
//         price,
//         updatedAt: latestRoundData.updatedAt.toNumber()
//       };
//     }));
//     return prices;
//   } catch (error) {
//     console.error('Error fetching Chainlink price:', error);
//     return null;
//   }
// };

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const chainlinkPrices = await getChainlinkPrice();

//   if (chainlinkPrices !== null) {
//     res.status(200).json(chainlinkPrices);
//   } else {
//     res.status(500).json({ error: 'Failed to fetch prices' });
//   }
// }
