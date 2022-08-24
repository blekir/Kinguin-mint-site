
import {useState, useEffect} from 'react'
import { ImmutableXClient, Link} from '@imtbl/imx-sdk';

import './App.css';
import "primereact/resources/themes/saga-orange/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons


import { BlockUI } from 'primereact/blockui';
import { ProgressSpinner } from 'primereact/progressspinner';

import Header from './components/Header';
import Footer from './components/Footer';
import Mint from './components/Mint';
import Info from './components/Info';


function App() {
  // const linkAddress = 'https://link.x.immutable.com';
  // const apiAddress = 'https://api.x.immutable.com/v1';
  const linkAddress = 'https://link.ropsten.x.immutable.com';
  const apiAddress = 'https://api.ropsten.x.immutable.com/v1';


  const [imxConnected, setImxConnected] = useState()
  const [blockedDocument, setBlockedDocument] = useState(false);
  const [link, setlink] = useState()
  const [client, setclient] = useState()

  useEffect(() => {
    
    const init = async() => {
      console.log("init")
      const link = new Link(linkAddress);
      const client = await ImmutableXClient.build({ publicApiUrl: apiAddress });
      setlink(link)
      setclient(client)
    }
    
    init()
  }, [])
  

  const blockTemplate  = () => {
    return(
      <div className='text flex column centered'>
          <ProgressSpinner style={{width: '90px', height: '90px'}} strokeWidth="3" fill="#f4fafe00" animationDuration=".5s"/>
          <p style={{color:"white"}}>installing MetaMask </p>
      </div>
    )
  }
  return (
    <div className="App">
      <BlockUI blocked={blockedDocument} fullScreen template={blockTemplate}/>
      <Header  
        link={link}
        client={client}
        imxConnected={imxConnected}
      />
      <Mint 
        link={link}
        client={client}
        blockedDocument={blockedDocument}
        setBlockedDocument={setBlockedDocument}
        imxConnected={imxConnected}
        setImxConnected={setImxConnected}
      />
      <Info />
      <Footer />
      
    </div>
  );
}

export default App;

 {/* <div className='mint flex column centered'>

        {!isAuthenticated 
        ?<>
          <Button label="setup" className="p-button-outlined" onClick={setupAccount}/>
        </>
        :<>
          <label>
            Token ID:
            <input type="text" value={mintTokenIdv2} onChange={e => setMintTokenIdv2(e.target.value)} />
          </label>
          <label>
            Blueprint:
            <input type="text" value={mintBlueprintv2} onChange={e => setMintBlueprintv2(e.target.value)} />
          </label>
          <Button label="mint" className="p-button-outlined" onClick={mintv2}/>
          <div className='label'> connected to: {wallet}</div>
          <div className='label'> balance: {balance}</div>
        </>
        }
      </div> */}