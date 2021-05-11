import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Web3 from 'web3';
import Token from '../abis/Token.json'

function ResponseCardItem(props) {
    const [contract, setContract] = useState(undefined);
    const [accounts, setAccounts] = useState();
    const [totalSupply, setTotalSupply] = useState(122121212);
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
    const acceptAsset = async () => {
        loadWeb3();
        const web3 = window.web3;
        const account = await web3.eth.getAccounts();
        setAccounts(account[0]);
        const networkId = await web3.eth.net.getId();
        const networkData = Token.networks[networkId];
        if (networkData) {
            const address = networkData.address;
            const abi = Token.abi;
            const contract = new web3.eth.Contract(abi, address);
            const totalSupply = await contract.methods.getTotalSupply().call();

            await contract.methods.mint(
                props.price,
                props.available,
                props.text,
                props.symbol,
                props.deedNo,
                props.hash,
                props.deedhash,)
                .send({ from: account[0] })
                .once('reciept', (reciept) => {});
            setTotalSupply(totalSupply);
            setContract(contract);
            await axios.put(`http://localhost:8080/asset/update/${props.path}`).
                then(res => window.alert("Check MarketPlace")).
                catch(err => {
                    
                });
        }
        else {
            window.alert("contract not deployed to the detected network")
        }

    }
    const rejectAsset = e => {
        window.location.reload(false);
        axios.delete(`http://localhost:8080/asset/delete/${props.path}`).
            then(res =>{})
            .catch(err =>{});
    }
    const acceptFinale = e => {
        acceptAsset();
    }
    const path = "asset/" + props.path;
    return (
        <>

            <div className="body">
                <div className="card text-center">
                    <Link style={{ textDecoration: "none" }} to={path}>
                        <div className="overflow ">
                            <div className="embed-responsive embed-responsive-16by9" >
                                <iframe scrolling="auto" className="embed-responsive-item " align="center" frameBorder="0" allowFullScreen src={props.src} title="Loading" /><br />
                            </div>

                        </div>
                        <div className="card-body text-dark">
                            <h3 className="card-title"> {props.text}</h3>
                            <h3 className="card-title">Price : {props.price} </h3>
                            <h2 className="btn--secondary" style={{ border: "1px solid black" }}> Available Now :  {props.available}</h2>
                        </div>
                    </Link>
                    <div>
                        <div className="row" style={{ display: "flex", flexDirection: "row" }}>
                            <button type="submit" onClick={acceptFinale} className="btn btn-danger " style={{ marginLeft: "95px" }}>Accept</button>
                            <button type="submit" onClick={rejectAsset} className="btn btn-danger ">Reject</button>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}
export default ResponseCardItem
