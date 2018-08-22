import React from 'react'
import { Radio } from 'antd'
import { Page } from 'components'
import HighChartsComponent from './HighChartsComponent'
import styles from './index.less'

const RadioGroup = Radio.Group

const chartList = [
  {
    label: 'Highstock',
    value: 'Highstock',
  },
  {
    label: 'Highmaps',
    value: 'Highmaps',
  },
  {
    label: 'HighMore',
    value: 'HighMore',
  },
]

class Chart extends React.Component {
  constructor () {
    super()
    this.state = {
      type: '',
    }
    this.handleRadioGroupChange = this.handleRadioGroupChange.bind(this)
  }
  handleRadioGroupChange (e) {
    this.setState({
      type: e.target.value,
    })
  }
  render () {
    return (<Page inner>
      <RadioGroup options={chartList} defaultValue="Highstock" onChange={this.handleRadioGroupChange} />
      <div className={styles.chart}>
        <HighChartsComponent type={this.state.type} />
      </div>
    </Page>)
  }
}


export default Chart
