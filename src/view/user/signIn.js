import React from 'react'
import ReactDOM from 'react-dom'
import { ajax, config, logger } from '../../utils/lib'
import { Icon, message, Button, Row, Col, Form, Input, Select} from 'antd'
import './signIn.less'

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {span: 8},
  wrapperCol: {span: 16}
};

let SignIn = React.createClass({
  getInitialState(){
    return {
      loading: false
    }
  },
  handleSubmit(){

  },
  render(){
    const { getFieldProps } = this.props.form;
    const username = getFieldProps('username', {
      rules: [
        {required: true, message: '不能为空'}
      ]
    });
    const password = getFieldProps('password', {
      rules: [
        {required: true, message: '不能为空'}
      ]
    });
    return (
      <div className="signIn-from">
      <Form horizontal onSubmit={this.handleSubmit} form={this.props.form}>
        <FormItem
          {...formItemLayout}
          label="账户："
          hasFeedback>
          <Input
            {...username}
            placeholder="请输入用户名"/>
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="密码："
          hasFeedback>
          <Input
            {...password}
            placeholder="请输入密码"/>
        </FormItem>
        <Row className="self-modal-footer">
         <Button type="primary" onClick={this.handleSubmit} loading={this.state.loading}>登录</Button>
        </Row>
      </Form>
      </div>
    )
  }
})

SignIn = Form.create()(SignIn)

module.exports = SignIn
