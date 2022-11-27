import React from 'react'
import {Switch, Route, Link} from 'react-router-dom'
import {Layout, Typography, Space } from 'antd'
import { Navbar, Exchanges,Cryptocurrencies, CryptoDetails, Homepage, News } from './components'; 
import './App.css';

const App = () => {
  return (
    <>
    <div className='app'>
      <div className='navbar'>
         <Navbar />
       </div>
       <div className='main'>
         <Layout >
            <div className='route'>
               <Switch>
                   <Route path="/exchanges">
                         <Exchanges />
                   </Route>
                   <Route path="/cryptocurrencies">
                         <Cryptocurrencies />
                   </Route>
                   <Route path="/cryptodetails/:coinId">
                         <CryptoDetails />
                   </Route>
                   <Route path="/news">
                         <News />
                   </Route>
                   <Route path="/">
                         <Homepage />
                   </Route>
               </Switch>
            </div>
         </Layout>
       <div className='footer'>
            <Typography.Title level={5} style={{ color: 'white', textAlign: 'center'}}>
               Cryptoverse <br />
               All Rights Reserved
            </Typography.Title>
            <Space>
               <Link to="/">Home</Link>
               <Link to="/exchanges">Exchanges</Link>
               <Link to="/news">News</Link>
            </Space>
       </div>
      </div>
    </div>
    </>
  )
}

export default App