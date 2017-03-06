import React, { PropTypes } from 'react'
import { Select, Form, Input, InputNumber, Radio, Modal } from 'antd'
import Mock from 'mockjs';
import addr from '../../utils/address_dict.js';
const FormItem = Form.Item
const Option = Select.Option;

console.log('woqu', addr);

const formItemLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 14
  }
}

const modal = ({
  visible,
  type,
  item = {},
  onOk,
  onCancel,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue
  }
}) => {
  function handleOk () {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        key: item.key
      }
      onOk(data)
    })
  }

  const modalOpts = {
    title: `${type === 'create' ? '新建设备' : '修改设备'}`,
    visible,
    onOk: handleOk,
    onCancel,
    wrapClassName: 'vertical-center-modal'
  }

  return (
    <Modal {...modalOpts}>
      <Form horizontal>
        <FormItem label='MAC：' hasFeedback {...formItemLayout}>
          {getFieldDecorator('mac', {
            initialValue: item.mac,
            rules: [
              {
                required: true,
                message: 'mac未填写'
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem label='状态：' hasFeedback {...formItemLayout}>
          {getFieldDecorator('nickName', {
            initialValue: item.nickName,
            rules: [
              {
                required: false,
                message: '暂无状态'
              }
            ]
          })(<Input disabled/>)}
        </FormItem>
        <FormItem label='联网' hasFeedback {...formItemLayout}>
          {getFieldDecorator('isNet', {
            initialValue: true,
            rules: [
              {
                required: true,
                type: 'boolean',
                message: '请选择联网状态'
              }
            ]
          })(
            <Radio.Group>
              <Radio value>是</Radio>
              <Radio value={false}>否</Radio>
            </Radio.Group>
          )}
        </FormItem>
        <FormItem label='关联屏幕数：' hasFeedback {...formItemLayout}>
          {getFieldDecorator('num', {
            initialValue: 1,
            rules: [
              {
                required: true,
                type: 'number',
                message: '数量未填写未填写'
              }
            ]
          })(<InputNumber min={1} max={100} defaultvalue={1}/>)}
        </FormItem>
        <FormItem label='场景：' hasFeedback {...formItemLayout}>
          {getFieldDecorator('scene', {
            initialValue: '影院',
            rules: [
              {
                required: true,
                message: '不能为空'
              }
            ]
          })(
            <Select style={{ width: 120 }}>
                <Option value="影院">影院</Option>
                <Option value="医院">医院</Option>
                <Option value="公交" disabled>公交</Option>
                <Option value="地铁">地铁</Option>
              </Select>
          )}
        </FormItem>
        <FormItem label='位置：' hasFeedback {...formItemLayout}>
          {getFieldDecorator('email', {
            initialValue: item.email,
            rules: [
              {
                required: true,
                message: '不能为空'
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem label='住址：' hasFeedback {...formItemLayout}>
          {getFieldDecorator('address', {
            initialValue: item.address,
            rules: [
              {
                required: true,
                message: '不能为空'
              }
            ]
          })(<Input />)}
        </FormItem>
      </Form>
    </Modal>
  )
}

modal.propTypes = {
  visible: PropTypes.any,
  form: PropTypes.object,
  item: PropTypes.object,
  onOk: PropTypes.func,
  onCancel: PropTypes.func
}

export default Form.create()(modal)
