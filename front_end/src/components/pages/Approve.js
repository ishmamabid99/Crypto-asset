
import '../../App.css';
import ApproveCard from '../ApproveCard';
import React, { useState, useEffect } from 'react'
import { Route } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2';
function Approve() {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:8080/asset").
            then(res => {
                setPosts(res.data)
            })
            .catch(err=> Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!'
            }))
    });

    return (
        <>
        <div>
            <Route exact path="/requests"
                render={() => <ApproveCard
                    posts={posts}
                />}
            />
        </div>
        </>
    )
}

export default Approve
