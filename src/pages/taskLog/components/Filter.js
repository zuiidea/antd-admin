import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { t, Trans } from '@lingui/macro'
import { Button, Col, Form, Input, Row } from 'antd'

class Filter extends Component {
  formRef = React.createRef()

  handleFields(fields) {
    const { createTime } = fields
    if (createTime && createTime.length) {
      fields.createTime = [moment(createTime[0]).format('YYYY-MM-DD'), moment(createTime[1]).format('YYYY-MM-DD')]
    }
    return fields
  }

  handleSubmit() {
    const { onFilterChange } = this.props
    const values = this.formRef.current.getFieldsValue()
    const fields = this.handleFields(values)
    onFilterChange(fields)
  }

  handleReset() {
    const fields = this.formRef.current.getFieldsValue()
    for (const item in fields) {
      if ({}.hasOwnProperty.call(fields, item)) {
        if (fields[item] instanceof Array) {
          fields[item] = []
        } else {
          fields[item] = undefined
        }
      }
    }
    this.formRef.current.setFieldsValue(fields)
    this.handleSubmit()
  }

  render() {
    const { onAdd, filter } = this.props
    const { name, address } = filter

    const initialCreateTime = []
    if (filter.createTime && filter.createTime[0]) {
      initialCreateTime[0] = moment(filter.createTime[0])
    }
    if (filter.createTime && filter.createTime[1]) {
      initialCreateTime[1] = moment(filter.createTime[1])
    }

    return (
      <Form ref={this.formRef} name="control-ref" initialValues={{ name, address, createTime: initialCreateTime }}>
        <Row gutter={24}>
          <Col xl={{ span: 4 }} md={{ span: 8 }}>
            <Form.Item name="name">
              <Input placeholder={t`Task Name`} />
            </Form.Item>
          </Col>
          <Col xl={{ span: 4 }} md={{ span: 8 }}>
            <Form.Item name="bindId">
              <Input placeholder={t`Bind Id`} />
            </Form.Item>
          </Col>
          <Col xl={{ span: 4 }} md={{ span: 8 }}>
            <Form.Item name="taskId">
              <Input placeholder={t`Task Id`} />
            </Form.Item>
          </Col>
          <Col xl={{ span: 4 }} md={{ span: 8 }}>
            <Form.Item name="tag">
              <Input placeholder={t`Tag`} />
            </Form.Item>
          </Col>
          <Button type="primary" htmlType="submit" className="margin-right" onClick={this.handleSubmit.bind(this)}>
            <Trans>Search</Trans>
          </Button>
          <Button className="margin-right" onClick={this.handleReset.bind(this)}>
            <Trans>Reset</Trans>
          </Button>
          <Button type="ghost" onClick={onAdd}>
            <Trans>Create</Trans>
          </Button>
        </Row>
      </Form>
    )
  }
}

Filter.propTypes = {
  onAdd: PropTypes.func,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func
}

export default Filter
