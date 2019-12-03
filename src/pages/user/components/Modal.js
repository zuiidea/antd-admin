import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Input, InputNumber, Radio, Modal, Cascader } from 'antd'
import { Form } from '@ant-design/compatible'
import '@ant-design/compatible/assets/index.css'
import { Trans, withI18n } from '@lingui/react'
import city from 'utils/city'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}
@withI18n()
@Form.create()
class UserModal extends PureComponent {
  handleOk = () => {
    const { item = {}, onOk, form } = this.props
    const { validateFields, getFieldsValue } = form

    validateFields(errors => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        key: item.key,
      }
      data.address = data.address.join(' ')
      onOk(data)
    })
  }

  render() {
    const { item = {}, onOk, form, i18n, ...modalProps } = this.props
    const { getFieldDecorator } = form

    return (
      <Modal {...modalProps} onOk={this.handleOk}>
        <Form layout="horizontal">
          <FormItem label={i18n.t`Name`} hasFeedback {...formItemLayout}>
            {getFieldDecorator('name', {
              initialValue: item.name,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label={i18n.t`NickName`} hasFeedback {...formItemLayout}>
            {getFieldDecorator('nickName', {
              initialValue: item.nickName,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label={i18n.t`Gender`} hasFeedback {...formItemLayout}>
            {getFieldDecorator('isMale', {
              initialValue: item.isMale,
              rules: [
                {
                  required: true,
                  type: 'boolean',
                },
              ],
            })(
              <Radio.Group>
                <Radio value>
                  <Trans>Male</Trans>
                </Radio>
                <Radio value={false}>
                  <Trans>Female</Trans>
                </Radio>
              </Radio.Group>
            )}
          </FormItem>
          <FormItem label={i18n.t`Age`} hasFeedback {...formItemLayout}>
            {getFieldDecorator('age', {
              initialValue: item.age,
              rules: [
                {
                  required: true,
                  type: 'number',
                },
              ],
            })(<InputNumber min={18} max={100} />)}
          </FormItem>
          <FormItem label={i18n.t`Phone`} hasFeedback {...formItemLayout}>
            {getFieldDecorator('phone', {
              initialValue: item.phone,
              rules: [
                {
                  required: true,
                  pattern: /^1[34578]\d{9}$/,
                  message: i18n.t`The input is not valid phone!`,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label={i18n.t`Email`} hasFeedback {...formItemLayout}>
            {getFieldDecorator('email', {
              initialValue: item.email,
              rules: [
                {
                  required: true,
                  pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
                  message: i18n.t`The input is not valid E-mail!`,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label={i18n.t`Address`} hasFeedback {...formItemLayout}>
            {getFieldDecorator('address', {
              initialValue: item.address && item.address.split(' '),
              rules: [
                {
                  required: true,
                },
              ],
            })(
              <Cascader
                style={{ width: '100%' }}
                options={city}
                placeholder={i18n.t`Pick an address`}
              />
            )}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

UserModal.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default UserModal
