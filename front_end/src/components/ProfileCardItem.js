import React from 'react';
import { Link } from 'react-router-dom';

import './css-files/Cards.css';
function ProfileCardItem(props) {
  const path = "asset/" + props.path;
  const path2 = "update/" + props.path;
  return (
    <>

      <div className="body">
        <div className="card text-center">
          <Link style={{ textDecoration: "none" }} to={path}>
            <div className="overflow ">
              <div className="embed-responsive embed-responsive-16by9" >
                <iframe src={props.src} className="embed-responsive-item" align="center" frameBorder="0" allowFullScreen title="Loading" /><br />
              </div>
            </div>
            <div className="card-body text-dark">
              <h3 className="card-title"> {props.text}</h3>
              <h3 className="card-title">Price :  {props.price}  </h3>
              <h2 className="btn--secondary" style={{ border: "1px solid black" }}> Available Now : {props.available}</h2>
            </div>
          </Link>
          <Link to={path2}> <button className="btn-danger">Update owner</button></Link>
        </div>
      </div>

    </>

  )
}
export default ProfileCardItem;
