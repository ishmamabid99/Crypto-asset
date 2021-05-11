import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
function ApproveCardItem(props) {
    const acceptAsset = e => {
        axios.put(`http://localhost:8080/asset/update/${props.path}`).
            then(res => {}).
            catch(err =>{});
    }
    const rejectAsset = e => {
        axios.delete(`http://localhost:8080/asset/delete/${props.path}`).
            then(res => {})
            .catch(err => {});
    }
    const path = "asset/" + props.path;
    return (
        <>

            <div className="body">
                <div className="card text-center">

                    <Link style={{ textDecoration: "none" }} to={path}>
                        <div className="overflow ">
                            <div className="embed-responsive embed-responsive-16by9" >
                                <iframe src={props.src} className="embed-responsive-item" align="center" frameBorder="0" allowFullScreen title="Loading" /><br/>
                            </div>
                            <div className="card-body text-dark">
                                <h3 className="card-title"> {props.text}</h3>
                                <h3 className="card-title">Price :  {props.price}  </h3>
                                <h2 className="btn--secondary" style={{ border: "1px solid black" }}> Available Now :  {props.available}</h2>
                            </div>
                        </div>
                    </Link>
                    <div>
                        <div className="row" style={{ display: "flex", flexDirection: "row" }}>
                            <button type="submit" onClick={acceptAsset} className="btn btn-danger " style={{ marginLeft: "95px" }}>Accept</button>
                            <button type="submit" onClick={rejectAsset} className="btn btn-danger ">Reject</button>
                        </div>
                    </div>



                </div>
            </div>

        </>

    )
}
export default ApproveCardItem;


