import React, {useState, useEffect} from 'react'
import { Button, Menu, Typography, Avatar } from 'antd'
import {Link} from 'react-router-dom'
import { HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined, MenuOutlined  } from '@ant-design/icons'
import icon from '../images/cryptocurrency.png'

const Navbar = () => {
    const [activeMenu, setActiveMenu] = useState(true);
    const [screenWidth, setScreenWidth] = useState(null);
    
    useEffect(() => {
      const handleResize = () => setScreenWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      
      handleResize()
  
      return () => window.removeEventListener("resize", handleResize);
    }, []);
  
    useEffect(() => {
      if (screenWidth < 768) {
        setActiveMenu(false);
      } else {
        setActiveMenu(true);
      }
    }, [screenWidth]);


  return (
    <div className='nav-container'>
        <div className='logo-container'>
            <Avatar src={icon} size="large"/>
            <Typography.Title level={2} className="logo">
                <Link to="/">Cryptoverse</Link>
            </Typography.Title>    
            <Button className='menu-control-container' onClick={()=> setActiveMenu(!activeMenu)}>
                <MenuOutlined/>
            </Button>
        </div>
       {activeMenu && <Menu theme="dark">
           <Menu.Item key="1" icon={<HomeOutlined/>}>
                <Link to="/">Home</Link>
            </Menu.Item> 
            <Menu.Item key="2" icon={<FundOutlined/>}>
                <Link to="/cryptocurrencies">CryptoCurrencies</Link>
            </Menu.Item> 
            <Menu.Item key="3" icon={<MoneyCollectOutlined/>}>
                <Link to="/exchanges">Exchanges</Link>
            </Menu.Item> 
            <Menu.Item key="4" icon={<BulbOutlined/>}>
                <Link to="/news">News</Link>
            </Menu.Item>   
        </Menu>}
    </div>
  )
}

export default Navbar