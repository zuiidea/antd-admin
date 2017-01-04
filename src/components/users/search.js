import React, { PropTypes } from 'react'
import { Form, Input, Button, Select  } from 'antd'
import styles from './search.less'

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
  function handleSubmit (e) {
    e.preventDefault()
    validateFields((errors) => {
      if (errors) {
        return
      }
      onSearch(getFieldsValue())
    })
  }

  return (
    <div className={styles.normal}>
      <div style={{width:400}}>
        <Input.Group compact>
          <Select  size="large" style={{width:100}}>
            <Select.Option value='name'>名字</Select.Option>
            <Select.Option value='address'>地址</Select.Option>
          </Select>
          <Input size="large" style={{width:200}}/>
          {/* <Button size="large" type='primary'>搜索</Button> */}
        </Input.Group>
      </div>
      <div className={styles.search}>
        <Form inline>
          <Form.Item>
            {getFieldDecorator('field', {
              initialValue: field || 'name'
            })(
              <Select size="large">
                <Select.Option value='name'>名字</Select.Option>
                <Select.Option value='address'>地址</Select.Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item hasFeedback>
            {getFieldDecorator('keyword', {
              initialValue: keyword || ''
            })(<Input size="large" />)}
          </Form.Item>
          <Button type='primary' onClick={handleSubmit}>搜索</Button>
        </Form>
      </div>
      <div className={styles.create}>
        <Button size="large"  type='ghost' onClick={onAdd}>添加</Button>
      </div>
    </div>
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
