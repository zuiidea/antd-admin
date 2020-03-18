import React from 'react'
import { request } from 'utils'
import { apiPrefix } from 'utils/config'
import { Row, Col, Select, Input, Button, List, Tag, Checkbox } from 'antd'
import classnames from 'classnames'
import { Form } from '@ant-design/compatible'
import '@ant-design/compatible/assets/index.css'
import { CloseOutlined } from '@ant-design/icons'
import { Trans } from '@lingui/react'
import api from '@/services/api'
import { Page } from 'components'

import styles from './index.less'

const { Option } = Select
const InputGroup = Input.Group
const methods = ['POST', 'GET', 'PUT', 'PATCH', 'DELETE']

const methodTagColor = {
  GET: 'green',
  POST: 'orange',
  DELETE: 'red',
  PUT: 'geekblue',
}

const requests = Object.values(api).map(item => {
  let url = apiPrefix + item
  let method = 'GET'
  const paramsArray = item.split(' ')
  if (paramsArray.length === 2) {
    method = paramsArray[0]
    url = apiPrefix + paramsArray[1]
  }
  return {
    method,
    url,
  }
})

let uuid = 2
@Form.create()
class RequestPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      method: 'GET',
      url: '/api/v1/routes',
      keys: [1],
      result: null,
      visible: true,
    }
  }

  handleRequest = () => {
    const { method, url } = this.state

    this.props.form.validateFields((err, values) => {
      if (!err) {
        const params = {}
        if (values.key) {
          values.key.forEach((item, index) => {
            if (item && values.check[index]) {
              params[item] = values.value[index]
            }
          })
        }

        request({ method, url, data: params }).then(data => {
          this.setState({
            result: JSON.stringify(data),
          })
        })
      }
    })
  }

  handleClickListItem = ({ method, url }) => {
    this.setState({
      method,
      url,
      keys: [uuid++],
      result: null,
    })
  }

  handleInputChange = e => {
    this.setState({
      url: e.target.value,
    })
  }

  handleSelectChange = method => {
    this.setState({
      method,
    })
  }

  handleAddField = () => {
    const { keys } = this.state
    const nextKeys = keys.concat(uuid)
    uuid++
    this.setState({
      keys: nextKeys,
    })
  }

  handleRemoveField = key => {
    const { keys } = this.state
    this.setState({
      keys: keys.filter(item => item !== key),
    })
  }

  handleVisible = () => {
    this.setState({
      visible: !this.state.visible,
    })
  }

  render() {
    const { result, url, method, keys, visible } = this.state
    const { getFieldDecorator } = this.props.form

    return (
      <Page inner>
        <Row>
          <Col lg={8} md={24}>
            <List
              className={styles.requestList}
              dataSource={requests}
              renderItem={item => (
                <List.Item
                  className={classnames(styles.listItem, {
                    [styles.lstItemActive]:
                      item.method === method && item.url === url,
                  })}
                  onClick={this.handleClickListItem.bind(this, item)}
                >
                  <span style={{ width: 72 }}>
                    <Tag
                      style={{ marginRight: 8 }}
                      color={methodTagColor[item.method]}
                    >
                      {item.method}
                    </Tag>
                  </span>
                  {item.url}
                </List.Item>
              )}
            />
          </Col>
          <Col lg={16} md={24}>
            <Row type="flex" justify="space-between">
              <InputGroup compact size="large" style={{ flex: 1 }}>
                <Select
                  size="large"
                  value={method}
                  style={{ width: 100 }}
                  onChange={this.handleSelectChange}
                >
                  {methods.map(item => (
                    <Option value={item} key={item}>
                      {item}
                    </Option>
                  ))}
                </Select>
                <Input
                  value={url}
                  onChange={this.handleInputChange}
                  style={{ width: 'calc(100% - 200px)' }}
                />
                <Button
                  ghost={visible}
                  type={visible ? 'primary' : ''}
                  onClick={this.handleVisible}
                  size="large"
                >
                  <Trans>Params</Trans>
                </Button>
              </InputGroup>

              <Button
                size="large"
                type="primary"
                style={{ width: 100 }}
                onClick={this.handleRequest}
              >
                <Trans>Send</Trans>
              </Button>
            </Row>

            <div
              className={classnames(styles.paramsBlock, {
                [styles.hideParams]: !visible,
              })}
            >
              {keys.map((key, index) => (
                <Row
                  gutter={8}
                  type="flex"
                  justify="start"
                  align="middle"
                  key={key}
                >
                  <Col style={{ marginTop: 8 }}>
                    {getFieldDecorator(`check[${key}]`, {
                      initialValue: true,
                    })(<Checkbox defaultChecked />)}
                  </Col>
                  <Col style={{ marginTop: 8 }}>
                    {getFieldDecorator(`key[${key}]`)(
                      <Input placeholder="Key" />
                    )}
                  </Col>
                  <Col style={{ marginTop: 8 }}>
                    {getFieldDecorator(`value[${key}]`)(
                      <Input placeholder="Value" />
                    )}
                  </Col>
                  <Col style={{ marginTop: 8 }}>
                    <CloseOutlined
                      onClick={this.handleRemoveField.bind(this, key)}
                      style={{ cursor: 'pointer' }}
                    />
                  </Col>
                </Row>
              ))}

              <Row style={{ marginTop: 8 }}>
                <Button onClick={this.handleAddField}>
                  <Trans>Add Param</Trans>
                </Button>
              </Row>
            </div>

            <div className={styles.result}>{result}</div>
          </Col>
        </Row>
      </Page>
    )
  }
}

export default RequestPage
