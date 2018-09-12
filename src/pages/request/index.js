import React from 'react'
import Mock from 'mockjs'
import { request } from 'utils'
import { apiPrefix } from 'utils/config'
import { Row, Col, Card, Select, Input, Button } from 'antd'
import api from '@/services/api'

import styles from './index.less'

const {
  loginUser,
  queryUser,
  createUser,
  updateUser,
  removeUser,
  queryUserInfo,
  queryDashboard,
  queryUserList,
} = api

const transform = string => {
  let url = apiPrefix + string
  let method = 'GET'

  const paramsArray = string.split(' ')
  if (paramsArray.length === 2) {
    method = paramsArray[0]
    url = apiPrefix + paramsArray[1]
  }
  return {
    url,
    method,
    desc: 'intercept request by mock.js',
  }
}

export const requestOptions = [
  {
    ...transform(queryUserInfo),
  },
  {
    ...transform(queryDashboard),
  },
  {
    ...transform(loginUser),
    data: {
      username: 'guest',
      password: 'guest',
    },
  },
  {
    ...transform(queryUserList),
  },
  {
    ...transform(queryUser),
    data: Mock.mock({
      id: '@id',
    }),
  },
  {
    ...transform(createUser),
    data: Mock.mock({
      name: '@cname',
      nickName: '@last',
      phone: /^1[34578]\d{9}$/,
      'age|11-99': 1,
      address: '@county(true)',
      isMale: '@boolean',
      email: '@email',
      avatar() {
        return Mock.Random.image(
          '100x100',
          Mock.Random.color(),
          '#757575',
          'png',
          this.nickName.substr(0, 1)
        )
      },
    }),
  },
  {
    ...transform(updateUser),
    data: Mock.mock({
      id: '@id',
      name: '@cname',
    }),
  },
  {
    ...transform(removeUser),
    data: Mock.mock({
      id: '@id',
    }),
  },
  {
    url: '/api/v2/test',
    desc: 'intercept request by mock.js',
    method: 'get',
  },
]

export default class RequestPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currntRequest: requestOptions[0],
      method: 'get',
      result: '',
    }
  }
  componentDidMount() {
    this.handleRequest()
  }

  handleRequest = () => {
    const { currntRequest } = this.state
    const { desc, ...requestParams } = currntRequest
    this.setState({
      ...this.state,
      result: (
        <div key="sending">
          请求中
          <br />
          url:
          {currntRequest.url}
          <br />
          method:
          {currntRequest.method}
          <br />
          params:
          {currntRequest.data ? JSON.stringify(currntRequest.data) : 'null'}
          <br />
        </div>
      ),
    })
    request({ ...requestParams }).then(data => {
      const { state } = this
      state.result = [
        this.state.result,
        <div key="complete">
          <div>请求完成</div>
          {JSON.stringify(data)}
        </div>,
      ]
      this.setState(state)
    })
  }

  handeleURLChange = value => {
    const { state } = this
    const curretUrl = value.split('?')[0]
    const curretMethod = value.split('?')[1]
    const currntItem = requestOptions.filter(item => {
      const { method = 'get' } = item
      return curretUrl === item.url && curretMethod === method
    })
    const [currntRequest] = currntItem
    state.currntRequest = currntRequest
    this.setState(state)
  }

  render() {
    const colProps = {
      lg: 12,
      md: 24,
    }
    const { result, currntRequest } = this.state
    const { method = 'get' } = currntRequest

    return (
      <div className="content-inner">
        <Row gutter={32}>
          <Col {...colProps}>
            <Card
              title="Request"
              style={{
                overflow: 'visible',
              }}
            >
              <div className={styles.option}>
                <Select
                  style={{
                    width: '100%',
                    flex: 1,
                  }}
                  defaultValue={`${method.toLocaleUpperCase()}   ${
                    requestOptions[0].url
                  }`}
                  size="large"
                  onChange={this.handeleURLChange}
                >
                  {requestOptions.map((item, index) => {
                    const m = item.method || 'get'
                    return (
                      <Select.Option key={index} value={`${item.url}?${m}`}>
                        {`${m.toLocaleUpperCase()}    `}
                        {item.url}
                      </Select.Option>
                    )
                  })}
                </Select>
                <Button
                  type="primary"
                  style={{ width: 100, marginLeft: 16 }}
                  onClick={this.handleRequest}
                >
                  发送
                </Button>
              </div>
              <div className={styles.params}>
                <div className={styles.label}>Params：</div>
                <Input
                  disabled
                  value={
                    currntRequest.data
                      ? JSON.stringify(currntRequest.data)
                      : 'null'
                  }
                  size="large"
                  style={{ width: 200 }}
                  placeholder="null"
                />
                <div style={{ flex: 1, marginLeft: 16 }}>
                  {currntRequest.desc}
                </div>
              </div>
              <div className={styles.result}>{result}</div>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}
