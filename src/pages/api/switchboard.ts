// import * as anchor from "@project-serum/anchor";
// import { clusterApiUrl, Connection, Keypair, PublicKey } from "@solana/web3.js";
// import {
//   AggregatorAccount,
//   loadSwitchboardProgram,
// } from "@switchboard-xyz/switchboard-v2";
// import fs from 'fs';
// import path from 'path';

// const AGGREGATOR_PUBKEY = new PublicKey("GvDMxPzN1sCj7L26YDK2HnMRXEQmQ2aemov8YBtPS7vR");

// export default async function handler(req, res) {
//   try {
//     // JSON dosyasını oku
//     const keypairPath = path.resolve(process.cwd(), 'wallet.json');
//     const privateKey = JSON.parse(fs.readFileSync(keypairPath, "utf-8"));
//     const payerKeypair = Keypair.fromSecretKey(new Uint8Array(privateKey));

//     // Switchboard programını yükle
//     const connection = new Connection(clusterApiUrl("devnet"));
//     const provider = new anchor.AnchorProvider(connection, new anchor.Wallet(payerKeypair), {});
//     anchor.setProvider(provider);
//     const program = anchor.workspace.SwitchboardFeedClient;

//     // Switchboard programını yükle
//     const switchboard = await loadSwitchboardProgram("devnet", provider);

//     // AggregatorAccount oluştur
//     const aggregatorAccount = new AggregatorAccount(switchboard, AGGREGATOR_PUBKEY);

//     // Aggregator verisini yükle
//     const aggregator = await aggregatorAccount.loadData();
//     const latestValue = AggregatorAccount.decodeLatestValue(aggregator);

//     // İşlemi gerçekleştirme
//     const tx = await program.methods
//       .readFeed({ maxConfidenceInterval: null })
//       .accounts({ aggregator: aggregatorAccount.publicKey })
//       .rpc();

//     // İşlemin onaylanmasını bekleme
//     await new Promise(resolve => setTimeout(resolve, 5000));

//     // Onaylanmış işlemi al
//     const confirmedTxn = await provider.connection.getParsedTransaction(tx, "confirmed");

//     // Sonuçları döndürme
//     res.status(200).json({
//       latestValue: latestValue.toString(),
//       transactionLogs: confirmedTxn?.meta?.logMessages,
//     });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: error.message });
//   }
// }
