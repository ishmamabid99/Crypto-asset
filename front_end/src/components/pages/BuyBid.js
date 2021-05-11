
import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Redirect, useParams } from 'react-router';
import TokenAbi from '../../abis/Token.json'
import Body from '../Body'
import Footer from '../Footer';
import Swal from "sweetalert2";
function BuyBid() {
    const [amount, setAmmount] = useState('');
    const [check, setCheck] = useState('');
    const [posts, setPosts] = useState([]);
    let { id } = useParams();
    const retrive = () => {
        axios.get(`http://localhost:8080/asset/buybid/${id}`)
            .then(res => setPosts(res.data[0]))
            .catch(err => {});

    }
    useEffect(() => {

        retrive();
    }, []);

    const BuyOnBid = async (e) => {
        e.preventDefault();
        if(check == posts.title && amount >0){
        const web3 = window.web3;
        const account = await web3.eth.getAccounts();
        const networkId = await web3.eth.net.getId();
        const networkData = TokenAbi.networks[networkId];
        if (networkData) {
            const address = networkData.address;
            const abi = TokenAbi.abi;
            const account = await web3.eth.getAccounts();
            const contract = new web3.eth.Contract(abi, address);
            const tokens = await contract.methods.getTotalSupply().call();
            for (var i = 1; i <= tokens; i++) {
                const _hash = await contract.methods.getTokenHashID(i).call();
                const tokenNow = await contract.methods.getSellStatus(posts.seller.toString(), _hash.toString()).call();
                const _name = await contract.methods.getTokenName(_hash).call();
                if (_name == posts.title) {
 
                    let pr = await contract.methods.getOnSalePrice (posts.seller.toString(),_hash).call();
                    pr = parseInt(pr);
                    const ans = parseInt(amount);
                    const etheer = pr * ans;

                    await web3.eth.sendTransaction({ from: account[0], to: posts.seller.toString(), value: web3.utils.toWei(etheer.toString(), "ether") });
                    await contract.methods.buyOnBid(posts.seller.toString(), _hash, amount)
                        .send({ from: account[0] })
                        .once('reciept', (reciept) =>{});
                    const tokenLeft = await contract.methods.getSellStatus(posts.seller.toString(), _hash.toString()).call();
                    if (tokenLeft == 0) {
                        await axios.delete(`http://localhost:8080/asset/buybid/delete/${id}`)
                            .then(res => window.location.href = "http://localhost:3000/bid")
                            .catch(err =>{});

                    }
                    else {
                        await axios.put(`http://localhost:8080/asset/bid/update/${id}`, { amount: tokenLeft })
                            .then(res => Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Successful transaction',
                                showConfirmButton: false,
                                timer: 1500
                              }))
                            .catch(err => {});

                    }

                }
                else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                        footer: '<p>Re-check your submission</p>'
                      })
                }

            }
          }
          else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                footer: '<p>Re-check your submission</p>'
              })
          }

        }

    }
    const dataUpdate = async () => {

    }

    return (
      <>
      <Body>
        <div style={{ textAlign: "center", marginTop: "70px",padding:"15px",marginTop: "20px",background: 'rgba(0, 0, 0, 0.6)',color: 'white' }}>
            <div style={{paddingTop:"40px"}} >
                <h2>TokenOwner : {posts.seller} </h2>
                <h3>Token Available : {posts.amount} </h3>
                <h2>Token Price : {posts.price} </h2>
                <h3>Token Name : {posts.title} </h3>
            </div>
            <form onSubmit={BuyOnBid} style={{ margin: "5rem 25rem 5rem",width:"450px" }} encType="multipart/form-data">
                <div className="form-group" style={{ width:"450px" }} >
                    <label htmlFor="ammount">Ammount to Buy</label>
                    <input onChange={evt => {
                        setAmmount(evt.target.value);
                    }}
                        value={amount}
                        type="text" className="form-control" placeholder="Enter Ammount" />
                </div>
                <div className="form-group" style={{ width:"450px" }} >
                    <label htmlFor="symbol">Type the name of token</label>
                    <input onChange={evt => setCheck(evt.target.value)}
                        value={check}
                        type="text" className="form-control" placeholder="Re-type token's name to confirm" />
                </div>
                <button type="submit" className="btn btn-lg btn-danger"> Buy now </button>
            </form>
        </div>
        </Body>

        </>


    )


}

export default BuyBid
