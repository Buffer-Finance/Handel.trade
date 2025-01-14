// Web3Auth Libraries
import { Web3AuthConnector } from '@web3auth/web3auth-wagmi-connector';
import { Web3Auth } from '@web3auth/modal';
import { EthereumPrivateKeyProvider } from '@web3auth/ethereum-provider';
import { OpenloginAdapter } from '@web3auth/openlogin-adapter';
import { CHAIN_NAMESPACES } from '@web3auth/base';
import { Chain } from 'wagmi';

export default function Web3AuthConnectorInstance(chains: Chain[]) {
  const name = 'Handel.Network';
  const chainConfig = {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: '0x' + chains[0].id.toString(16),
    rpcTarget: chains[0].rpcUrls.default.http[0], // This is the public RPC we have added, please pass on your own endpoint while creating an app
    displayName: chains[0].name,
    tickerName: chains[0].nativeCurrency?.name,
    ticker: chains[0].nativeCurrency?.symbol,
    blockExplorer: chains[0].blockExplorers?.default.url[0] as string,
  };
  const web3AuthInstance = new Web3Auth({
    clientId:
      'BL61SxVgp_BBvj6tXnRnQQvdvFk4DbnZMywG6OVGnKKq3JmPxkD_C7uJkMwdnBKA-T8FOeydQiszaLGpfcFOYUs',
    // 'BER2IPJpbBvpJSNy1ci79ranyQNfS3a4kYKK9-Ebl0uGKHFWToZhEVu0e72RnXXGwNo6WbUJOJ5Fn86L_utcsFE',
    chainConfig,
    web3AuthNetwork: 'sapphire_devnet',
    // web3AuthNetwork: 'testnet',
    uiConfig: {
      appName: name,
      loginMethodsOrder: ['google'],
      defaultLanguage: 'en',
      logoLight: 'Logo.svg',
      logoDark: 'LogoDark.png',
      privacyPolicy: {
        en: 'https://handel.network/privacy-policy.html',
      },
      appUrl: 'https://handel.network',
      modalZIndex: '2147483647',
    },
  });

  // Add openlogin adapter for customisations
  const privateKeyProvider = new EthereumPrivateKeyProvider({
    config: { chainConfig },
  });
  const openloginAdapterInstance = new OpenloginAdapter({
    privateKeyProvider,
    adapterSettings: {
      network: 'cyan',
      uxMode: 'redirect',
      whiteLabel: {
        name: 'Your app Name',
        logoLight: 'https://web3auth.io/images/w3a-L-Favicon-1.svg',
        logoDark: 'https://web3auth.io/images/w3a-D-Favicon-1.svg',
        defaultLanguage: 'en',
        dark: true, // whether to enable dark mode. defaultValue: false
      },
    },
  });
  web3AuthInstance.configureAdapter(openloginAdapterInstance);

  // // Add Torus Wallet Plugin (optional)
  // const torusPlugin = new TorusWalletConnectorPlugin({
  //   torusWalletOpts: {
  //     buttonPosition: "bottom-left",
  //   },
  //   walletInitOptions: {
  //     whiteLabel: {
  //       theme: {
  //         isDark: false,
  //         colors: {
  //           primary: "#00a8ff",
  //         },
  //       },
  //       logoDark: iconUrl,
  //       logoLight: iconUrl,
  //     },
  //     useWalletConnect: true,
  //     enableLogging: true,
  //   },
  // });
  // web3AuthInstance.addPlugin(torusPlugin);

  return new Web3AuthConnector({
    chains: chains as any,
    options: {
      web3AuthInstance,
    },
  });
}
