import React from 'react'
import ReactEcharts from 'echarts-for-react'

class ChartAPIComponent extends React.Component {
  render() {
    const option = {
      title: {
        text: '漏斗图',
        subtext: '纯属虚构',
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c}%',
      },
      toolbox: {
        feature: {
          dataView: { readOnly: false },
          restore: {},
          saveAsImage: {},
        },
      },
      legend: {
        data: ['展现', '点击', '访问', '咨询', '订单'],
      },
      series: [
        {
          name: '预期',
          type: 'funnel',
          left: '10%',
          width: '80%',
          label: {
            normal: {
              formatter: '{b}预期',
            },
            emphasis: {
              position: 'inside',
              formatter: '{b}预期: {c}%',
            },
          },
          labelLine: {
            normal: {
              show: false,
            },
          },
          itemStyle: {
            normal: {
              opacity: 0.7,
            },
          },
          data: [
            { value: 60, name: '访问' },
            { value: 40, name: '咨询' },
            { value: 20, name: '订单' },
            { value: 80, name: '点击' },
            { value: 100, name: '展现' },
          ],
        },
        {
          name: '实际',
          type: 'funnel',
          left: '10%',
          width: '80%',
          maxSize: '80%',
          label: {
            normal: {
              position: 'inside',
              formatter: '{c}%',
              textStyle: {
                color: '#fff',
              },
            },
            emphasis: {
              position: 'inside',
              formatter: '{b}实际: {c}%',
            },
          },
          itemStyle: {
            normal: {
              opacity: 0.5,
              borderColor: '#fff',
              borderWidth: 2,
            },
          },
          data: [
            { value: 30, name: '访问' },
            { value: 10, name: '咨询' },
            { value: 5, name: '订单' },
            { value: 50, name: '点击' },
            { value: 80, name: '展现' },
          ],
        },
      ],
    }

    let code =
      '<ReactEcharts ref={(e) => { this.echarts_react = e; }} \n' +
      '    option={this.getOtion()} /> \n' +
      '\n' +
      '// use echarts API: http://echarts.baidu.com/api.html#echartsInstance' +
      'this.echarts_react.getEchartsInstance().getDataURL();'
    return (
      <div className="examples">
        <div className="parent">
          <label>
            {' '}
            use echarts API With <strong> getEchartsInstance() </strong>: (the
            API will return the echarts instance, then you can use any API of
            echarts.)
          </label>
          <ReactEcharts
            ref={e => {
              this.echarts_react = e
            }}
            option={option}
          />
          <label>
            {' '}
            code below: (echarts API list see:
            http://echarts.baidu.com/api.html#echartsInstance)
          </label>
          <pre>
            <code>{code}</code>
          </pre>
        </div>
      </div>
    )
  }
}

export default ChartAPIComponent
