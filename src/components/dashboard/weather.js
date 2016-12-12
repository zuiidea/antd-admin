import React, {PropTypes} from 'react'
import {Icon} from 'antd'
import styles from './weather.less'
import {classnames, request} from '../../utils'


const Weather = React.createClass({
  componentDidMount() {
    this.fetch()
  },
  fetch() {
    request('http://api.map.baidu.com/telematics/v3/weather?location=成都&output=json&ak=33MHEPwOLqG8YwynptbWCCFSqry9IEYb',{
      method:'get',
      dataType:'JSON',
      success: function (res) {
        console.log(res)
      }
    })
  },
  render() {
    return <div className={styles.weather}>
      天气
    </div>
  }
})

export default Weather
