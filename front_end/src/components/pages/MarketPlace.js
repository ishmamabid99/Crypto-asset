import '../../App.css';
import Cards from '../Cards';
import React ,{useState ,useEffect} from 'react'
import {Route}  from 'react-router-dom'
import axios from 'axios'

function MarketPlace(){

    const [posts, setPosts] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:8080/asset").
            then(res => {
                setPosts(res.data)
            })
         .catch(err =>{})
    },[]);
    return(
        <>
        <Route exact path="/market-place"
        render={() => <Cards
            posts={posts}
        />}
        />

        </>
    )
}
export default MarketPlace;
