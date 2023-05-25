import { type Program } from "@coral-xyz/anchor";
import {
  type PublicKey,
  type TransactionInstruction,
  SystemProgram,
} from "@solana/web3.js";
import { type Soar } from "../idl/soar";
import type BN from "bn.js";

export const submitScoreInstruction = async (
  program: Program<Soar>,
  user: PublicKey,
  payer: PublicKey,
  userPlayerAccount: PublicKey,
  authority: PublicKey,
  game: PublicKey,
  leaderboard: PublicKey,
  playerEntryListAddress: PublicKey,
  topEntries: PublicKey,
  score: BN,
  preInstructions: TransactionInstruction[]
): Promise<TransactionInstruction> => {
  const accounts = {
    user,
    payer,
    authority,
    playerAccount: userPlayerAccount,
    game,
    leaderboard,
    topEntries, // TODO:
    playerScores: playerEntryListAddress,
    systemProgram: SystemProgram.programId,
  };
  return program.methods
    .submitScore(score)
    .accounts(accounts)
    .preInstructions(preInstructions)
    .instruction();
};