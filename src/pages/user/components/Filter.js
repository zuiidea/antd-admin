import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { FilterItem } from 'components'

import { Trans, withI18n } from '@lingui/react'
import { Button, Row, Col, DatePicker, Form, Input, Cascader } from 'antd'
import city from 'utils/city'

const { Search } = Input
const { RangePicker } = DatePicker

const ColProps = {
  xs: 24,
  sm: 12,
  style: {
    marginBottom: 16,
  },
}

const TwoColProps = {
  ...ColProps,
  xl: 96,
}

@withI18n()
class Filter extends Component {
  handleFields = fields => {
    const { createTime } = fields
    if (createTime.length) {
      fields.createTime = [
        moment(createTime[0]).format('YYYY-MM-DD'),
        moment(createTime[1]).format('YYYY-MM-DD'),
      ]
    }
    return fields
  }

  handleSubmit = () => {
    const { onFilterChange } = this.props
    const [form] = Form.useForm()
    const { getFieldsValue } = form

    let fields = getFieldsValue()
    fields = this.handleFields(fields)
    onFilterChange(fields)
  }

  handleReset = () => {
    const [form] = Form.useForm()
    const { getFieldsValue, setFieldsValue } = form

    const fields = getFieldsValue()
    for (let item in fields) {
      if ({}.hasOwnProperty.call(fields, item)) {
        if (fields[item] instanceof Array) {
          fields[item] = []
        } else {
          fields[item] = undefined
        }
      }
    }
    setFieldsValue(fields)
    this.handleSubmit()
  }
  handleChange = (key, values) => {
    const { form, onFilterChange } = this.props
    const { getFieldsValue } = form

    let fields = getFieldsValue()
    fields[key] = values
    fields = this.handleFields(fields)
    onFilterChange(fields)
  }

  render() {
    const { onAdd, filter, i18n } = this.props
    const [form] = Form.useForm()
    const { getFieldDecorator } = form
    const { name, address } = filter

    let initialCreateTime = []
    if (filter.createTime && filter.createTime[0]) {
      initialCreateTime[0] = moment(filter.createTime[0])
    }
    if (filter.createTime && filter.createTime[1]) {
      initialCreateTime[1] = moment(filter.createTime[1])
    }

    return (
      <Form initialValue={{ name, address, createTime: initialCreateTime }}>
      <Row gutter={24}>
        <Col {...ColProps} xl={{ span: 4 }} md={{ span: 8 }}>
          <Form.Item name = "name">
            <Search
                placeholder={i18n.t`Search Name`}
                onSearch={this.handleSubmit}
              />
          </Form.Item>
        </Col>
        <Col
          {...ColProps}
          xl={{ span: 4 }}
          md={{ span: 8 }}
          id="addressCascader"
        >
          <Form.Item name = "address">
            <Cascader
              style={{ width: '100%' }}
              options={city}
              placeholder={i18n.t`Please pick an address`}
              onChange={this.handleChange.bind(this, 'address')}
              getPopupContainer={() =>
                document.getElementById('addressCascader')
              }
            />
          </Form.Item>
        </Col>
        <Col
          {...ColProps}
          xl={{ span: 6 }}
          md={{ span: 8 }}
          sm={{ span: 12 }}
          id="createTimeRangePicker"
        >
          <FilterItem label={i18n.t`CreateTime`}>
            <Form.Item name="createTime">
              <RangePicker
                style={{ width: '100%' }}
                onChange={this.handleChange.bind(this, 'createTime')}
                getCalendarContainer={() => {
                  return document.getElementById('createTimeRangePicker')
                }}
              />
            </Form.Item>
          </FilterItem>
        </Col>
        <Col
          {...TwoColProps}
          xl={{ span: 10 }}
          md={{ span: 24 }}
          sm={{ span: 24 }}
        >
          <Row type="flex" align="middle" justify="space-between">
            <div>
              <Button
                type="primary"
                className="margin-right"
                onClick={this.handleSubmit}
              >
                <Trans>Search</Trans>
              </Button>
              <Button onClick={this.handleReset}>
                <Trans>Reset</Trans>
              </Button>
            </div>
            <Button type="ghost" onClick={onAdd}>
              <Trans>Create</Trans>
            </Button>
          </Row>
        </Col>
      </Row></Form>
    )
  }
}

Filter.propTypes = {
  onAdd: PropTypes.func,
  form: PropTypes.object,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
}

export default Filter
