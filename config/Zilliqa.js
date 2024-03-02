const WETH = "0x94e18aE7dd5eE57B55f30c4B63E2760c09EFb192";

/**
 * @type import('./config').NetworkConfig
 */
module.exports = {
  network: "Zilliqa",
  wNativeAddress: WETH,
  v3: {
    // WETH-USDC 500
    wNativeStablePoolAddress: "0x", // Needs filling in
    stableIsToken0: false, // Needs adjusting?
    factoryAddress: "0x", // Needs filling in
    startBlock: 101028949, // Needs adjusting
    stableCoins: [
      "0x2274005778063684fbB1BfA96a2b725dC37D75f9", // zUSDT
    ],
    whitelistAddresses: [
      WETH,
      "0x2274005778063684fbB1BfA96a2b725dC37D75f9", // zUSDT
    ],
    minETHLocked: 0,
  },
  v2: {
    factoryAddress: "0xf42d1058f233329185A36B04B7f96105afa1adD2",
    startBlock: 101022992,
    wNativeStablePair0: "0x0000000000000000000000000000000000000000",
    wNativeStablePair1: "0xa59bd260f9707ea44551c510f714ccd482ec75d8", // WETH-USDC
    whitelistAddresses: [
      WETH,
      "0x2274005778063684fbB1BfA96a2b725dC37D75f9", // zUSDT
    ],
    minETHLocked: 0,
  },
  predictionV2: {
    startBlock: 158927648, // Needs adjusting
    address: "0xebF0Aeaab8A5f8C73F84e8F4aa970Aff992f7D04",
  },
};
