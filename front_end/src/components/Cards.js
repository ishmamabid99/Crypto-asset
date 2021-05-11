import React, { useState, useEffect } from 'react';
import CardItem from './CardItem';
import styled from "styled-components"
import './css-files/Cards.css';

const Cards = ({ posts }) => {

    return (
        <>

            <div className="container-fluid d-flex justify-content-center" style={{ background: "radial-gradient(#e5e5e5,#fff, #e5e5e5)", paddingBottom: "50px" }}>

                <div className="row">
                    {posts.map(post => {
                        if (post.state == 2) {
                            const src = "https://ipfs.io/ipfs/" + post.video + "?autoplay=1&mute=1"
                            return (
                                <CardItem
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
export default Cards;
const ViewContainer = styled.div`

    margin:40px;

`;