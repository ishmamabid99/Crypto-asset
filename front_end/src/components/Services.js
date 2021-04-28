import React from 'react'
import './css-files/Services.css'



function Services() {
    return (
        <div className="services-section">
            <div className="inner-width">
                <h1 className="section-title">Our Services</h1>
                <div className="border"></div>
                <div className="services-container">

                    <div className="service-box">
                        <div className="service-icon">
                        <i className="fas fa-key"></i>
                        </div>
                        <div className="service-title">Unique Tokens</div>
                        <div className="service-desc">
                            Ownership of each property is distributed across a finite number of representative tokens. Based on token share, owners can collect revenue from rent, and vote on property decisions.                       </div>
                    </div>

                    <div className="service-box">
                        <div className="service-icon">
                            <i className="fab fa-ethereum"></i>
                        </div>
                        <div className="service-title">Instant Payments</div>
                        <div className="service-desc">
                            With blockchains, we no longer need to wait to receive a bank transfer. Owning property with RealT allows you to collect the payment immmediately. Payment is paid using a US-Dollar stablecoin, sent to your xDai or Ethereum wallet. </div>
                    </div>
                    <div className="service-box">
                        <div className="service-icon">
                            <i className="fas fa-handshake"></i>
                        </div>
                        <div className="service-title">LLC Owned</div>
                        <div className="service-desc">
                            Real estate can’t directly be tokenized, but legal entities can. Each property is owned by a Limited Liability Corporation (LLC). Each LLC is tokenized to specific RealTokens and made available for purchase.  </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Services;
