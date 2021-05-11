import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './css-files/Cards.css';

function BidCard(props) {

    const [video, setVideo] = useState('');
    const path = "asset/" + props.link;
    const path2 = "buybid/" + props.id;
    useEffect(() => {
        axios.get(`http://localhost:8080/asset/${props.link}`)
            .then(res => {
                setVideo(res.data.video);
            })
    });
    return (

        <>

            <div className="body">
                <div className="card text-center">
                    <Link style={{ textDecoration: "none" }} to={path}>
                        <div className="overflow ">

                            <div className="embed-responsive embed-responsive-16by9" >
                                <iframe src={`https://ipfs.io/ipfs/${video}`} className="embed-responsive-item" align="center" frameBorder="0" allowFullScreen title="Loading" /><br/>
                            </div>

                        </div>
                        <div className="card-body text-dark">
                            <h3 className="card-title"> {props.title}</h3>
                            <h3 className="card-title">Price :  {props.price}  </h3>

                        </div>
                    </Link>

                    <h3 className="btn--secondary" style={{ padding: "6px", backgroundColor: "#e3f8e9" }}> For Sell : {props.amount} </h3>
                    <Link to={path2}><button className="btn-danger"> Buy this bid </button></Link>
                </div>
            </div>

        </>
    )
}

export default BidCard
