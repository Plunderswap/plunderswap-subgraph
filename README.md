# Plunderswap Subgraph

TheGraph exposes a GraphQL endpoint to query the events and entities within Zilliqa 2.0 ecosystem.

Currently, there are multiple subgraphs, but additional subgraphs can be added to this repository, following the current architecture.

## Subgraph Demos

### erc20-pZIL

This demo (/subgraphs/erc20-pZIL) is a simple ERC20 token with a Transfer event.  It is an ERC20 that was created on the Zilliqa 2.0 blockchain. (ie not from ZQ1).  Can be access at <http://138.201.20.24:8000/subgraphs/name/erc20/pZIL>

- Token address: 0x7B213b5AEB896bC290F0cD8B8720eaF427098186
- Start block: 5786957
- Token Name: pZIL

### erc20-TACO

This demo (/subgraphs/erc20-TACO) is a simple ERC20 token with a Transfer event.  It is an ERC20 that was created on the ZQ1 blockchain.  Can be access at <http://138.201.20.24:8000/subgraphs/name/erc20/TACO>

- Token address: 0x2aE05Bfc681D7872209A3Bf1A9513Bd4A48E66f0
- Start block: 3592195
- Token Name: TACO

## Subgraphs - TO DO - Update to Zilliqa 2.0 or delete if we arent going to use them

1. **[Blocks](https://thegraph.com/legacy-explorer/subgraph/pancakeswap/blocks)**: Tracks all blocks on Binance Smart Chain.

   - TO DO - Update to Zilliqa 2.0 - BSC https://thegraph.com/legacy-explorer/subgraph/pancakeswap/blocks

2. **[Exchange V2](https://nodereal.io/meganode/api-marketplace/pancakeswap-graphql)**: Tracks all PancakeSwap V2 Exchange data with price, volume, liquidity, ...

    TO DO - Update to Zilliqa 2.0 -BSC https://nodereal.io/meganode/api-marketplace/pancakeswap-graphql

3. **[Pairs](https://thegraph.com/legacy-explorer/subgraph/pancakeswap/pairs)**: Tracks all PancakeSwap Pairs and Tokens.
    - TO DO - Update to Zilliqa 2.0 - do we need this?

4. **MasterChef (v3)**: Tracks data for MasterChefV3.
    - TO DO - Update to Zilliqa 2.0 - BSC https://thegraph.com/hosted-service/subgraph/pancakeswap/masterchef-v3-bsc

5. **Exchange (v3)**: Tracks all PancakeSwap V3 Exchange data with price, volume, liquidity
    - TO DO - Update to Zilliqa 2.0 - BSC https://thegraph.com/hosted-service/subgraph/pancakeswap/exchange-v3-bsc

## Dependencies

- [Graph CLI](https://github.com/graphprotocol/graph-cli)
  - Required to generate and build local GraphQL dependencies.

```shell
yarn global add @graphprotocol/graph-cli
```

## Deployment

For any of the subgraph: `blocks` as `[subgraph]`

1. Run the `cd subgraphs/[subgraph]` command to move to the subgraph directory.

2. Run the `yarn codegen` command to prepare the TypeScript sources for the GraphQL (generated/\*).

3. Run the `yarn build` command to build the subgraph, and check compilation errors before deploying.

4. If you are deploying to a new subgraph, you will need to create it first.  This can be done with `yarn create2`

5. Deploy via `yarn deploy`

6. Give it a version label.  This is the version that will be used when you deploy.  It is a string that will be used to identify the version of the subgraph.  It is recommended to use the format `v1.0.0` for the first version.

7. Once deployed, you can access the subgraph at the URL provided by TheGraph.  This is the URL that will be used to query the subgraph.
