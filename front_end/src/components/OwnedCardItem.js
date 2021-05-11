import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './css-files/Cards.css';
import TokenAbi from '../abis/Token.json'

function OwnerCardItem(props) {
  const [post, setPosts] = useState([]);
  const [path, setPath] = useState('');
  const [video, setVideo] = useState('');
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [available, setAvailable] = useState('');
  const [owner, setOwner] = useState('');
  const [id, setId] = useState('');
  const [accountNow, setAccounts] = useState('');
  const [path2, setPath2] = useState('');
  const [tokenNumber, setTokenNumber] = useState('');
  let _id;
  const getMetaMaskAccount = async () => {
    const web3 = window.web3;
    const account = await web3.eth.getAccounts();
    setAccounts(account[0]);

  }
  const getAccountCredits = async () => {

    const web3 = window.web3;
    const account = await web3.eth.getAccounts();
    const networkId = await web3.eth.net.getId();
    const networkData = TokenAbi.networks[networkId];
    if (networkData) {
      const address = networkData.address;
      const abi = TokenAbi.abi;
      const account = await web3.eth.getAccounts();
      const contract = new web3.eth.Contract(abi, address);
      const tokens = await contract.methods.getAccountTokens(account[0].toString(), props.hash.toString()).call();
      setTokenNumber(tokens);
    }
  }
  async function loadInfo() {
    const web3 = window.web3;
    const networkId = await web3.eth.net.getId();
    const networkData = TokenAbi.networks[networkId];
    if (networkData) {
      const address = networkData.address;
      const account = await web3.eth.getAccounts()[0];
      const abi = TokenAbi.abi;
      const contract = new web3.eth.Contract(abi, address);
      const hashId = await contract.methods.getNumberOfTokens(props.hash.toString()).call();

      setAvailable(hashId);
      axios.get(`http://localhost:8080/asset/sale/${await contract.methods.getDeedHash(props.hash).call()}`)
        .then(res => {

          const path = "asset/" + res.data[0]._id;
          const path2 = "sale/" + res.data[0]._id;
          setPath(path);
          setPath2(path2);
          setVideo(res.data[0].video);
          setTitle(res.data[0].title);
          setPrice(res.data[0].tokenPrice);
          setAvailable(res.data[0].tokenNumber);
          setOwner(res.data[0].owner);

        })
        .catch(err =>{});
    }
  }
  useEffect(async () => {
    await loadInfo();
    await getAccountCredits();
    getMetaMaskAccount();
    setId(_id);
  }, []);
  if (tokenNumber > 0)
    return (
      <>

        <div className="body">
          <div className="card text-center">
            <Link style={{ textDecoration: "none" }} to={path}>
              <div className="overflow ">
                <div className="embed-responsive embed-responsive-16by9" >
                  <iframe src={`https://ipfs.io/ipfs/${video}`} className="embed-responsive-item" align="center" frameBorder="0" allowFullScreen title="Loading" /><br />
                </div>
              </div>
              <div className="card-body text-dark">
                <h3 className="card-title"> {title}</h3>
                <h3 className="card-title">Price :  {price}  </h3>

              </div>
            </Link>

            <h3 className="btn--secondary" style={{ padding: "6px", backgroundColor: "#e3f8e9" }}> You own : {tokenNumber} </h3>
            <Link to={path2}><button className="btn-danger">Put on Sale</button></Link>
          </div>
        </div>

      </>
    )
  else return (

    <></>
  )

}
export default OwnerCardItem;
