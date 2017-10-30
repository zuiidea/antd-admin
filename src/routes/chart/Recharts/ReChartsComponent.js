import React from 'react'
import PropTypes from 'prop-types'

import AreaChartComponent from './AreaChartComponent'
import BarChartComponent from './BarChartComponent'
import LineChartComponent from './LineChartComponent'


const ReChartsComponent = ({ type }) => {
  if (type === 'areaChart') return (<AreaChartComponent />)
  if (type === 'barChart') return (<BarChartComponent />)
  return (<LineChartComponent />)
}

ReChartsComponent.propTypes = {
  type: PropTypes.string,
}

export default ReChartsComponent
