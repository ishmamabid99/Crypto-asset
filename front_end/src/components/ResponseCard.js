import React, { useState, useEffect } from 'react';

import ResponseCardItem from './ResponseCardItem';
import './css-files/ApproveCard.css';

import Web3 from 'web3' ;
var md5 = require('md5');
const ResponseCard = ({ posts }) => {  
    const [accountNow , setAccounts]= useState('');
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
    const getMetaMaskAccount = async ()=>{
        const web3 = window.web3;
        const account = await web3.eth.getAccounts();
       
        setAccounts(account[0]);

    }
    useEffect(()=>{
        loadWeb3();
        getMetaMaskAccount();
    },[])
    return (
        <>

        <div className="container-fluid d-flex justify-content-center" style={{ background: "radial-gradient(#e5e5e5,#fff, #e5e5e5)", paddingBottom: "50px" }}>
          
                <div className="row">
                    {posts.map(post => {
                        if (post.state == 1 && post.owner == accountNow) {
                            const src = "https://ipfs.io/ipfs/" + post.video + "?autoplay=1&mute=1"
                            const temp = post.plot.toString()+post.postCode.toString()+post.roadNo.toString()
                            +post.deed.toString();
                            const hash = md5(temp);
                        
                            return (
                                <ResponseCardItem
                                    src={src}
                                    deedhash={post.hash}
                                    deedNo={post.deed}
                                    text={post.title}
                                    symbol= {post.symbol}
                                    content={post.content}
                                    path={post._id}
                                    hash={hash}
                                    price={post.tokenPrice}
                                    available={post.tokenNumber} />
                            )
                        }
                    })}
                </div>

            </div>
            </>
    )
}
export default ResponseCard;
