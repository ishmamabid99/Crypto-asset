import React, { useState, useEffect } from 'react'

import axios from 'axios'
import Web3 from 'web3'
import Swal from 'sweetalert2'
import Body from '../Body'
import Banner from '../Banner'

import '../css-files/Create.css'

const ipfsAPI = require('ipfs-api');
var ipfs = ipfsAPI({ host: 'ipfs.infura.io', port: '5001', protocol: 'https' });
const Create = () => {
    let [title, setTitle] = useState('');
    let [symbol, setSymbol] = useState('');
    let [tokenPrice, setTokenPrice] = useState('');
    let [tokenNumber, setTokenNumber] = useState('');
    let [houseNo, setHouseNo] = useState('');
    let [plot, setPlot] = useState('');
    let [owner, setOwner] = useState('');
    let [deed, setDeed] = useState('');
    let [ward, setWard] = useState('');
    let [roadNo, setroadNo] = useState('');
    let [postCode, setPostCode] = useState('')
    let [content, setContent] = useState('');
    let [area, setArea] = useState('')
    const [_hash, setHash] = useState('');
    const [video, setVideo] = useState('');
    const [state, setState] = useState(false);
    const [accountNow, setAccounts] = useState('');
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
    useEffect(() => {
        loadWeb3();
        getIt();

    }, []);
    const handleOnCheckTitle = (e) => {
        setTitle(e.target.value.split(" ").join(""));
    };
    const handleOnCheckOwner = (e) => {
        setOwner(e.target.value.split(" ").join(""));
    };
    const handleOnCheckSymbol = (e) => {
        setSymbol(e.target.value.split(" ").join(""));
    };
    const fileUpload = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        if (file) {
            const reader = new window.FileReader();
            reader.readAsArrayBuffer(file);
            reader.onloadend = () => {
                setHash({ buffer: Buffer(reader.result) });
            }
        }
    };
    const videoUpload = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        if (file) {
            const reader = new window.FileReader();
            reader.readAsArrayBuffer(file);
            reader.onloadend = () => {
                setVideo({ buffer: Buffer(reader.result) });
            }
        }
    }
    const changeOnClick = async (e) => {
        e.preventDefault();
        title = title.toUpperCase();
        symbol = symbol.toUpperCase();
        owner = owner.toUpperCase();
        await ipfs.add(_hash.buffer, (err, res) => {
            if (!err) {
                const hash = res[0].hash;
                const owner = accountNow;
                ipfs.add(video.buffer, (err, res) => {
                    if (!err) {
                        const video = res[0].hash;

    
                        const info = {
                            title,
                            symbol,
                            tokenPrice,
                            tokenNumber,
                            houseNo,
                            plot,
                            owner,
                            deed,
                            ward,
                            roadNo,
                            postCode,
                            area,
                            content,
                            hash,
                            video
                        }
                        axios.post('http://localhost:8080/asset/create', info)
                            .then(res => Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Check Responses for further process',
                                showConfirmButton: false,
                                timer: 15000
                            }))
                            .catch(err => Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Something went wrong!'
                            })
                            );


                    }
                });
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!'
                })
            }
        });
        setTitle('');
        setSymbol('');
        setTokenPrice('');
        setTokenNumber('');
        setHouseNo('');
        setPlot('');
        setOwner('');
        setDeed('');
        setWard('');
        setroadNo('');
        setPostCode('');
        setArea('')
        setContent('');
        setHash('');
    }
    if (state)
        return (
            <>
                <Body>

                    <div style={{marginRight:"600px"}} className="create-container">
                        <Banner title="Add New Asset">
                        </Banner>
                        <form onSubmit={changeOnClick} encType="multipart/form-data">
                            <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <input onKeyPress={handleOnCheckTitle} onChange={evt => {
                                    setTitle(evt.target.value);
                                }}
                                    value={title}
                                    type="text" className="form-control" placeholder="Title should be unique" />
                            </div>
                            <div className="form-group">
                        <label htmlFor="symbol">Symbol</label>
                        <input onKeyPress={handleOnCheckSymbol} onChange={evt => setSymbol(evt.target.value)}
                            value={symbol}
                            type="text" className="form-control" placeholder="Choose a unique symbol" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="tokenPrice">Token price</label>
                        <input onChange={evt => setTokenPrice(evt.target.value)}
                            value={tokenPrice}
                            type="number" inputMode="numeric" className="form-control" placeholder="Token price in eth" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="tokenNumber">Token's Quantity</label>
                        <input onChange={evt => setTokenNumber(evt.target.value)}
                            value={tokenNumber}
                            type="number" inputMode="numeric" className="form-control" placeholder="number of tokens" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="symbol">House No</label>
                        <input onChange={evt => setHouseNo(evt.target.value)}
                            value={houseNo}
                            type="text" className="form-control" placeholder="Your house no:" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="plot">Plot No</label>
                        <input onChange={evt => setPlot(evt.target.value)}
                            value={plot}
                            type="number" inputMode="numeric" className="form-control" placeholder="plot number" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="deed">Deed No</label>
                        <input onChange={evt => setDeed(evt.target.value)}
                            value={deed}
                            type="number" className="form-control" placeholder="Your Asset's deed no" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="ward">Ward No</label>
                        <input onChange={evt => setWard(evt.target.value)}
                            value={ward}
                            type="number" inputMode="numeric" className="form-control" placeholder="Ward number" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="roadNo">Road No</label>
                        <input onChange={evt => setroadNo(evt.target.value)}
                            value={roadNo}
                            type="number" inputMode="numeric" className="form-control" placeholder="Road number" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="postCode">Post Code</label>
                        <input onChange={evt => setPostCode(evt.target.value)}
                            value={postCode}
                            type="number" inputMode="numeric" className="form-control" placeholder="Post code" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="area">Asset loacation</label>
                        <textarea
                            value={area}
                            onChange={evt => setArea(evt.target.value)}
                            className="form-control" rows="2" placeholder="Give your asset's loacation"></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="content">Description</label>
                        <textarea
                            value={content}
                            onChange={evt => setContent(evt.target.value)}
                            className="form-control" rows="3" placeholder="Give a short description"></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="hash">Your deed document(pdf recommended)</label>
                        <input onChange={fileUpload}
                            type="file" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="video">Your property video (mp4 recommended)</label>
                        <input onChange={videoUpload}
                            type="file" className="form-control" />
                    </div>
                            <button style={{marginLeft:'234.5px'}} type="submit" className="btn btn-lg btn-danger">Apply now</button>
                        </form>

                    </div>
                </Body>

            </>
        )
    else {
        return (
            <h1>
                Connect with your MetaMask account to view this page
            </h1>
        )
    }
}

export default Create
