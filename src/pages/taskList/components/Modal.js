import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Modal, Select } from 'antd'
import { t } from '@lingui/macro'
import { Option } from 'antd/es/mentions'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 14
  }
}

class TaskModal extends PureComponent {
  formRef = React.createRef()

  handleOk = () => {
    const { item = {}, onOk } = this.props

    this.formRef.current
      .validateFields()
      .then((values) => {
        const data = {
          ...values,
          key: item.key
        }
        data.address = data.address.join(' ')
        onOk(data)
      })
      .catch((errorInfo) => {
        console.log(errorInfo)
      })
  }

  render() {
    const { onOk, form, ...modalProps } = this.props

    return (
      <Modal {...modalProps} onOk={this.handleOk}>
        <Form ref={this.formRef} name="control-ref" layout="horizontal">
          <FormItem name="name" label={t`Task Name`} rules={[{ required: true }]} hasFeedback {...formItemLayout}>
            <Input placeholder="查看PHP版本" />
          </FormItem>
          <FormItem
            name="description"
            rules={[{ required: true }]}
            label={t`Description`}
            hasFeedback
            {...formItemLayout}
          >
            <Input placeholder="这是一条【查看PHP版本号】的命令" />
          </FormItem>
          <FormItem name="command" label="命令行" rules={[{ required: true }]} hasFeedback {...formItemLayout}>
            <Input placeholder="php -v" />
          </FormItem>
          <FormItem
            name="frequency"
            label="频率"
            rules={[{ required: true, message: '扩展字段示例：{count:3}' }]}
            hasFeedback
            {...formItemLayout}
          >
            <Input
              addonBefore={
                <Select placeholder="模式" defaultValue="1">
                  <Option value="1">模式1</Option>
                  <Option value="2">模式2</Option>
                </Select>
              }
              placeholder="扩展字段示例：{count:3}"
              style={{ width: '100%' }}
            />
          </FormItem>

          <Form.Item
            label="时间调度"
            rules={[{ required: true }]}
            style={{ marginBottom: 0 }}
            hasFeedback
            {...formItemLayout}
          >
            <Form.Item
              name="timeout"
              label={'超时时间'}
              rules={[{ required: true }]}
              style={{ display: 'inline-block', width: 'calc(32% - 8px)' }}
            >
              <InputNumber placeholder="单位：秒" defaultValue={180} min={10} max={10000} />
            </Form.Item>
            <Form.Item
              name="retry_times"
              label={'重试时间'}
              rules={[{ required: true }]}
              style={{ display: 'inline-block', width: 'calc(32% - 8px)', margin: '0 8px' }}
            >
              <InputNumber placeholder="单位：秒" defaultValue={180} min={10} max={10000} />
            </Form.Item>
            <Form.Item
              name="retry_interval"
              label={'重试间隔'}
              rules={[{ required: true }]}
              style={{ display: 'inline-block', width: 'calc(32% - 8px)', margin: '0 8px' }}
            >
              <InputNumber placeholder="单位：秒" defaultValue={3} min={1} max={10} />
            </Form.Item>
          </Form.Item>
          <FormItem
            name="maximum_parallel_runnable_num"
            label="单节点最大并行"
            rules={[{ required: true }]}
            hasFeedback
            {...formItemLayout}
          >
            <InputNumber defaultValue={5} min={1} />
          </FormItem>
          <FormItem name="tag" label="任务标签" hasFeedback {...formItemLayout}>
            <Select
              mode="multiple"
              allowClear
              style={{ width: '100%' }}
              placeholder="Please select"
              defaultValue={['a10', 'c12']}
            >
              <Option key={1}>{'标签1'}</Option>
              <Option key={2}>{'标签2'}</Option>
              <Option key={3}>{'标签3'}</Option>
              <Option key={4}>{'标签4'}</Option>
              <Option key={5}>{'标签5'}</Option>
            </Select>
          </FormItem>
          <FormItem
            name="bind_id"
            rules={[
              {
                required: true
              }
            ]}
            label="组ID"
            hasFeedback
            {...formItemLayout}
          >
            <Select placeholder={'请在【任务组管理】中维护'}>
              <Option value="1">前端组</Option>
              <Option value="2">终端组</Option>
              <Option value="3">SAP端组</Option>
            </Select>
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

TaskModal.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func
}

export default TaskModal
