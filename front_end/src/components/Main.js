import React from 'react'

import { Button } from './Button'

import Web3 from "web3"
import './css-files/Main.css';
function Main() {
    const loadWeb3 = async () => {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.enable();

        }
        else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider);

        }
        else {
            window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }
    }
    const loadInfo =async ()=>{
        await loadWeb3();
        window.location.href="http://localhost:3000/"

    }
    return (
        <div className='main-container'>
            <video src="./video/video-2.mp4" autoPlay loop muted />
            
                <h1>
                    Something New
                 </h1>
                <h3 style={{color:"red",marginBottom:"35px"}}>To Explore Connect with MetaMask</h3>

                <div className='main-btn'>
                    <Button onClick={loadInfo} className='btns' buttonStyle='btn--primary'
                        buttonSize='btn--large'>
                        GET STARTED
                    </Button>
                </div>

        </div>
    )
}
export default Main;