import React, { useState, useEffect } from 'react';

import OwnerCardItem from './OwnedCardItem';

import './css-files/Cards.css';

import Web3 from 'web3'
import TokenAbi from '../abis/Token.json'
const OwnedCard = () => {
    const [state, setState] = useState(false);
    const [accountNow, setAccounts] = useState(undefined);
    let arr = [];
    const [posts, setPosts] = useState([]);
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
    const getMetaMaskAccount = async () => {
        const web3 = window.web3;
        const account = await web3.eth.getAccounts();
        setAccounts(account[0]);

    }
    async function loadInfo() {
        const web3 = window.web3;
        const account = await web3.eth.getAccounts();
    
        const networkId = await web3.eth.net.getId();
        const networkData = TokenAbi.networks[networkId];
        if (networkData) {
            const address = networkData.address;
            const abi = TokenAbi.abi;
            const contract = new web3.eth.Contract(abi, address);
            const totalSupply = await contract.methods.getTotalSupply().call();
            for (var i = 1; i <= totalSupply; i++) {
                if (account) {
                    const hash = await contract.methods.getTokenHashID(i.toString()).call();
                    const num = await contract.methods.showAccountTokens(account[0], i.toString()).call()
                    if (num) {
                        
                        arr.push(hash);
                    }
                }
            }
        }
    }

    useEffect(() => {
        loadInfo();
        setPosts(arr);

    }, [])

    if (posts.length)
        return (
            <>

                <div className="container-fluid d-flex justify-content-center" style={{ background: "radial-gradient(#e5e5e5,#fff, #e5e5e5)", paddingBottom: "50px" }}>

                    <div className="row">

                        {posts.map(post => {
                            return (<>

                                <OwnerCardItem
                                    hash={post}
                                />
                            </>
                            )

                        })}
                    </div>
                </div>

            </>
        )
    else {
        return <></>
    }
}
export default OwnedCard;
