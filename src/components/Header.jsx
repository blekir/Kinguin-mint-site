import { useEffect, useState } from 'react';
import { ETHTokenType } from '@imtbl/imx-sdk'
import {ethers} from 'ethers'

import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button'

import './Header.css'

const Header = ({imxConnected, link, client}) => {
    const [visibleFullScreen, setVisibleFullScreen] = useState(false);
    const [isAuth, setisAuth] = useState(false)
    const [wallet, setwallet] = useState(() => window.localStorage.wallet ? window.localStorage.getItem("wallet")  : "")
    const [eth_balance, seteth_balance] = useState(() => window.localStorage.eth_balance ? window.localStorage.getItem("eth_balance") : "0.0")
    const [imx_balance, setimx_balance] = useState(() => window.localStorage.imx_balance ? window.localStorage.getItem("imx_balance"):  "0.0")
    
    const [funds, setFunds] = useState(false)
    const [depositOpen, setdepositOpen] = useState(false)
    const [disbaleDeposit, setdisbaleDeposit] = useState(false)
    const [depositAmount, setdepositAmount] = useState("0.1")
    const [isError, setisError] = useState(false)


    // useEffect(() => {
    //     console.log("updateBallance")
    //     if(window.localStorage.wallet){
    //         setwallet(window.localStorage.getItem("wallet"))
    //     }
    //     if(window.localStorage.eth_balance){
    //         seteth_balance(window.localStorage.getItem("eth_balance"))
    //     }
    //     if(window.localStorage.imx_balance){
    //         setimx_balance(window.localStorage.getItem("imx_balance"))
    //     }
        
    // })
    
    const close = () =>{
        setVisibleFullScreen(false)
        setFunds(false)
        setdepositOpen(false)
    }

    const creditCard = async () =>{
        await link.fiatToCrypto({})
    }
    const deposit = async () =>{
        
        await link.deposit({
            type: ETHTokenType.ETH,
            amount: depositAmount // value in ether
        })
    }

    const changeAmount = (amount) => {
        if(parseFloat(amount) > parseFloat(eth_balance)){
            setdepositAmount(amount)
            document.getElementById("depo").classList.add("shake")
            setisError(true)
            setdisbaleDeposit(true)
            return
        }else{
            setdepositAmount(amount)
            document.getElementById("depo").classList.remove("shake")
            setdisbaleDeposit(false)
            setisError(false)
        }
    }

    const refreshBalance =  async() =>{
        const balance  = await client.getBalance({user: window.localStorage.getItem("wallet"), tokenAddress: 'eth'})
        setimx_balance(ethers.utils.formatEther(balance.balance.toString()))
        window.localStorage.setItem("imx_balance", ethers.utils.formatEther(balance.balance.toString()))

        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const ethbalance = await provider.send("eth_getBalance", [window.localStorage.getItem("wallet"), 'latest']);
        seteth_balance(ethers.utils.formatEther(ethbalance.toString()))
        window.localStorage.setItem("eth_balance", ethers.utils.formatEther(ethbalance.toString()))
    }
    return (
        
        <div className='header-container flex row '>
            
            {imxConnected && 
                <>
                    <div className='header-info'>
                        <div className="address">Connected to: {wallet.substring(0, 5) + "...." + wallet.substring(wallet.length - 4)}</div>
                        <div className="balance">
                            <div className="eth-balance blc">ETH: {eth_balance.substring(0, 5) }</div>
                            <div className="imx-balance blc">IMX: {imx_balance}</div>
                            <Button icon="pi pi-refresh" onClick={() => refreshBalance()} className="mr-1 refresh " />
                        </div>
                        
                    </div>
                    <Button icon="pi pi-bars" onClick={() => setVisibleFullScreen(true)} className="mr-2 menu p-button-raised" />
                </>
            }
            
            <Sidebar visible={visibleFullScreen} position="right" className="p-sidebar-sm" onHide={close}>
                {
                    !funds
                    ?<div className="sidebar flex column centered">
                        <div className="address">Connected to: {wallet.substring(0, 5) + "...." + wallet.substring(wallet.length - 4)}</div>
                        <div className="balance">
                            <div className="eth-balance blc">ETH: {eth_balance.substring(0, 5) }</div>
                            <div className="imx-balance blc">IMX: {imx_balance}</div>
                            <Button icon="pi pi-refresh" onClick={() => refreshBalance()} className="mr-1 refresh " />
                        </div>
                        <Button label='ADD FUNDS' style={{"fontWeigth":"600"}} className="p-button-raised" onClick={() =>{setFunds(true)}} />
                    </div>
                    :!depositOpen
                        ?<div className="sidebar flex column centered">
                            <div className="credit" onClick={() => creditCard()}>
                                <div className="top-title-funds">Instant</div>
                                <div className="title-funds">Credit card</div>
                                <div className="description-funds">Purchase and add tokens directly to your Immutable X account</div>
                            </div>
                            <br/>
                            <br/>
                            <div className="deposit" onClick={() => setdepositOpen(true)}>
                                <div className="top-title-funds">May take some time</div>
                                <div className="title-funds">Deposit from wallet</div>
                                <div className="description-funds">Deposit tokens from your connected Ethereum wallet. Gas required</div>
                            </div>
                        </div>
                        :<div className="sidebar flex column centered">
                            {isError && <div className="title-funds error">Deposit amount surpass available balance</div>}
                            <div id= "depo" className="deposit">
                                
                                <div className="top-title-funds big">Deposit</div>

                                <div className="title-funds">available balance: {eth_balance.substring(0, 5) }</div>
                                <div className="deposit-row">
                                    
                                    <label htmlFor="" className="deposit-label">Amount</label>
                                    <input type="text" className="deposit-amount" value={depositAmount} onChange={(e)=>changeAmount(e.target.value)}/>
                                </div>
                                <Button label='Continue' style={{"fontWeigth":"600"}} className="p-button-raised" onClick={() =>{deposit()}} disabled={disbaleDeposit}/>
                            </div>
                            
                        </div>
                        
                }
                
                
            </Sidebar>
        </div>
    )
}

export default Header