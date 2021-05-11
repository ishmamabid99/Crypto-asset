
import axios from 'axios';
import e from 'cors';
import md5 from 'md5';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import Web3 from 'web3';
import TokenAbi from '../../abis/Token.json'
import Swal from 'sweetalert2'
import Body from '../Body';
function Update() {
    const [check, setCheck] = useState('');
    const [owner, setOwner] = useState('');
    const [Title, setTitle] = useState('');
    const [hash, setHash] = useState('');

    const [currentOwner, setCurrentOwner] = useState('');
    let { id } = useParams();
    const retrive = () => {
        axios.get(`http://localhost:8080/asset/${id}`)
            .then(res => {
                setTitle(res.data.title);
                setCurrentOwner(res.data.owner);
                const temp = res.data.plot.toString() + res.data.postCode.toString() + res.data.roadNo.toString()
                    + res.data.deed.toString();
                setHash(md5(temp))
            })
            .catch(err =>{});
    }
    const loadWeb3 = async () => {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.enable();
        }
        else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider);

        }
        else {
            window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
        }
    }
    const loadInfo = async (e) => {

        e.preventDefault();
        await loadWeb3();
        if (check == Title) {
            const web3 = window.web3;
            const account = await web3.eth.getAccounts();
            const networkId = await web3.eth.net.getId();
            const networkData = TokenAbi.networks[networkId];
            if (networkData) {
                const address = networkData.address;
                const abi = TokenAbi.abi;
                const contract = new web3.eth.Contract(abi, address);
                const toAddress = await contract.methods.getTokenOwner(hash).call();
              

                await contract.methods.changeOwner(hash, owner)
                    .send({ from: account[0] })
                    .once('reciept', (reciept) => {});
                const toAddress2 = await contract.methods.getTokenOwner(hash).call();
                axios.put(`http://localhost:8080/asset/owner/${id}`, { owner: owner })
                    .then(res => window.location.href = "http://localhost:3000/profile")
                    .catch(err => {});
   
            }
        }
        else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Token Name Do not matches',
                footer: '<p>Re-check your submission</p>'
            })
        }
    }
    useEffect(() => {
        retrive();
    });
    return (
      <>
      <Body>

      <div style={{ textAlign: "center", marginTop: "70px",padding:"15px",marginTop: "20px",background: 'rgba(0, 0, 0, 0.6)',color: 'white' }}>

            <h2 style={{ marginTop: "30px" }}>Owner Now: {currentOwner}</h2>
            <form onSubmit={loadInfo} style={{ margin: "5rem 25rem 5rem" }} encType="multipart/form-data">
                <div className="form-group" style={{ width:"450px" }}>
                    <label htmlFor="title" style={{ width:"100px"}}>New Owner</label>
                    <input onChange={evt => {
                        setOwner(evt.target.value);
                    }}
                        value={owner}
                        type="text" className="form-control" placeholder="Give a suitable title" />
                </div>
                <div className="form-group" style={{ width:"450px" }}>
                    <label htmlFor="symbol">Type the name of token</label>
                    <input onChange={evt => setCheck(evt.target.value)}
                        value={check}
                        type="text" className="form-control" placeholder="Re-type token's name to confirm" />
                </div>
                <button type="submit" className="btn-danger">Apply now</button>
            </form>
        </div>
        </Body>

      </>

    )



}

export default Update
