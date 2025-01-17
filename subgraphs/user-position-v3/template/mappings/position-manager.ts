/* eslint-disable prefer-const */
import { BigInt } from "@graphprotocol/graph-ts";
import {
  IncreaseLiquidity as IncreaseLiquidityEvent,
  DecreaseLiquidity as DecreaseLiquidityEvent,
  Transfer as TransferEvent
} from "../generated/NonfungiblePositionManager/NonfungiblePositionManager";
import { UserPosition } from "../generated/schema";
import { loadTransaction } from "../utils/schema";
import { ZERO_BI } from "../utils/constants";

export function handleIncreaseLiquidity(event: IncreaseLiquidityEvent): void {
  let transaction = loadTransaction(event);
  
  let tokenId = event.params.tokenId.toString();
  let userPosition = UserPosition.load(tokenId);
  
  if (userPosition === null) {
    userPosition = new UserPosition(tokenId);
    userPosition.liquidity = ZERO_BI;
    userPosition.owner = event.transaction.from;
    userPosition.originOwner = event.transaction.from;
    userPosition.createdAtBlockNumber = event.block.number;
    userPosition.createdAtTimestamp = event.block.timestamp;
    userPosition.pool = transaction.pool;
    userPosition.tickLower = BigInt.fromI32(0); // Will be updated later
    userPosition.tickUpper = BigInt.fromI32(0); // Will be updated later
  }
  
  userPosition.liquidity = userPosition.liquidity.plus(event.params.liquidity);
  userPosition.save();

  transaction.tokenId = event.params.tokenId;
  transaction.increaseLiquidityAmount = event.params.liquidity;
  transaction.save();
}

export function handleDecreaseLiquidity(event: DecreaseLiquidityEvent): void {
  let transaction = loadTransaction(event);
  
  let tokenId = event.params.tokenId.toString();
  let userPosition = UserPosition.load(tokenId);
  
  if (userPosition !== null) {
    userPosition.liquidity = userPosition.liquidity.minus(event.params.liquidity);
    userPosition.save();
  }

  transaction.tokenId = event.params.tokenId;
  transaction.decreaseLiquidityAmount = event.params.liquidity;
  transaction.save();
}

export function handleTransfer(event: TransferEvent): void {
  let tokenId = event.params.tokenId.toString();
  let userPosition = UserPosition.load(tokenId);
  
  if (userPosition !== null) {
    userPosition.owner = event.params.to;
    
    // Check if the from address matches the current originOwner
    if (event.params.from.equals(userPosition.originOwner)) {
      userPosition.originOwner = event.params.to;
    }
    
    userPosition.save();
  }
}
