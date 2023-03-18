/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import { Select, Typography, Row, Col, Avatar, Card } from 'antd'
import moment from 'moment/moment'

import { useGetCryptosQuery } from '../services/cryptoApi'
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi'
import { useState } from 'react'

import Loader from './Loader'

const {Text, Title } = Typography

const {Option} = Select

const demoImgUrl = 'https://coinrevoltion.com/wp-content/uploads/2020/06/crytponews.jpg';

const News = ({simplified}) => {

  const [newsCategory, setNewsCategory] = useState('Cryptocurrency');

  const {data} = useGetCryptosQuery(100);
  const {data: cryptoNews} = useGetCryptoNewsQuery({newsCategory, count: simplified ? 6 : 12})
  
 if(!cryptoNews?.value) return <Loader/>;

  return (
    <Row gutter={[24,24]}>
      {!simplified && (
    <Col span={24}>
        <Select showSearch 
        className='select-news' 
        placeholder="Select a Crytpo"
        optionFilterProp='children'
        onChange={(val) => setNewsCategory(val)}
        filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
          <Option value="Cryptocurrency">Cryptocurrency</Option>
          {data?.data?.coins.map((coin, idx) => <Option value={coin.name} key={`${coin.name}-${idx}`}>{coin.name}</Option>)}
        </Select>
    </Col>
  )}
      {cryptoNews.value.map((news, i) => 
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className='news-card'>
             <a href={news.url} target="_blank" rel="noreferrer">
              <div className='news-image-container'>
                <Title className='news-title' level={4}>{news.name}</Title>
                <img style={{maxWidth: '200px', maxHeight: '100px' }} src={news?.image?.thumbnail?.contentUrl || demoImgUrl} />
              </div>
              <p>
                {news.description > 100 ? `${news.description.substring(0,100)}...` : news.description}
              </p>
              <div className='provider-container'>
                 <div>
                     <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImgUrl } alt="news" />
                     <Text className='provide-name'>{news.provider[0]?.name}</Text>
                 </div>
                 <Text>{moment(news?.datePublished).startOf('ss').fromNow()}</Text>
              </div>
             </a>
          </Card>   
        </Col>
      )}
    </Row>
  )
}

export default News