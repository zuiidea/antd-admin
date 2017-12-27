import React from 'react'
import { Radio } from 'antd'
import { Page } from 'components'
import EchartsComponent from './EchartsComponent'
import styles from './index.less'

const RadioGroup = Radio.Group

const chartList = [
  {
    label: 'SimpleChart',
    value: 'simple',
  },
  {
    label: 'ChartShowLoading',
    value: 'loading',
  },
  {
    label: 'ChartAPI',
    value: 'api',
  },
  {
    label: 'ChartWithEvent',
    value: 'events',
  },
  {
    label: 'ThemeChart',
    value: 'theme',
  },
  {
    label: 'DynamicChart',
    value: 'dynamic',
  },
  {
    label: 'MapChart',
    value: 'map',
  },
  {
    label: 'AirportCoord',
    value: 'airport',
  },
  {
    label: 'Graph',
    value: 'graph',
  },
  {
    label: 'Calendar',
    value: 'calendar',
  },
  {
    label: 'Treemap',
    value: 'treemap',
  },
  {
    label: 'Gauge',
    value: 'gauge',
  },
  {
    label: 'GCalendar',
    value: 'gcalendar',
  },
  {
    label: 'LunarCalendar',
    value: 'lunar',
  },
  {
    label: 'Liquidfill',
    value: 'liquid',
  },
  {
    label: 'BubbleGradient',
    value: 'BubbleGradientComponent',
  },
  {
    label: 'TransparentBar3D',
    value: 'TransparentBar3DComPonent',
  },
  {
    label: 'MoonComponent',
    value: 'MoonComponent',
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
    return (<Page inner id="EChartsMain">
      <RadioGroup options={chartList} defaultValue="dynamic" onChange={this.handleRadioGroupChange} />
      <div className={styles.chart}>
        <EchartsComponent type={this.state.type} />
      </div>
      <div style={{ pading: 24, marginTop: 24 }}>
         All demos from <a href="https://github.com/hustcc/echarts-for-react">https://github.com/hustcc/echarts-for-react</a>
      </div>
    </Page>)
  }
}


export default Chart
