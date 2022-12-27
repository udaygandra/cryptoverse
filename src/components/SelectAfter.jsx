import React from 'react'
import {Select} from 'antd'

const {Option} = Select

const SelectAfter = (props) => {

    const {
        cryptoOptions,
        selectedCrypto,
        onChangeCrypto,
      } = props 

  return (
    <>
    <Select showSearch 
        className='select-news' 
        placeholder="Select a Crytpo"
        optionFilterProp='children'
        value={selectedCrypto}
        onChange={onChangeCrypto}
        filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
          {cryptoOptions?.map((coin, idx) => <Option value={coin.name} key={`${coin.name}-${idx}`}>{coin.name}</Option>)}
        </Select> 
        </>
  )
}

export default SelectAfter