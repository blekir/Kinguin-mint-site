import React from 'react'


import { Button } from 'primereact/button'
import './Info.css'
import Carousel from './Carousel'

const Info = () => {
    return (
        <div className="info-container">
            <div className="orange-strip">WHERE LEGENDS ARE <span className="reborn">REBORN</span> </div>
            <Carousel />
            <div className="traits">
                <div className="trait">
                    <div className="t1">SUPPLY</div>
                    <div className="t2">1999</div>
                    <div className="t1">NFTS IN TOTAL</div>
                </div>
                <div className="trait">
                    <div className="t1 transparent"> t</div>
                    <div className="t2">140K+</div>
                    <div className="t1">UNIQUE COMBINATIONS</div>
                </div>
                <div className="trait">
                    <div className="t1">OVER</div>
                    <div className="t2">100</div>
                    <div className="t1">TRAITS</div>
                </div>
            </div>
            <div className="gif-section">
                <div className="gif"></div>
                <div className="text-row">
                    <div className="text1">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</div>
                    <Button label="JOIN OUR DISCORD" style={{"fontWeigth":"600"}} className="p-button-raised joinDiscord"  />

                </div>
            </div>
        </div>
    )
}

export default Info