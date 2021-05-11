import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './css-files/Navbar.css';
import Web3 from 'web3'

function Navbar() {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
    const [state, setState] = useState(0);
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);
    const showButton = () => {
        if (window.innerWidth <= 960) { setButton(false); }
        else { setButton(true); }
    };
    const loadWeb3 = async () => {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.enable()
            await setState(1);
        }
        else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider);
            await setState(1);
        }
        else {
            window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }
    }
    useEffect(() => {
        loadWeb3();
        showButton()
    }, []);

    window.addEventListener('resize', showButton);

    return (
        <>
            <nav className="navbar">

                <div className="navbar-container ">
                    <div>
                        <Link to="/" className="navbar-logo"
                            onClick={closeMobileMenu}>
                            Crypto-Assets<i className='fab fa-typo3' />
                        </Link>

                        <div className='menu-icon'
                            onClick={handleClick}>
                            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                        </div>
                    </div>
                    <div style={{ paddingLeft: '350px' }}>
                        <ul className={click ? 'nav-menu active' : ' nav-menu'} >

                            <li>
                                <Link to='/market-place' className='nav-links'
                                    onClick={closeMobileMenu}><p>IPO</p></Link>
                            </li>
                            {state ?
                                <li >
                                    <Link to='/create' className='nav-links'
                                        onClick={closeMobileMenu}>
                                        <p>Create</p>
                                    </Link>
                                </li>
                                : <p></p>}
                            {state ?
                                <li >
                                    <Link to='/responses' className='nav-links'
                                        onClick={closeMobileMenu}>
                                        <p>Responses</p>
                                    </Link>
                                </li>
                                : <p></p>
                            }

                            {state ?
                                <li>
                                    <div className="row">
                                        <Link to='/profile' className='nav-links'
                                            onClick={closeMobileMenu}>
                                            <p>Profile</p>
                                        </Link>
                                        <Link to='/bid' className='nav-links'
                                            onClick={closeMobileMenu}>
                                            <p>Bid</p>
                                        </Link>
                                    </div>

                                </li>
                                : <p></p>
                            }

                        </ul>

                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
