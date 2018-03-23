import React from 'react'
import ReactEcharts from 'echarts-for-react'

require('echarts-liquidfill')

const LiquidfillComponent = () => {
  const option = {
    series: [
      {
        type: 'liquidFill',
        data: [0.6],
      },
    ],
  }
  return (<div className="examples">
    <div className="parent">
      <label>
        render a Liquidfill chart:
      </label>
      <ReactEcharts option={option}
        style={{
          height: '400px',
          width: '100%',
        }}
        className="react_for_echarts"
      />
    </div>
  </div>)
}

export default LiquidfillComponent
