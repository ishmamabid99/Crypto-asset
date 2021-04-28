import React from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";
import './css-files/Cards.css';
function CardItem(props) {
  const path = "asset/" + props.path;
  const path2 = "buy/" + props.path;
  return (


    <>

      <div className="body">
        <div className="card text-center">
          <Link style={{ textDecoration: "none" }} to={path}>
            <div className="overflow ">
              <div className="embed-responsive embed-responsive-16by9" >
                <iframe src={props.src} className="embed-responsive-item" align="center" frameBorder="0" allowFullScreen title="Loading" /><br/>
              </div>

            </div>
            <div className="card-body text-dark">
              <h3 className="card-title"> {props.text} </h3>
              <h3 className="card-title">Price :  {props.price}   </h3>

            </div>
          </Link>

          <h3 className="btn--secondary" style={{ padding: "6px", backgroundColor: "#e3f8e9" }}> Available Now : {props.available} </h3>
          <Link to={path2}><button className="btn-danger"> Buy Now </button></Link>
        </div>
      </div>

    </>
  )
}
export default CardItem;
const ViewContainer = styled.div`
margin-top:40px;
.btn2{
  margin-left:10px;
  margin-bottom:20px
}
  
`;