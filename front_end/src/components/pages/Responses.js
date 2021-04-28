import '../../App.css';
import ResponseCard from '../ResponseCard';
import Footer from '../Footer';
import React, { useState, useEffect } from 'react'
import { Route } from 'react-router-dom'
import axios from 'axios'
import Token from '../../abis/Token.json'
import Web3 from 'web3'
import Body from '../Body'
function Response() {
    const [posts, setPosts] = useState([]);

    const loadWeb3 = async () => {
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
    useEffect(() => {

        loadWeb3();
        // init();
        axios.get("http://localhost:8080/asset").
            then(res => {
                setPosts(res.data)
            });
            // .catch(err => console.log(err))
    });
    return (
        <>
            <Route exact path="/responses"
                render={() => <ResponseCard
                    posts={posts}
                />}
            />

        </>
    )
}

export default Response
