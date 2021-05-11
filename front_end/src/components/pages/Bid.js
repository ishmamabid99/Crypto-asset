import React, { useEffect, useState } from 'react'
import axios from 'axios'
import BidCard from '../BidCard';
function Bid() {
    const [posts, setPosts] = useState([]);
    const retrive= async()=>{

    }
    useEffect(() => {
        axios.get("http://localhost:8080/asset/bid").
            then(res => {
                
                setPosts(res.data)
            })
            .catch(err =>{})
    }, []);
    return (

        <>

            <div className="container-fluid d-flex justify-content-center" style={{ background: "radial-gradient(#e5e5e5,#fff, #e5e5e5)", paddingBottom: "50px" }}>

                    <div className="row">

                {posts.map(post => {
                    return (<>
                        <BidCard
                            id  ={post._id}
                            link = {post.link}
                            title= {post.title}
                            owner ={post.owner}
                            price ={post.price}
                            amount ={post.amount}
                        />
                    </>
                    )
                })}
            </div>
        </div>

        </>
    )
}

export default Bid
