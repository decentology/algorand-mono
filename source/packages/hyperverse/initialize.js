import algosdk from 'algosdk';

import * as constants from './constants';

function initialize(options) {
  return new Promise(async (resolve, reject) => {
    if (options.blockchain === constants.blockchains.Algorand) {
      // Algorand
      let client = null;
      let indexer = null;
      let explorer = null;
      if (options.network === constants.networks.MainNet) {
        client = new algosdk.Algodv2('', 'https://algoexplorerapi.io/', '');
        indexer = new algosdk.Indexer('', 'https://algoexplorerapi.io/idx2', '');
        explorer = 'https://algoexplorer.io';
      } else if (options.network === constants.networks.TestNet) {
        client = new algosdk.Algodv2('', 'https://testnet.algoexplorerapi.io', '');
        indexer = new algosdk.Indexer('', 'https://testnet.algoexplorerapi.io/idx2', '');
        explorer = 'https://testnet.algoexplorer.io';
      }
      
      // TODO: Make sure we're ready.
      const status = await client.status().do();
      const isReady = true; // status['last-round'] > 0;
      if (isReady) {
        resolve({
          ...options,
          algorand: {
            client,
            indexer,
            explorer
          }
        });
      } else {
        reject();
      }
    }
  });
}

export default initialize;