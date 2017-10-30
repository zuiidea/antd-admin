import React from 'react'
import ReactEcharts from 'echarts-for-react'

require('echarts-liquidfill')

const LiquidfillComponent = React.createClass({
  propTypes: {
  },
  getOption () {
    let option = {
      series: [{
        type: 'liquidFill',
        data: [0.6],
      }],
    }
    return option
  },
  render () {
    return (
      <div className="examples">
        <div className="parent">
          <label> render a Liquidfill chart: </label>
          <ReactEcharts
            option={this.getOption()}
            style={{ height: '400px', width: '100%' }}
            className="react_for_echarts"
          />
        </div>
      </div>
    )
  },
})

export default LiquidfillComponent
