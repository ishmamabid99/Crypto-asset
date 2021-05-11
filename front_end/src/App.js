import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Switch, Route, useParams } from 'react-router-dom';
import Home from './components/pages/Home';
import MarketPlace from './components/pages/MarketPlace';
import BuyToken from './components/pages/BuyToken';
import Create from './components/pages/Create';
import Detail from './components/pages/Detail';
import Profile from './components/pages/Profile'
import Apporve from './components/pages/Approve';
import Update from './components/pages/Update';
import Responses from './components/pages/Responses';
import Sale from './components/Sale';
import Bid from './components/pages/Bid'
import BuyBid from './components/pages/BuyBid'
import Footer from './components/Footer'
import './App.css';

function App() {
  return (
    <>
      <div className='App'>
        <Navbar />
        <Switch>
          <Route exact path='/' exact component={Home} />
          <Route exact path='/bid' exact component={Bid} />
          <Route path="/asset/:id" exact component={Detail} />
          <Route path="/buy/:id" exact component={BuyToken} />
          <Route path='/requests' exact component={Apporve} />
          <Route path='/market-place' exact component={MarketPlace} />
          <Route path='/responses' exact component={Responses} />
          <Route path='/profile' exact component={Profile} />
          <Route path='/create' exact component={Create} />
          <Route path='/update/:id' exact component={Update} />
          <Route path='/sale/:id' exact component={Sale} />
          <Route path='/buybid/:id' exact component={BuyBid} />
        </Switch>
      </div>
      <Footer />
    </>
  );
}

export default App;
