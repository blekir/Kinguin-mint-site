import {useState, useEffect} from 'react'
import { ImmutableXClient, Link, ETHTokenType} from '@imtbl/imx-sdk';
import {ethers} from 'ethers'
import MetamaskOnboarding from 'metamask-onboarding'


import "./Mint.css"

import { Button } from 'primereact/button'
import { ProgressSpinner } from 'primereact/progressspinner';

const Mint = ({link, client, setBlockedDocument, blockedDocument, imxConnected, setImxConnected}) => {
    
    
    
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [wallet, setWallet] = useState()
    const [balanceImx, setBalanceImx] = useState()
    const [welcomeMessage, setWelcomeMessage] = useState()
    const [supply, setsupply] = useState(0)
    const [amount, setamount] = useState(1)
    const [success, setSuccess] = useState(false)
    const [processing, setProcessing] = useState(false)

    const getSupply = async() => {
        const response = await fetch(`https://206.189.21.200/supply`,{
                method: "GET",
                headers: {"accept": "application/json",
                        }
                });
        const data = await response.json()
        setsupply(data.supply)

    }
    useEffect(() => {
      getSupply()
    })
    
    const [walletLabel, setWalletLabel] = useState("INSTALL METAMASK")
    const [connectDisabled, setConnectDisabled] = useState(false)

    useEffect(() => {
        getSupply()
        window.localStorage.setItem("isAuthenticated", false)
        if(window.ethereum ){
            setWelcomeMessage("Connect your MetaMask wallet.")
            console.log(window.ethereum.isMetaMask)
            if(window.ethereum.isMetaMask){
                isAuthenticated ? setWalletLabel("CONNECT TO IMX") : setWalletLabel("CONNECT WALLET")
            }
        }
        else{
            setWelcomeMessage("Install MetaMask wallet to proceed")
            console.log()
        }

    }, [])
    
    const isMetaMaskInstalled = () => {
        return Boolean(window.ethereum && window.ethereum.isMetaMask)
    };

    const connectWallet = async () => {
        console.log(isAuthenticated)
        if(!isAuthenticated){
            console.log("not auth")
            if(Boolean(window.ethereum && window.ethereum.isMetaMask)){
                const provider = new ethers.providers.Web3Provider(window.ethereum)
                const accounts = await provider.send("eth_requestAccounts", []);
                const balance = await provider.send("eth_getBalance", [accounts[0], 'latest']);
                setIsAuthenticated(true)
                setWalletLabel("CONNECT TO IMX")
                window.localStorage.setItem("wallet", accounts[0])
                window.localStorage.setItem("eth_balance",ethers.utils.formatEther(balance.toString()))
            }else{
                const forwarderOrigin = 'http://localhost:3001'; 
                setBlockedDocument(true)
                const onboarding = new MetamaskOnboarding();
                setWalletLabel("Installing MetaMask")
                setConnectDisabled(true)
                onboarding.startOnboarding();
            }
        }else{
            if(!imxConnected){
                await setupAccount()
            }else{
                setWalletLabel("Installing MetaMask")
            }
            
        }
        
        

    }
    const setupAccount = async () =>  {
        console.log("IMX setup")
        const setup = await link.setup({});
        console.log(setup)
        setWallet(setup.address)
        setImxConnected(true)
        const balance  = await client.getBalance({user: setup.address, tokenAddress: 'eth'})
        console.log(ethers.utils.formatEther(balance.balance.toString()))
        setBalanceImx(ethers.utils.formatEther(balance.balance.toString()))
        window.localStorage.setItem("imx_wallet", setup.starkPublicKey)
        window.localStorage.setItem("imx_balance", ethers.utils.formatEther(balance.balance.toString()))
        window.localStorage.setItem("isAuthenticated", true)

        
    }
    
    
    const transfer = async() =>{
        setProcessing(true)
        try{
            const price = 0.001 * amount

            // // funds transfer
            // await link.transfer([
            //     {
            //         amount: price.toString(),
            //         type: ETHTokenType.ETH,
            //         toAddress: '0xdec1918237964309786Fc42a4CEC786Ab911d8F3' // receiver of this asset
            //     },
            //     // add more transfer objects if necessary, they don't have to be for the same asset type
            // ])
            console.log(wallet)
            // API CALL TO MINT
            const response = await fetch(`https://206.189.21.200/mint?account=${wallet}&amount=${amount}`,{
                method: "GET",
                headers: {"accept": "application/json",
                        }
                });
            const data = await response.json()

            if(data.status == "success"){
                setTimeout(function(){
                    setSuccess(true)
                    console.log(data.ids)
                    console.log("success")
                    setProcessing(false)
                },5000)
            }

        }catch(error) {
            console.error(error)
            return [];
        }

        // API call to obtain the id minted by the user in call above
        // try{
        //     const response = await fetch(`http://localhost:8081/minted?account=${wallet}`,{
        //         method: "GET",
        //         headers: {"accept": "application/json",
        //                 }
        //         });
        //     console.log(await response.json())
        // }catch(error) {
        //     return [];
        // }

    }
    
    const count = (increment) =>{
        if(increment){
            if(amount < 15){
                setamount((amount)=> amount + 1)
            }
            
        }else{
            if(amount > 1){
                setamount((amount)=> amount - 1)
            }
        }
    }

    return (
        <div className='mint'>
        {!isAuthenticated
            ? blockedDocument
                ?<>
                    <div className='text flex column centered'>
                    </div>
                </>
                :<div className='flex column centered'>
                    <div className='text flex column centered'>{welcomeMessage}</div>
                    <Button label={walletLabel} style={{"fontWeigth":"600"}} className="p-button-raised connectWallet"  onClick={connectWallet} disabled={connectDisabled}/>
                </div>
            :!imxConnected
                ?<div className='flex column centered'>
                    <div className='text flex column centered'>CONNECT TO IMX</div>
                    <Button label={walletLabel} style={{"fontWeigth":"600"}} className="p-button-raised connectWallet"  onClick={connectWallet} disabled={connectDisabled}/>
                </div>
                :!success
                    ?!processing
                        ?<>
                            <div className='text flex column centered full'>
                                {/* <div className="supply-label">SUPPLY:</div> */}
                                <div className="supply">{supply} / 1999</div>
                                <div className="counter">
                                    <Button label="-" style={{"fontWeigth":"600"}} className="p-button-raised counterBtn"  onClick={() => count(false)}/>
                                    <div className="value">{amount}</div>
                                    <Button label="+" style={{"fontWeigth":"600"}} className="p-button-raised counterBtn"  onClick={() => count(true)}/>

                                </div>
                                <Button label="MINT" style={{"fontWeigth":"600"}} className="p-button-raised mintBtn"  onClick={transfer}/>
                                <div className="empty"></div>
                                
                            </div>
                            
                            <div className="description">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
                            </div>
                        </>
                        :<div className='text flex column centered full'>
                            <ProgressSpinner/>
                            <div className="processing-msg">PROCESSING</div>
                        </div>
                    :<div className='text flex column centered full'>
                        <div className="supply">Congratulations </div>
                        <div className="sucess-msg">you've successfuly minted your KINGUIN LEGENDS token{amount >1 ? "s": ""}</div>
                        <div className='success-btns'>
                            <Button label="VIEW TOKENS" style={{"fontWeigth":"600"}} className="p-button-raised mintBtn"  onClick={() => {window.open("https://market.ropsten.immutable.com/inventory", "_blank")}}/>
                            <Button label="MINT MORE" style={{"fontWeigth":"600"}} className="p-button-raised mintBtn"  onClick={() => {setSuccess(false)}}/>
                        </div>
                    </div>
        }
        </div>
    )
}

export default Mint