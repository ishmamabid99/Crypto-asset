import React, { Component } from 'react'
import Body from '../Body'
import Banner from '../Banner'
import {Link} from 'react-router-dom'

export default class Error extends Component {
    render() {
        return (
            <Body>
                <Banner title="404" subtitle="You're already logged in">
                <Link to="/" className='btn--outline' buttonSize='medium' >
                    Returm Home
                </Link>
                </Banner>
            </Body>
        )
    }
}
