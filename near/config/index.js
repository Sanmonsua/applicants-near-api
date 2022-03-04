const nearAPI = require("near-api-js");

const { keyStores, KeyPair } = nearAPI;
const keyStore = new keyStores.InMemoryKeyStore();
const PRIVATE_KEY = process.env.NEAR_KEYSTORE_PRIVATE_KEY;
console.log(PRIVATE_KEY);
const keyPair = KeyPair.fromString(PRIVATE_KEY);
console.log(keyPair);

const connectNear = async () => {
  await keyStore.setKey("testnet", process.env.ACCOUNT_ADDRESS, keyPair);
  console.log(keyPair.getPublicKey().toString());
  const near = await nearAPI.connect({
    networkId: "testnet",
    keyStore,
    nodeUrl: "https://rpc.testnet.near.org",
    walletUrl: "https://wallet.testnet.near.org",
    helperUrl: "https://helper.testnet.near.org",
    explorerUrl: "https://explorer.testnet.near.org",
  });
  return near;
};

module.exports = connectNear;
