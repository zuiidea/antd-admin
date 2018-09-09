import React from 'react'
import ReactEcharts from 'echarts-for-react'

require('echarts/map/js/china.js')

class MapChartComponent extends React.Component {
  constructor() {
    super()
    this.timeTicket = null
    const randomData = () => {
      return Math.round(Math.random() * 1000)
    }
    const option = {
      title: {
        text: 'iphone销量',
        subtext: '纯属虚构',
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: ['iphone3', 'iphone4', 'iphone5'],
      },
      visualMap: {
        min: 0,
        max: 2500,
        left: 'left',
        top: 'bottom',
        text: ['高', '低'], // 文本，默认为数值文本
        calculable: true,
      },
      toolbox: {
        show: true,
        orient: 'vertical',
        left: 'right',
        top: 'center',
        feature: {
          dataView: { readOnly: false },
          restore: {},
          saveAsImage: {},
        },
      },
      series: [
        {
          name: 'iphone3',
          type: 'map',
          mapType: 'china',
          roam: false,
          label: {
            normal: {
              show: true,
            },
            emphasis: {
              show: true,
            },
          },
          data: [
            { name: '北京', value: randomData() },
            { name: '天津', value: randomData() },
            { name: '上海', value: randomData() },
            { name: '重庆', value: randomData() },
            { name: '河北', value: randomData() },
            { name: '河南', value: randomData() },
            { name: '云南', value: randomData() },
            { name: '辽宁', value: randomData() },
            { name: '黑龙江', value: randomData() },
            { name: '湖南', value: randomData() },
            { name: '安徽', value: randomData() },
            { name: '山东', value: randomData() },
            { name: '新疆', value: randomData() },
            { name: '江苏', value: randomData() },
            { name: '浙江', value: randomData() },
            { name: '江西', value: randomData() },
            { name: '湖北', value: randomData() },
            { name: '广西', value: randomData() },
            { name: '甘肃', value: randomData() },
            { name: '山西', value: randomData() },
            { name: '内蒙古', value: randomData() },
            { name: '陕西', value: randomData() },
            { name: '吉林', value: randomData() },
            { name: '福建', value: randomData() },
            { name: '贵州', value: randomData() },
            { name: '广东', value: randomData() },
            { name: '青海', value: randomData() },
            { name: '西藏', value: randomData() },
            { name: '四川', value: randomData() },
            { name: '宁夏', value: randomData() },
            { name: '海南', value: randomData() },
            { name: '台湾', value: randomData() },
            { name: '香港', value: randomData() },
            { name: '澳门', value: randomData() },
          ],
        },
        {
          name: 'iphone4',
          type: 'map',
          mapType: 'china',
          label: {
            normal: {
              show: true,
            },
            emphasis: {
              show: true,
            },
          },
          data: [
            { name: '北京', value: randomData() },
            { name: '天津', value: randomData() },
            { name: '上海', value: randomData() },
            { name: '重庆', value: randomData() },
            { name: '河北', value: randomData() },
            { name: '安徽', value: randomData() },
            { name: '新疆', value: randomData() },
            { name: '浙江', value: randomData() },
            { name: '江西', value: randomData() },
            { name: '山西', value: randomData() },
            { name: '内蒙古', value: randomData() },
            { name: '吉林', value: randomData() },
            { name: '福建', value: randomData() },
            { name: '广东', value: randomData() },
            { name: '西藏', value: randomData() },
            { name: '四川', value: randomData() },
            { name: '宁夏', value: randomData() },
            { name: '香港', value: randomData() },
            { name: '澳门', value: randomData() },
          ],
        },
        {
          name: 'iphone5',
          type: 'map',
          mapType: 'china',
          label: {
            normal: {
              show: true,
            },
            emphasis: {
              show: true,
            },
          },
          data: [
            { name: '北京', value: randomData() },
            { name: '天津', value: randomData() },
            { name: '上海', value: randomData() },
            { name: '广东', value: randomData() },
            { name: '台湾', value: randomData() },
            { name: '香港', value: randomData() },
            { name: '澳门', value: randomData() },
          ],
        },
      ],
    }
    this.state = {
      option,
    }
  }

  componentDidMount() {
    if (this.timeTicket) {
      clearInterval(this.timeTicket)
    }
    this.timeTicket = setInterval(() => {
      const { option } = this.state
      const r = new Date().getSeconds()
      option.title.text = `iphone销量${r}`
      option.series[0].name = `iphone销量${r}`
      option.legend.data[0] = `iphone销量${r}`
      this.setState({ option })
    }, 1000)
  }

  componentWillUnmount() {
    if (this.timeTicket) {
      clearInterval(this.timeTicket)
    }
  }

  render() {
    let code =
      "require('echarts/map/js/china.js'); \n" +
      '<ReactEcharts \n' +
      '    option={this.state.option || {}} \n' +
      "    style={{height: '350px', width: '100%'}}  \n" +
      "    className='react_for_echarts' />"
    return (
      <div className="examples">
        <div className="parent">
          <label>
            {' '}
            render a china map. <strong>MAP charts</strong>:{' '}
          </label>
          <ReactEcharts
            option={this.state.option}
            style={{ height: '500px', width: '100%' }}
            className="react_for_echarts"
          />
          <label> code below: </label>
          <pre>
            <code>{code}</code>
          </pre>
        </div>
      </div>
    )
  }
}

export default MapChartComponent
