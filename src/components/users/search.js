import React, { PropTypes } from 'react'
import { Form, Input, Button, Select, Row, Col } from 'antd'
import styles from './search.less'
import SearchGroup from '../ui/search'

const search = ({
  field,
  keyword,
  onSearch,
  onAdd,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue
  }
}) => {
  // function handleSubmit (e) {
  //   e.preventDefault()
  //   validateFields((errors) => {
  //     if (errors) {
  //       return
  //     }
  //     onSearch(getFieldsValue())
  //   })
  // }

  const searchGroupProps ={
    field,
    keyword,
    size:'large',
    select:true,
    selectOptions:[{value:'姓名'},{value:'地址'}],
    selectProps:{
      defaultValue:"姓名"
    },
    onSearch:(res) => {
      console.log(res)
    }
  }

  return (
      <Row gutter={24}>
        <Col lg={8} md={12} sm={16} xs={24} style={{marginBottom:16}}>
          <SearchGroup {...searchGroupProps} />
        </Col>
        <Col lg={{offset:8,span:8}} md={12} sm={8} xs={24} style={{marginBottom:16,textAlign:'right'}}>
          <Button size='large' type='ghost' onClick={onAdd}>添加</Button>
        </Col>
      </Row>
  )
}

search.propTypes = {
  form: PropTypes.object.isRequired,
  onSearch: PropTypes.func,
  onAdd: PropTypes.func,
  field: PropTypes.string,
  keyword: PropTypes.string
}

export default Form.create()(search)
