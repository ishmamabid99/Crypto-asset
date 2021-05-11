
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../../App.css';
import axios from 'axios'
import Body from '../Body'
import Web3 from 'web3';
import TokenAbi from "../../abis/Token.json"
var md5 = require('md5');
export default function SignUp() {
  const [state, setState] = useState(false);
  const [accountNow, setAccounts] = useState('');
  const [check, setCheck] = useState('');
  const [ammount, setAmmount] = useState(0);
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
  const retrive = async () => {
    axios.get(`http://localhost:8080/asset/${id}`)
      .then(res => {
        setReqTitle(res.data.title);
        setTokenPrice(res.data.tokenPrice);
        setTokenNumber(res.data.tokenNumber);
        setOwner(res.data.owner);
        setPlot(res.data.plot);
        setPostCode(res.data.postCode);
        setRoadNo(res.data.roadNo);
        setDeed(res.data.deed)
      })
      .catch(err => {});
  }
  useEffect(() => {
    loadWeb3();
    getIt();
    retrive();
  });
  const buyToken = async () => {
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
      const contract = new web3.eth.Contract(abi, address);
      const toAddress = await contract.methods.getTokenOwner(hash).call();
      let _price = await contract.methods.getTokenPrice(hash).call();
      const price = (_price * ammount).toString();
      await web3.eth.sendTransaction({ from: account[0], to: toAddress, value: web3.utils.toWei(price, "ether") });
      
      await contract.methods.buyToken(hash, ammount)
        .send({ from: account[0] })
        .once('reciept', (reciept) => window.location.reload(false));
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (check === reqTitle && ammount <= tokenNumber) {
      loadWeb3();
      await buyToken();
      const newAm = tokenNumber - ammount;
      setTimeout(3000);
      await axios.put(`http://localhost:8080/asset/token/${id}`, { tokenNumber: newAm })
        .then(res => { })
        .catch(err => {});
    }
    else {
      window.alert("re-check your submission");
    }
  }
  if (state) {
    return (
      <>
        <Body>

          <div style={{ width: "630px", textAlign: "center", padding: "15px", marginLeft: "50px", marginTop: "20px", background: 'rgba(0, 0, 0, 0.6)', color: 'white', width: "fit-content" }}>
            <h2 style={{ color: "beige" }}>Your Current Account</h2><h4>{accountNow}</h4>
            <h2> Name : {reqTitle} </h2>
            <h2 style={{ marginTop: "15px", marginBottom: "10px" }}> Owner </h2> <h3>{owner} </h3>
            <h4 style={{ paddingTop: "10px", marginBottom: "10px" }}> Token Price :  {tokenPrice} </h4>
            <h4> Token Left : {tokenNumber} </h4>
          </div>

          <form onSubmit={handleSubmit} style={{ margin: "5rem 21rem 4rem", width: "430px", height: "290px", marginRight: "25px", marginLeft: "100px" }} encType="multipart/form-data">
            <div className="form-group">
              <label htmlFor="title">Ammount to buy</label>
              <input onChange={evt => {
                setAmmount(evt.target.value);
              }}
                value={ammount} type="text" className="form-control" placeholder="Give a suitable title" />
            </div>
            <div className="form-group">
              <label htmlFor="symbol">Type the name of token</label>
              <input onChange={evt => setCheck(evt.target.value)}
                value={check}
                type="text" className="form-control" placeholder="Re-type token's name to confirm" />
            </div>
            <button type="submit" className="btn-danger" style={{ padding: "10px" }}> Buy Ipo </button>
          </form>

        </Body>

      </>

    )
  }
  else {
    return (
      <h1>Use MetaMask Wallet to buy</h1>
    )
  }
}
