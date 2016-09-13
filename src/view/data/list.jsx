import React from 'react'
import ReactDOM from 'react-dom'
import { ajax, config, Logger } from '../../utils/lib'
import { Icon, message, Button, Row, Col, Form, Input, Select } from 'antd'
import './list.less'

const logger = Logger.getLogger('List')

let List = React.createClass({
  getInitialState: function() {
    return {
      pager:{}
    };
  },render: function() {
    return (
      <div />
    );
  }
})

module.exports = List
