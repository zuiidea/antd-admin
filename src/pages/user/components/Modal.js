import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal, Cascader } from 'antd'
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
class UserModal extends PureComponent {
  handleOk = () => {
    const { item = {}, onOk } = this.props
    const [form] = Form.useForm()
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
    const { item = {}, onOk, form, ...modalProps } = this.props
    const { getFieldDecorator } = form

    return (
      <Modal {...modalProps} onOk={this.handleOk}>
        <Form initialValues={{ ...item, address:item.address && item.address.split(' ') , }} layout="horizontal">
          <FormItem name='name' rules={{required: true}}
            label={i18n.t`Name`} hasFeedback {...formItemLayout}>
            <Input />
          </FormItem>
          <FormItem name='nickName' rules={{required: true}} 
            label={i18n.t`NickName`} hasFeedback {...formItemLayout}>
            <Input />
          </FormItem>
          <FormItem name='isMale' rules={{required: true}}
            label={i18n.t`Gender`} hasFeedback {...formItemLayout}>
              <Radio.Group>
                <Radio value>
                  <Trans>Male</Trans>
                </Radio>
                <Radio value={false}>
                  <Trans>Female</Trans>
                </Radio>
              </Radio.Group>
          </FormItem>
          <FormItem name='age' label={i18n.t`Age`} hasFeedback {...formItemLayout}>
            <InputNumber min={18} max={100} />
          </FormItem>
          <FormItem name='phone' rules={{required: true,pattern: /^1[34578]\d{9}$/,message: i18n.t`The input is not valid phone!`,}}
            label={i18n.t`Phone`} hasFeedback {...formItemLayout}>
            <Input />
          </FormItem>
          <FormItem name='email' rules={{ required: true, pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/, message: i18n.t`The input is not valid E-mail!`, }}
            label={i18n.t`Email`} hasFeedback {...formItemLayout}>
            <Input />
          </FormItem>
          <FormItem name='address' rules={{ required: true, }}
            label={i18n.t`Address`} hasFeedback {...formItemLayout}>
              <Cascader
                style={{ width: '100%' }}
                options={city}
                placeholder={i18n.t`Pick an address`}
              />
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
