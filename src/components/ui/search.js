import React from 'react'
import styles from './search.less'
import { Input, Select, Button, Icon } from 'antd'

const Search = (props) => {
  const handleSearch = () => {
    // console.log(this.refs.searchInput)
  }
  const handleInputChange = () => {

  }
  const handleClearInput = () => {

  }
  const {size, select, selectOptions, selectProps, onSearch} = props
  return (
    <Input.Group compact size={size} className={styles.search} >
      {select ? <Select size={size} {...selectProps}>
        {selectOptions.map((item, key) => <Select.Option value={item.value} key={key}>{item.name || item.value}</Select.Option>)}
      </Select> : ''}
      <Input size={size} onChange={handleInputChange} />
      <Button size={size} type='primary' onClick={handleSearch}>搜索</Button>
      <Icon type='cross' onClick={handleClearInput} />
    </Input.Group>
  )
}

export default Search
