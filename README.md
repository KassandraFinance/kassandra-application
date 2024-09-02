<h1 align="center">
  <img width='450px'src="https://www.kassandra.finance/_next/static/media/kassandra-header.613d13f9.svg" align="center"/>
</h1>

Kassandra is a decentralized autonomous organization of decentralized finance that governs a protocol that allows the creation and management of tokenized crypto portfolios, bringing a new class of products to managers and investors.

<br />

## Technology

This project was developed with the following technologies:
- [React](https://reactjs.org) / [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Styled-Components](https://styled-components.com/)
- [Ethers](https://docs.ethers.org/v6/)
- [TanStack Query / React Query](https://tanstack.com/query/latest/docs/framework/react/overview)
- [Big.js](https://mikemcl.github.io/big.js/)

<br />

## Prerequisites  
Before you begin, ensure you have the following software installed:  

- [Node.js](https://nodejs.org/en/docs/) >=18.x.x <=20.x.x 
- [Yarn](https://classic.yarnpkg.com/lang/en/docs/)

<br />

## Environment Variables
This project requires certain environment variables to be set up in order to function properly. You can create a `.env` file in the root of the project and add the following variables:

```env
# Example .env file

NEXT_PUBLIC_MASTER=1
NEXT_PUBLIC_BACKEND_KASSANDRA=https://backend.kassandra.finance/
NEXT_PUBLIC_NODE_ENV=public

# CoinGecko API keys - You only need to use one of these keys. 
# Be aware that the free key (COINGECKO_API_KEY) has usage limits.
COINGECKO_API_KEY=
COINGECKO_PRO_API_KEY=

# Optional
DATABASE_URL=
IRON_SESSION_PASSWORD=
NEXT_PUBLIC_WALLETCONNECT=
NEXT_PUBLIC_MORALIS_KEY=
```

 ### Environment Variables Description
- `NEXT_PUBLIC_BACKEND_KASSANDRA`: URL of the backend used by the application. Example: https://backend.kassandra.finance/.
- `NEXT_PUBLIC_NODE_ENV`: Sets the execution environment. Example: public.
- `COINGECKO_API_KEY`: Free CoinGecko API key with limited access. You can obtain it by creating a free account. Learn more at [CoinGecko API Documentation](https://docs.coingecko.com/v3.0.1/reference/introduction).
- `COINGECKO_PRO_API_KEY`: CoinGecko PRO API key. Learn more at [CoinGecko PRO Documentation](https://docs.coingecko.com/reference/introduction).
- `DATABASE_URL` (Optional): Connection URL to the database. Used only for user profiles.
- `IRON_SESSION_PASSWORD` (Optional): Password used to encrypt sessions. Used only for user profiles.
- `NEXT_PUBLIC_WALLETCONNECT` (Optional): Project ID for WalletConnect integration. Learn more at [WalletConnect Cloud](https://cloud.walletconnect.com).
- `NEXT_PUBLIC_MORALIS_KEY` (Optional): Key used to fetch the user's NFT list in their profile. Learn more at [Moralis API Documentation](https://docs.moralis.io/web3-data-api/aptos/reference/authentication).

<br />

## Installation  

Follow the steps below to set up the Next.js application:  

**Clone the repository:**  

 ```sh
 git clone https://github.com/KassandraFinance/kassandra-application.git
 
 cd kassandra-application

 # Installing the dependencies
 yarn
  
 # Running application
 yarn dev
```

<br />

## Contributing

We welcome contributions! Please check our [contributing](./CONTRIBUTING.md) file for guidelines on how to report issues, submit pull requests.

<br />

## License
This project is licensed under the [GNU General Public License v3.0](LICENSE).

<br />

## Discussion

For any concerns with the protocol, open an issue or visit us on [Discord](https://discord.com/invite/8qHCfxwFCc) to discuss.

For security concerns, please email [foundation@kassandra.finance](mailto:foundation@kassandra.finance).
