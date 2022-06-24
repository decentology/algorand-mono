const links = {
  client: [
    {
      title: 'JavaScript SDK',
      url: 'https://github.com/algorand/js-algorand-sdk',
      source: 'github.com'
    },
    {
      title: 'JavaScript SDK reference',
      url: 'https://algorand.github.io/js-algorand-sdk/modules.html',
      source: 'github.com'
    },
    {
      title: 'Algorand Networks - TestNet',
      url: 'https://developer.algorand.org/docs/get-details/algorand-networks/testnet/',
      source: 'developer.algorand.org'
    },
    {
      title: 'WalletConnect',
      children: [
        {
          title: 'WalletConnect - Algorand fork',
          url: 'https://github.com/algorand/walletconnect-monorepo',
          source: 'github.com'
        },
        {
          title: 'WalletConnect example implementation',
          url: 'https://github.com/algorand-devrel/nft-dropper/blob/master/frontend/src/lib/wallet_session.ts',
          source: 'github.com'
        },
        {
          title: 'Decipher Ticket DApp – deep link',
          url: 'https://github.com/algorand-devrel/decipher-tickets/blob/main/frontend/src/App.tsx',
          source: 'github.com'
        },
        {
          title: 'WalletConnect mobile linking',
          url: 'https://docs.walletconnect.com/mobile-linking',
          source: 'docs.walletconnect.com'
        }
      ]
    },
    {
      title: 'NFT Dropper',
      children: [
        {
          title: 'Application code',
          url: 'https://github.com/algorand-devrel/nft-dropper/tree/05989154768130f92f99ec031c42a9691a541ad5/frontend/contracts',
          source: 'github.com'
        },
        {
          title: 'Audio hack to prevent WalletConnect socket bug',
          url: 'https://github.com/algorand-devrel/nft-dropper/blob/2cd1efad1d61482688659675fe8c540f41bcb974/frontend/src/App.tsx#L122',
          source: 'github.com'
        },
      ]
    }
  ],
  applications: [
    {
      title: 'The Algorand Virtual Machine (AVM) and TEAL',
      url: 'https://developer.algorand.org/docs/get-details/dapps/avm/teal/specification/',
      source: 'developer.algorand.org'
    },
    {
      title: 'TEAL Opcodes',
      url: 'https://developer.algorand.org/docs/get-details/dapps/avm/teal/opcodes/',
      source: 'developer.algorand.org'
    },
    {
      title: 'TEAL 6 and AVM 1.1',
      children: [
        {
          title: 'Contract to Contract calls and an ABI come to Algorand',
          url: 'https://developer.algorand.org/articles/contract-to-contract-calls-and-an-abi-come-to-algorand/',
          source: 'developer.algorand.org'
        },
        {
          title: 'ABI details',
          url: 'https://developer.algorand.org/docs/get-details/dapps/smart-contracts/ABI/',
          source: 'developer.algorand.org'
        },
        {
          title: 'ARC-0004',
          url: 'https://github.com/algorandfoundation/ARCs/blob/main/ARCs/arc-0004.md',
          source: 'github.com'
        },
        {
          title: 'Sample application overview',
          url: 'https://testnet.algoexplorer.io/application/82724157',
          source: 'algoexplorer.io'
        },
        {
          title: 'Atomic Transaction Composer',
          url: 'https://github.com/algorand-devrel/demo-abi/blob/02765c87958e1a607e45df70d3cae4a0547828cc/js/abi.ts#L43',
          source: 'github.com'
        },
        {
          title: 'Atomic Transaction Composer - source code',
          url: 'https://github.com/algorand/js-algorand-sdk/blob/926eed59291ae035e68a4923d3179a3f26eb3937/src/composer.ts',
          source: 'github.com'
        },
      ]
    },
    {
      title: 'Graviton - TEAL Blackbox Testing',
      url: 'https://github.com/algorand/graviton/',
      source: 'github.com'
    },
    {
      title: 'AVM Debugger',
      url: 'https://github.com/jasonpaulos/go-algorand/tree/avmdbg/cmd/avmdbg',
      source: 'github.com'
    },
    {
      title: 'Transactions',
      url: 'https://developer.algorand.org/docs/get-details/transactions/',
      source: 'developer.algorand.org',
    }
  ],
  explorers: [
    {
      title: 'Current account overview',
      url: 'https://testnet.algoexplorer.io/address/CCGJ7X6IAB5X3FDS3SX2BC4UOAOOTLQTY5ZK42K5BXZPLMF6PD3AFQK7NU',
      source: 'algoexplorer.io'
    },
    {
      title: 'Current account overview',
      url: 'https://goalseeker.purestake.io/algorand/testnet/account/CCGJ7X6IAB5X3FDS3SX2BC4UOAOOTLQTY5ZK42K5BXZPLMF6PD3AFQK7NU',
      source: 'goalseeker.purestake.io'
    },
    {
      title: 'Algod REST API',
      url: 'https://testnet.algoexplorer.io/api-dev/v2',
      source: 'algoexplorer.io'
    },
  ],
  node: [
    {
      title: 'TEAL logic implementation',
      url: 'https://github.com/algorand/go-algorand/blob/95c5b0ec466214c73c5108343635738e13360700/data/transactions/logic/eval.go',
      source: 'github.com'
    },
    {
      title: 'TEAL opcodes',
      url: 'https://github.com/algorand/go-algorand/blob/21b4bc5394c5e193b47b8da4fa69b7f55e148b03/data/transactions/logic/opcodes.go',
      source: 'github.com'
    }
  ],
  developers: [
    {
      title: 'Ben Guidarelli',
      url: 'https://github.com/barnjamin?tab=repositories',
      source: 'github.com'
    }
  ]
};

export default links;