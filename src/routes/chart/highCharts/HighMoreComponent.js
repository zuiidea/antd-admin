import React from 'react'
import ReactHighcharts from 'react-highcharts'
import highchartsMore from 'highcharts-more'
import highchartsExporting from 'highcharts-exporting'

highchartsMore(ReactHighcharts.Highcharts)
highchartsExporting(ReactHighcharts.Highcharts)

const config = {
  chart: {
    polar: true,
  },
  xAxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  },
  series: [{
    data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
  }],
}

const HighMoreComponent = () => {
  return <ReactHighcharts config={config} />
}

export default HighMoreComponent
