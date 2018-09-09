import React from 'react'
import PropTypes from 'prop-types'

import SimpleChartComponent from './SimpleChartComponent'
import ChartWithEventComponent from './ChartWithEventComponent'
import ThemeChartComponent from './ThemeChartComponent'
import ChartShowLoadingComponent from './ChartShowLoadingComponent'
import ChartAPIComponent from './ChartAPIComponent'
import DynamicChartComponent from './DynamicChartComponent'
import MapChartComponent from './MapChartComponent'

// v1.2.0 add 7 demo.
import AirportCoordComponent from './AirportCoordComponent'
import CalendarComponent from './CalendarComponent'
import GaugeComponent from './GaugeComponent'
import GCalendarComponent from './GCalendarComponent'
import GraphComponent from './GraphComponent'
import LunarCalendarComponent from './LunarCalendarComponent'
import TreemapComponent from './TreemapComponent'
import LiquidfillComponent from './LiquidfillComponent'
import BubbleGradientComponent from './BubbleGradientComponent'
import TransparentBar3DComPonent from './TransparentBar3DComPonent'

const EchartsComponent = ({ type }) => {
  if (type === 'simple') return <SimpleChartComponent />
  if (type === 'loading') return <ChartShowLoadingComponent />
  if (type === 'api') return <ChartAPIComponent />
  if (type === 'events') return <ChartWithEventComponent />
  if (type === 'theme') return <ThemeChartComponent />
  if (type === 'dynamic') return <DynamicChartComponent />
  if (type === 'map') return <MapChartComponent />
  if (type === 'airport') return <AirportCoordComponent />
  if (type === 'graph') return <GraphComponent />
  if (type === 'calendar') return <CalendarComponent />
  if (type === 'treemap') return <TreemapComponent />
  if (type === 'gauge') return <GaugeComponent />
  if (type === 'gcalendar') return <GCalendarComponent />
  if (type === 'lunar') return <LunarCalendarComponent />
  if (type === 'liquid') return <LiquidfillComponent />
  if (type === 'BubbleGradientComponent') return <BubbleGradientComponent />
  if (type === 'TransparentBar3DComPonent') return <TransparentBar3DComPonent />
  return <DynamicChartComponent />
}

EchartsComponent.propTypes = {
  type: PropTypes.string,
}

export default EchartsComponent
