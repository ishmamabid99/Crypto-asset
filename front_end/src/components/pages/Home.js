import '../../App.css';
import Main from '../Main';
import Cards from '../Cards';
import Footer from '../Footer';
import About from '../About';

import Services from '../Services';
import React, { useState, useEffect } from 'react'
import { Route } from 'react-router-dom'
import axios from 'axios'
import Web3 from 'web3'
import '../../App.css';
async function loadWeb3() {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum)
        await window.ethereum.enable()
    }
    else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
        window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
}
function Home() {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        loadWeb3();
    });

    return (
        <>
            <Main />
            <About />
            <Services />
        </>
    );
}
export default Home;
