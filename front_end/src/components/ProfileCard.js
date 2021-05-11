import React, { useState, useEffect } from 'react';

import ProfileCardItem from './ProfileCardItem';
import './css-files/Cards.css';

import Web3 from 'web3'
const ProfileCard = ({ posts }) => {
    const [state, setState] = useState(false);
    const [accountNow, setAccounts] = useState('');
    const loadWeb3 = async () => {
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
    useEffect(() => {
        loadWeb3();
        getMetaMaskAccount();
    })
    if (state)
        return (
            <>

                <div className="container-fluid d-flex justify-content-center" style={{ background: "transparent", paddingBottom: "50px" }}>

                    <div className="row">

                        {posts.map(post => {
                            if (post.state == 2 && post.owner == accountNow) {
                                const src = "https://ipfs.io/ipfs/" + post.video + "?autoplay=1&mute=1"
                                return (
                                    <ProfileCardItem
                                        src={src}
                                        text={post.title}
                                        content={post.content}
                                        path={post._id}
                                        price={post.tokenPrice}
                                        available={post.tokenNumber} />
                                )
                            }
                        })}
                    </div>

                </div>
            </>
        )
    else return (
        <h1>Connect to MetaMask man</h1>
    )
}
export default ProfileCard;
