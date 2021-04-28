import React, {useState,useEffect}from 'react'
import styled from "styled-components"
import {useParams} from 'react-router-dom';
import axios from 'axios'

function Detail() {
    let [title, setTitle] = useState('');
    let [symbol, setSymbol] = useState('');
    let [tokenPrice,setTokenPrice]= useState('');
    let [tokenNumber, setTokenNumber]=useState('');
    let [houseNo, setHouseNo] = useState('');
    let [plot ,setPlot]=useState('');
    let [owner,setOwner] = useState('');
    let [deed , setDeed] =useState('');
    let [ward  , setWard] =useState('');
    let [roadNo , setroadNo] =useState('');
    let [postCode , setPostCode] = useState('')
    let [content , setContent]= useState('');
    let [area , setArea] =useState('')
    let [_hash, setHash] = useState('');
    let [_video ,setVideo] = useState('');
    let {id} =useParams();
    useEffect(()=>{

        axios.get(`http://localhost:8080/asset/${id}`)
        .then(res=>{

            setTitle(res.data.title);
            setSymbol(res.data.symbol);
            setTokenPrice(res.data.tokenPrice);
            setTokenNumber(res.data.tokenNumber);
            setHouseNo(res.data.houseNo);
            setPlot(res.data.plot);
            setOwner(res.data.owner);
            setDeed(res.data.deed);
            setWard(res.data.ward);
            setroadNo(res.data.roadNo);
            setPostCode(res.data.postCode);
            setArea(res.data.area);
            setHash(res.data.hash);
            setVideo(res.data.video);
            setContent(res.data.content);


        })
        .catch(err=>{});
    },[]);

    return (
        <ViewContainer>
            <h1 style={{textAlign:"left"}}>{title}</h1>
            <div className="embed-responsive embed-responsive-16by9" >
            <iframe className="embed-responsive-item" align="center" frameBorder="0" allowFullScreen src= {`https://ipfs.io/ipfs/${_video}`} title="Loading"/><br/>
       </div>
       <div style={{marginTop:"50px"}}>
            <label><h5>Token Symbol :</h5>  <h6>{symbol}</h6> </label> <br/>
            <label><h5>Token Price :</h5><h6>{tokenPrice}</h6> </label><br/>
            <label><h5>Available Tokens :</h5><h6>{tokenNumber}</h6> </label><br/>
            <label><h5>House No :</h5><h6>{houseNo}</h6> </label><br/>
            <label><h5>Plot No :</h5><h6>{plot}</h6> </label><br/>
            <label><h5>Token Owner :</h5><h6>{owner}</h6> </label><br/>
            <label><h5>Plot's Deed No :</h5><h6>{deed}</h6> </label><br/>
            <label><h5>Plot's Ward No :</h5><h6>{ward}</h6> </label><br/>
            <label><h5>Plot's Road No :</h5><h6>{roadNo}</h6> </label><br/>
            <label><h5>Plot's Post Code :</h5><h6>{postCode}</h6> </label><br/>
            <label><h5>Detailed Location :</h5><h6>{area}</h6> </label><br/>
            <label><h5>Message from owner :</h5><h6>{content}</h6> </label><br/>
            </div>
            <div className="embed-responsive embed-responsive-16by9">
            <iframe className="embed-responsive-item" align="center" frameBorder="0" allowFullScreen src= {`https://ipfs.io/ipfs/${_hash}`} title="Loading"/><br/>
            </div>
        </ViewContainer>
    )
}

export default Detail


const ViewContainer = styled.div `

    margin: 6rem auto ;
    background-color:azure;
    padding:5rem;



    label{

    padding: 5px ;
    width: 100%;
    font-weight: 400;
    text-align: left;
    display: flex;
    flex-direction: row;
}




    h2{
        text-align:center;
        color:black;
    }
    h5{
        font-weight:900;
        color:black;
    }
    h5{  width: 290px;
        margin: 5px 0;
        padding: 8px;
        border: none;
        border-radius: 10px;
        font-family: inherit;
        font-weight: 700;
        letter-spacing: 2px;
        color: #000;
    }
    h6{  width: 100%;
        height:fit-content;
        margin: 5px 0;
        margin-left:10px;
        font-weight:900;
        color:black;
        padding: 8px;
        border: none;
        border-radius: 10px;
        font-family: inherit;
        font-weight: 700;
        letter-spacing: 2px;
        color: #000;
    }
    h1{
        font-weight:800;
        color:black;
    }

    img{
        width:960px;
        height:90%;
        overflow:hidden;
        margin-bottom: 40px;
        margin-left:330px;}


`;
