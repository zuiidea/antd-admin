import React from 'react'
import ReactDOM from 'react-dom'
import { ajax, config, Logger } from '../../utils/lib'
import { Icon, message, Button, Row, Col, Form, Input, Select } from 'antd'
import './signIn.less'

const FormItem = Form.Item
const logger = Logger.getLogger('SignIn')

let SignIn = React.createClass({
  getInitialState() {
    return {
      loading: false,
    }
  },
  handleSubmit(e) {
    const _this = this
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((errors, values) => {
      if (!!errors) {
        return
      }
      _this.setState({ loading: true })
      ajax.post(`${config.getAPIPath()}${config.login.validate}`)
      .type('form').send(values).end((err, res) => {
        _this.setState({ loading: false })
        if (ajax.isSuccess(res)) {
          if (this.props.loginSuccess) {
            this.props.loginSuccess(res.body.data, true)
          } else {
            message.info(`登录成功, 用户名: ${res.body.data}`)
          }
        } else {
          message.error(`登录失败: ${res.body.message}, 请联系管理员`)
        }
      })
    })
  },
  render() {
    const { getFieldProps } = this.props.form
    const username = getFieldProps('username', {
      rules: [
        {
          required: true,
          message: '不能为空',
        },
      ],
    })
    const password = getFieldProps('password', {
      rules: [
        {
          required: true,
          message: '不能为空',
        },
      ],
    })
    return (
      <div className="signIn-from">
        <div className="logo mb">
          <img src="https://t.alipayobjects.com/images/rmsweb/T1B9hfXcdvXXXXXXXX.svg" />
          <span>Ant Design</span>
        </div>
        <form horizontal onSubmit={this.handleSubmit} form={this.props.form}>
          <FormItem hasFeedback>
            <Input {...username} size="large" placeholder="账户" />
          </FormItem>
          <FormItem hasFeedback>
            <Input {...password} size="large" type="password" placeholder="密码" />
          </FormItem>
          <Row className="self-modal-footer">
           <Button type="primary" size="large" onClick={this.handleSubmit} loading={this.state.loading}>
             登录
           </Button>
          </Row>
          <p style={{color:'#ccc',textAlign:'center'}} className='m-y-sm'>
            <span className='mr'>账号：guest</span>
            <span>密码：guest</span>
          </p>
        </form>
      </div>
    )
  },
})

SignIn = Form.create()(SignIn)

module.exports = SignIn
