import React, {PropTypes} from 'react'
import {Icon} from 'antd'
import styles from './weather.less'
import {classnames, request} from '../../utils'
const Ajax = require("robe-ajax")

const Weather = React.createClass({
  componentDidMount() {
    this.fetch()
  },
  fetch() {
    // Ajax.getJSON("http://query.yahooapis.com/v1/public/yql", {
    //   q: "select * from json where url=\"http://www.zuimeitianqi.com/zuimei/myCity?flg=0\"",
    //   format: "json"
    // }, function (data) {
    //   console.log(data)
    // })
  },
  render() {
    return <div className={styles.weather}>
      天气
    </div>
  }
})

export default Weather
