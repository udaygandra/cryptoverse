import React, {useState, useEffect} from 'react'
import { Row, Col, InputNumber, Button } from 'antd'
import SwapOutlined from '@ant-design/icons/SwapOutlined'
import { useGetCryptosQuery } from '../services/cryptoApi'
import SelectAfter from './SelectAfter'
import Loader from './Loader'



const Exchanges = () => {

  const {data, isFetching} = useGetCryptosQuery(100)
  const [cryptoOptions, setCryptoOptions] = useState(data?.data?.coins)
  const [fromCrypto, setFromCrypto]= useState()
  const [toCrypto, setToCrypto]= useState()
  const [amount, setAmount]= useState(1)
  const [amountInFromCrypto, setAmountInFromCrypto] = useState(true)
  const [exchangeRate, setExchangeRate]= useState()

  
  useEffect(() =>{
    setCryptoOptions(data?.data?.coins)
    setFromCrypto(data?.data?.coins[0].name)
    setToCrypto(data?.data?.coins[1].name)
  }, [data?.data?.coins])

  useEffect(() =>{
     if(fromCrypto != null && toCrypto != null){   
      const fromRes = data?.data?.coins?.filter(obj => {return obj.name === fromCrypto})
      const toRes = data?.data?.coins?.filter(obj => {return obj.name === toCrypto})
      setExchangeRate(parseFloat(fromRes[0].price) / parseFloat(toRes[0].price) )
     }
  }, [data?.data?.coins, fromCrypto, toCrypto])

  let toAmount, fromAmount

  if(amountInFromCrypto){
    fromAmount = amount
    toAmount = amount*exchangeRate
  }else{
    toAmount = amount
    fromAmount = amount/exchangeRate
  }

  function handleFromAmountChange(value) {
    setAmount(value)
    setAmountInFromCrypto(true)
  }

  function handleToAmountChange(value) {
    setAmount(value)
    setAmountInFromCrypto(false)
  }

  // if(!data) return <Loader/>;
  return (
 <div>
      <Row gutter={[24,24]}>
      <Col span={8} >
      <InputNumber value={fromAmount} onChange={handleFromAmountChange} addonAfter={<SelectAfter 
                                cryptoOptions={cryptoOptions}
                                selectedCrypto={fromCrypto}
                                onChangeCrypto={value => setFromCrypto(value)} 
                                />}/>
    </Col>
    <SwapOutlined />
    <Col span={8} >
      <InputNumber value={toAmount} onChange={handleToAmountChange} addonAfter={<SelectAfter 
                                cryptoOptions={cryptoOptions}
                                selectedCrypto={toCrypto}
                                onChangeCrypto={value => setToCrypto(value)}
                                />}/>
    </Col>
    <Button type="primary">Calculate</Button>
    </Row>
    </div>)
}

export default Exchanges