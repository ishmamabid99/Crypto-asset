import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ApproveCardItem from './ApproveCardItem';
import styled from 'styled-components';
import './css-files/ApproveCard.css';
import Body from './Body'
const ApproveCard = ({ posts }) => {

    return (

        <>
        
            <div className="container-fluid d-flex justify-content-center" style={{ background: "radial-gradient(#e5e5e5,#fff, #e5e5e5)", paddingBottom: "50px" }}>
              
                    <div className="row">
                        {posts.map(post => {
                            if (post.state == 0) {
                                const src = "https://ipfs.io/ipfs/" + post.video + "?autoplay=1&mute=1"
                                return (
                                    <ApproveCardItem
                                        src={src}
                                        text={post.title}
                                        content={post.content}
                                        path={post._id}
                                        price={post.tokenPrice}
                                        available={post.tokenNumber} />
                                )
                            }
                        })}
                    </div>
                </div>

        </>
    )
}
export default ApproveCard;
