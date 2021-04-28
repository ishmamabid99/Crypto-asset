import '../../App.css';
import ProfileCard from '../ProfileCard';
import React, { useState, useEffect } from 'react'
import { Route } from 'react-router-dom'
import axios from 'axios'
import Web3 from 'web3';
import OwnedCard from '../OwnerCard';
import Body from '../Body'
import Banner from '../Banner'
import Footer from '../Footer';
function Profile() {
    const [accountNow, setAccounts] = useState('');
    const [posts, setPosts] = useState([]);
    const getMetaMaskAccount = async () => {
        const web3 = window.web3;
        const account = await web3.eth.getAccounts();
        console.log(account);
        setAccounts(account[0]);

    }
    useEffect(() => {
        getMetaMaskAccount();
        axios.get("http://localhost:8080/asset").
            then(res => {
                setPosts(res.data)
            })
            .catch(err => console.log(err))
    }, []);

    return (
        <>
            <Body>
                <div style={{
                    background: 'rgba(0, 0, 0, 0.6)', marginTop: '100px', paddingLeft: '20px'
                }
                } >
                    <h2 style={{ marginTop: "50px", textAlign: "center", color: 'white' }}>Assets Tokenized by :
                    <p>{accountNow}</p></h2>
                    <Route exact path="/profile"
                        render={() => <ProfileCard
                            posts={posts}
                        />}
                    />

                </div>

            </Body>
            <div style={{ background: 'rgba(0, 0, 0, 0.6)', marginTop: '100px', paddingLeft: '20px' }}>
                <h2 style={{ marginTop: "10px", textAlign: "center", color: 'white' }}>Tokens Owned by :
                    <p>{accountNow}</p></h2>
                <OwnedCard />
            </div>
        </>
    )
}
export default Profile;
