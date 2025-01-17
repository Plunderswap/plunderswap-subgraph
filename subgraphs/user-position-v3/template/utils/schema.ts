import { BigInt, Bytes, ethereum } from "@graphprotocol/graph-ts";
import { Transaction, UserPosition } from "../generated/schema";
import { ZERO_BI } from "./constants";

export function loadTransaction(event: ethereum.Event): Transaction {
  let transaction = Transaction.load(event.transaction.hash.toHexString());
  if (transaction === null) {
    transaction = new Transaction(event.transaction.hash.toHexString());
  }
  transaction.blockNumber = event.block.number;
  transaction.timestamp = event.block.timestamp;
  transaction.gasPrice = event.transaction.gasPrice;
  transaction.gasUsed = BigInt.fromI32(0);
  transaction.isPositionUpdated = false;
  transaction.save();
  return transaction;
}

export function updateUserPosition(event: ethereum.Event, tx: Transaction): void {
  if (
    tx.isPositionUpdated === false &&
    tx.tickLower !== null &&
    tx.tickUpper !== null &&
    tx.tokenId !== null &&
    tx.positionOwner !== null &&
    tx.pool !== null &&    
    (tx.increaseLiquidityAmount !== null || tx.decreaseLiquidityAmount !== null)
  ) {
    let tokenId = tx.tokenId!.toString();
    let userPosition = UserPosition.load(tokenId);
    if (userPosition === null) {
      userPosition = new UserPosition(tokenId);
      userPosition.liquidity = ZERO_BI;
      userPosition.createdAtBlockNumber = event.block.number;
      userPosition.createdAtTimestamp = event.block.timestamp;
    }

    // Now we know userPosition is not null
    userPosition.pool = tx.pool!;
    userPosition.tickLower = tx.tickLower!;
    userPosition.tickUpper = tx.tickUpper!;
    userPosition.owner = tx.positionOwner!;
    userPosition.originOwner = tx.positionOwner!;
    
    if (tx.increaseLiquidityAmount !== null) {
      userPosition.liquidity = userPosition.liquidity.plus(tx.increaseLiquidityAmount!);
    }
    if (tx.decreaseLiquidityAmount !== null) {
      userPosition.liquidity = userPosition.liquidity.minus(tx.decreaseLiquidityAmount!);
    }

    tx.isPositionUpdated = true;
    tx.save();
    userPosition.save();
  }
}
