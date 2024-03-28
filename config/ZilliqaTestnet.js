const WETH = "0x878c5008A348A60a5B239844436A7b483fAdb7F2";

/**
 * @type import('./config').NetworkConfig
 */
module.exports = {
  network: "ZilliqaTestnet",
  wNativeAddress: WETH,
  v3: {
    stableIsToken0: false,
    factoryAddress: "0xd882457416ad15b051822d8eE8C2C735988F6D0a",
    startBlock: 6478018,
    stableCoins: [
      "0x1fD09F6701a1852132A649fe9D07F2A3b991eCfA", // USDC
    ],
    whitelistAddresses: [
      WETH,
      "0x1fD09F6701a1852132A649fe9D07F2A3b991eCfA", // USDC
    ],
    minETHLocked: 0,
  },
  v2: {
    factoryAddress: "0xd0156efca4d847e4c4ad3f9eca7fa697bb105cc0",  // maybe try uppercase/camel  0xd0156eFCA4D847E4c4aD3F9ECa7FA697bb105cC0
    wNativeStablePair0: "0x0000000000000000000000000000000000000000",
    wNativeStablePair1: "0x1fD09F6701a1852132A649fe9D07F2A3b991eCfA", // WZIL-USDC
    startBlock: 6144253,
    whitelistAddresses: [
      WETH,
      "0x1fD09F6701a1852132A649fe9D07F2A3b991eCfA", // USDC
    ],
    minETHLocked: 0,
  },
  predictionV2: {
    address: "0x33cea2996575c03a320486bda7f901736c9ecba4",
    startBlock: 6271124,
  },
};
