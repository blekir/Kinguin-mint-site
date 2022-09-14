## INFO 

**Mint site test deployment:** [LINK](https://kinguin-mint-site.pages.dev/)

### GitHub Repositories:
[Mint site](https://github.com/blekir/Kinguin-mint-site)
[Mint API](https://github.com/blekir/KINGUIN-MINT-API)
[ImmutableX examples repo with pre-config scripts:](https://github.com/immutable/imx-examples)


## TODO before production deployment:

    - deploy bridge contract
    - upload images to IPFS or other custom location and obtain the url 
    -change the image url in each metadata json file, keep in mind that the files can’t have json extension in order to be appropriately processed by IMX metadata crawler
    -upload metadata json 
    -create the project on IMX
    -create a collection on IMX 
    -add metadata scheme 

    * **MINT SITE:**
        change IMX link and API urls in src/App.js
        - uncomment lines 21 and 22
        - comment lines 23 and 24

        change variables values in src/Mint.jsx
        - apiURL - url to deployed mint API on your end ( line 15)
        - fundRecieverAddress - wallet address that should receive funds from mint ( line 16)
        - basePrice - single token price ( line 17)

    * **MINT API:**
        create Alchemy / Infura or any other Ethereum node provider account and obtain the API key(required for initialization of ethers provider )

        change variables values in .env file in root directory:
            - `RPC_PROVIDER` - Ethereum node provider endpoint url 
            - `MINTER_PRIVATE_KEY` - registered minter for your contract
            - `PUBLIC_API_URL` - url to production one (remove ropsten  from url )
            - `STARK_CONTRACT_ADDRESS` - IMX core contract address to mainnet (0x5FDCCA53617f4d2b9134B29090C87D01058e27e9)
            - `REGISTRATION_CONTRACT_ADDRESS`  - IMX registration contract address to mainnet (0x72a06bf2a1CE5e39cBA06c0CAb824960B587d64c) 
            - `TOKEN_ADDRESS` - bridge contract address registered by Immutable 
            - `ROYALTIES_RECIEVER_ADDRESS` - wallet address that will receive royalties 
            - `ROYALTIES_VALUE` - royalties values 
            - `MINT_FUNDS_RECIEVER` - wallet address that should recieve funds from mint

