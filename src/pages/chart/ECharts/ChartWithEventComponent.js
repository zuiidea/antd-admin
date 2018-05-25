import React from 'react'
import ReactEcharts from 'echarts-for-react'

const ChartWithEventComponent = () => {
  const onChartReady = (echart) => {
    console.log('echart is ready', echart)
  }
  const onChartLegendselectchanged = (param, echart) => {
    console.log(param, echart)
  }
  const onChartClick = (param, echart) => {
    console.log(param, echart)
  }
  const getOtion = () => {
    const option = {
      title: {
        text: '某站点用户访问来源',
        subtext: '纯属虚构',
        x: 'center',
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎'],
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: [
            { value: 335, name: '直接访问' },
            { value: 310, name: '邮件营销' },
            { value: 234, name: '联盟广告' },
            { value: 135, name: '视频广告' },
            { value: 1548, name: '搜索引擎' },
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    }
    return option
  }

  let onEvents = {
    click: onChartClick,
    legendselectchanged: onChartLegendselectchanged,
  }
  let code = 'let onEvents = {\n' +
                   "  'click': onChartClick,\n" +
                   "  'legendselectchanged': onChartLegendselectchanged\n" +
                   '}\n\n' +
                   '<ReactEcharts \n' +
                    '    option={getOtion()} \n' +
                    '    style={{height: 300}} \n' +
                    '    onChartReady={onChartReady} \n' +
                    '    onEvents={onEvents} />'

  return (
    <div className="examples">
      <div className="parent">
        <label> Chart With event <strong> onEvents </strong>: (Click the chart, and watch the console)</label>
        <ReactEcharts
          option={getOtion()}
          style={{ height: 300 }}
          onChartReady={onChartReady}
          onEvents={onEvents}
        />
        <label> code below: </label>
        <pre>
          <code>{code}</code>
        </pre>
      </div>
    </div>
  )
}

export default ChartWithEventComponent
