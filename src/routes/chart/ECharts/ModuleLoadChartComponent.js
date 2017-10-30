import React from 'react'
import ReactEcharts from 'echarts-for-react'

// require.config({
//     paths: {
//         echarts:'../node_modules/echarts',
//     }
// });

const ModuleLoadChartComponent = React.createClass({
  propTypes: {
  },
  getOtion () {
    const option = {
      title: { text: 'ECharts 入门示例' },
      tooltip: {},
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
      },
      yAxis: {},
      series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20],
      }],
    }
    return option
  },
  render () {
    let code = '<ReactEcharts \n' +
                    '    option={this.getOtion()} \n' +
                    "    style={{height: '350px', width: '100%'}}  \n" +
                    "    modules={['echarts/lib/chart/bar', 'echarts/lib/component/tooltip', 'echarts/lib/component/title']} \n" +
                    "    className='react_for_echarts' />"
    return (
      <div className="examples">
        <div className="parent">
          <label> load echarts module as you wish <strong>reduce the file size</strong>: </label>
          <ReactEcharts
            option={this.getOtion()}
            style={{ height: '350px', width: '100%' }}
            modules={['echarts/lib/chart/bar', 'echarts/lib/component/tooltip', 'echarts/lib/component/title']}
            className="react_for_echarts"
          />
          <label> code below: </label>
          <pre>
            <code>{code}</code>
          </pre>
        </div>
      </div>
    )
  },
})

export default ModuleLoadChartComponent
