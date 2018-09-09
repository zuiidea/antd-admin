import React from 'react'
import { Radio } from 'antd'
import { Page } from 'components'
import ReChartsComponent from './ReChartsComponent'
import styles from './index.less'

const RadioGroup = Radio.Group

const chartList = [
  {
    label: 'lineChart',
    value: 'lineChart',
  },
  {
    label: 'barChart',
    value: 'barChart',
  },
  {
    label: 'areaChart',
    value: 'areaChart',
  },
]

class Chart extends React.Component {
  constructor() {
    super()
    this.state = {
      type: '',
    }
    this.handleRadioGroupChange = this.handleRadioGroupChange.bind(this)
  }
  handleRadioGroupChange(e) {
    this.setState({
      type: e.target.value,
    })
  }
  render() {
    return (
      <Page inner>
        <RadioGroup
          options={chartList}
          defaultValue="lineChart"
          onChange={this.handleRadioGroupChange}
        />
        <div className={styles.chart}>
          <ReChartsComponent type={this.state.type} />
        </div>
      </Page>
    )
  }
}

export default Chart
