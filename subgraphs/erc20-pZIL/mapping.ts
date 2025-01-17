import { BigInt, Address } from "@graphprotocol/graph-ts"
import {
  Transfer as TransferEvent,
  Token as TokenContract
} from "./generated/Token/Token"
import { Token, Account, Transfer } from "./generated/schema"

export function handleTransfer(event: TransferEvent): void {
  let token = Token.load("1")
  if (!token) {
    token = new Token("1")
    let contract = TokenContract.bind(event.address)
    
    // Safely load token data with null checks
    let tokenSymbol = contract.try_symbol()
    let tokenName = contract.try_name()
    let tokenDecimals = contract.try_decimals()
    let tokenSupply = contract.try_totalSupply()

    token.symbol = tokenSymbol.reverted ? "" : tokenSymbol.value
    token.name = tokenName.reverted ? "" : tokenName.value
    token.decimals = tokenDecimals.reverted ? 18 : tokenDecimals.value
    token.totalSupply = tokenSupply.reverted ? BigInt.fromI32(0) : tokenSupply.value
    token.save()
  }

  let fromAddress = event.params.from.toHexString()
  let toAddress = event.params.to.toHexString()
  
  let fromAccount = Account.load(fromAddress)
  if (!fromAccount) {
    fromAccount = new Account(fromAddress)
    fromAccount.balance = BigInt.fromI32(0)
  }
  
  let toAccount = Account.load(toAddress)
  if (!toAccount) {
    toAccount = new Account(toAddress)
    toAccount.balance = BigInt.fromI32(0)
  }

  // Create transfer entity
  let transferId = event.transaction.hash.toHexString().concat("-").concat(event.logIndex.toString())
  let transfer = new Transfer(transferId)
  
  // Set transfer properties
  transfer.from = fromAccount.id
  transfer.to = toAccount.id
  transfer.value = event.params.value
  transfer.timestamp = event.block.timestamp
  transfer.block = event.block.number

  // Update balances
  fromAccount.balance = fromAccount.balance.minus(event.params.value)
  toAccount.balance = toAccount.balance.plus(event.params.value)

  // Save entities
  fromAccount.save()
  toAccount.save()
  transfer.save()
}