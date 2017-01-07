import React from 'react'
import styles from './search.less'
import { Input, Select, Button, Icon } from 'antd'

class Search extends React.Component {
  state = {
    clearVisible: false
  }
  handleSearch = () => {
    // console.log(this.refs.searchInput)
  }
  handleInputChange = (e) => {
    console.log(e.target.value)
  }
  handleClearInput = () => {

  }
  render () {
    const {size, select, selectOptions, selectProps, onSearch} = this.props
    const {clearVisible} = this.state
    return (
      <Input.Group compact size={size} className={styles.search} >
        {select && <Select size={size} {...selectProps}>
          {selectOptions.map((item, key) => <Select.Option value={item.value} key={key}>{item.name || item.value}</Select.Option>)}
        </Select>}
        <Input size={size} onChange={this.handleInputChange} />
        <Button size={size} type='primary' onClick={this.handleSearch}>搜索</Button>
        {clearVisible && <Icon type='cross' onClick={this.handleClearInput} />}
      </Input.Group>
    )
  }
}

export default Search
