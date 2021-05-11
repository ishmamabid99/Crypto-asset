import '../../App.css';
import Main from '../Main';
import About from '../About';
import Services from '../Services';
import React, { useState, useEffect } from 'react'
import Web3 from 'web3'
import '../../App.css';
function Home() {
    const [state, setState] = useState(false);
    async function loadWeb3() {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.enable();
            setState(true);
        }
        else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider)
            setState(true);
        }
        else {
            window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }
    }
    useEffect(() => {
        loadWeb3();
    },[]);

    if (!state) {
        return (
            <>
                <Main />
                <About />
                <Services />
            </>
        );
    }
    else {
        return (
            <>
                <About />
                <Services />
            </>

        )
    }
}
export default Home;
