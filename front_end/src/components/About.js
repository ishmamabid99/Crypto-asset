import React from 'react'
import './css-files/About.css'

function About() {
    return (

        <div style={{marginTop:"80px"}} className="about">
            <div className="container">
                <h1>About Us</h1>
                <div className="border" style={{ background: "#000",height:"5px" , margin: "10px auto"}}></div>
                <div className="row-about">
                    <div className="col-6">
                        <div className="about__img">
                            <img src='./images/tmp1.jpeg' alt="About Pic" />
                        </div>
                    </div>
                    <div className="col-6">
                        <h3>Crypto-Asset</h3>
                        <h5>Fractional and frictionless real estate investing</h5>
                        <p>For the first time, investors around the globe can buy into the Bangladesh real estate market through fully-compliant, fractional, tokenized ownership. Powered by blockchain.</p>
                        <p>RealToken provides investors with a simple, intelligent, and user-friendly method to buy into fractional, tokenized properties, leveraging the Bangladesh's legal system and the permissionless, unrestricted token issuance of Ethereum.
                        Investing with RealT means low maintenance property ownership, access to cash flows related to the property (e.g., rent), and frictionless ownership transactions via RealTokens.</p>
                    </div>


                </div>
            </div>
        </div>

    )
}

export default About;
