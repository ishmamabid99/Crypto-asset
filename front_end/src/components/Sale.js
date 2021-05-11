import axios from 'axios';
import md5 from 'md5';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import Web3 from 'web3';
import TokenAbi from '../abis/Token.json'
import Swal from 'sweetalert2'
import Body from './Body';
function Sale() {
    const [state, setState] = useState(false);
    const [accountNow, setAccounts] = useState('');
    const [check, setCheck] = useState('');
    const [price, setPrice] = useState('');
    const [amount, setAmmount] = useState(0);
    let [reqTitle, setReqTitle] = useState('');
    let [tokenPrice, setTokenPrice] = useState('');
    let [tokenNumber, setTokenNumber] = useState('');
    let [owner, setOwner] = useState('');
    let [plot, setPlot] = useState('');
    let [postCode, setPostCode] = useState('');
    let [roadNo, setRoadNo] = useState('');
    let [deed, setDeed] = useState('');
    let { id } = useParams();

    const loadWeb3 = async () => {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.enable();
            setState(true);
        }
        else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider);
            setState(true);
        }
        else {
            window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }
    }
    const getIt = async () => {
        const web3 = window.web3;
        const account = await web3.eth.getAccounts();
        setAccounts(account[0]);
    }
    const retrive = () => {
        axios.get(`http://localhost:8080/asset/${id}`)
            .then(res => {
                setReqTitle(res.data.title);
                setTokenPrice(res.data.tokenPrice);
                setOwner(res.data.owner);
                setPlot(res.data.plot);
                setPostCode(res.data.postCode);
                setRoadNo(res.data.roadNo);
                setDeed(res.data.deed)
            })
            .catch(err =>{});
    }
    useEffect(() => {

        loadWeb3();
        getIt();
        retrive();
        getAccountCredits();
    });
    const getAccountCredits = async () => {

        const web3 = window.web3;
        const account = await web3.eth.getAccounts();
        const networkId = await web3.eth.net.getId();
        const networkData = TokenAbi.networks[networkId];
        const temp = plot.toString() + postCode.toString() + roadNo.toString() + deed.toString();
        const hash = md5(temp);
        if (networkData) {
            const address = networkData.address;
            const abi = TokenAbi.abi;
            const account = await web3.eth.getAccounts();
            const contract = new web3.eth.Contract(abi, address);
            const tokens = await contract.methods.getAccountTokens(account[0].toString(), hash.toString()).call();
            setTokenNumber(tokens);
        }
    }
    const SellToken = async () => {
        loadWeb3();
        const web3 = window.web3;
        const account = await web3.eth.getAccounts();
        const networkId = await web3.eth.net.getId();
        const networkData = TokenAbi.networks[networkId];
        const temp = plot.toString() + postCode.toString() + roadNo.toString() + deed.toString();
        const hash = md5(temp);
        if (networkData) {
            const address = networkData.address;
            const abi = TokenAbi.abi;
            const account = await web3.eth.getAccounts();
            const contract = new web3.eth.Contract(abi, address);
            const tokens = await contract.methods.getAccountTokens(account[0].toString(), hash.toString()).call();
            const status = await contract.methods.getSellStatus(account[0].toString(), hash.toString()).call();

            setTokenNumber(tokens);

            if ( status == 0) {
                await contract.methods.putOnSale(account[0].toString(), hash.toString(), amount.toString() , price.toString())
                    .send({ from: account[0] })
                    .once('reciept', (reciept) => {});
                const tmp = new Date().getUTCMilliseconds();
                const _id = md5(tmp);
                const link = id;
                const title = reqTitle;
                const seller = accountNow;
                const ammount = amount;
                const sales = {
                    _id, link, title, seller, ammount, price
                }
                await axios.post('http://localhost:8080/asset/bid', sales)
                    .then(res =>!
                        Swal.fire({
                          position: 'top-end',
                          icon: 'success',
                          title: 'Your tokens are up for bid now',
                          showConfirmButton: false,
                          timer: 1500
                        }))
                    .catch(err => window.alert("Error occured! Re-check your submission"));


            }
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        Swal.fire('If you have any unsold Token in auction , Do not issue new tokens for auction. it will not work.Thank you!')
        if (check == reqTitle) {
            SellToken();
        }
        else {
            window.alert("Please check your submission")
        }
    }
    return (
        <>
        <Body>
        <div style={{ textAlign: "center", marginTop: "70px",padding:"15px",marginTop: "20px",background: 'rgba(0, 0, 0, 0.6)',color: 'white' }}>
            <div style={{paddingTop:"40px"}} >
                <h3>Your account : {accountNow} </h3>
                <h2>Name : {reqTitle} </h2>
                <h3>Owner : {owner} </h3>
                <h3>Token Price : {tokenPrice} </h3>
                <h4>Token Left : {tokenNumber} </h4>
            </div>

            <form onSubmit={handleSubmit} style={{ margin: "5rem 25rem 5rem" ,width:"450px"}} encType="multipart/form-data">
                <div className="form-group" style={{ width:"450px" }}>
                    <label htmlFor="ammount">Ammount to sale</label>
                    <input onChange={evt => {
                        setAmmount(evt.target.value);
                    }}
                        value={amount}
                        type="text" className="form-control" placeholder="Enter Ammount" />
                </div>
                <div className="form-group" style={{ width:"450px" }}>
                    <label htmlFor="symbol">Selling Price</label>
                    <input onChange={evt => setPrice(evt.target.value)}
                        value={price}
                        type="text" className="form-control" placeholder="price you want to sell" />
                </div>
                <div className="form-group" style={{ width:"450px" }}>
                    <label htmlFor="symbol">Type the name of token</label>
                    <input onChange={evt => setCheck(evt.target.value)}
                        value={check}
                        type="text" className="form-control" placeholder="Re-type token's name to confirm" />
                </div>
                <button type="submit" className="btn-danger"> Sell now </button>
            </form>
        </div>
        </Body>

      </>
    )
}

export default Sale
