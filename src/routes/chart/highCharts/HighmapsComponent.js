import React from 'react'
import ReactHighmaps from 'react-highcharts/ReactHighmaps.src'
import maps from './mapdata/europe'

const config = {
  chart: {
    spacingBottom: 20,
  },
  title: {
    text: 'Europe time zones',
  },

  legend: {
    enabled: true,
  },

  plotOptions: {
    map: {
      allAreas: false,
      joinBy: ['iso-a2', 'code'],
      dataLabels: {
        enabled: true,
        color: 'white',
        style: {
          fontWeight: 'bold',
        },
      },
      mapData: maps,
      tooltip: {
        headerFormat: '',
        pointFormat: '{point.name}: <b>{series.name}</b>',
      },

    },
  },

  series: [{
    name: 'UTC',
    data: ['IE', 'IS', 'GB', 'PT'].map((code) => {
      return { code }
    }),
  }, {
    name: 'UTC + 1',
    data: ['NO', 'SE', 'DK', 'DE', 'NL', 'BE', 'LU', 'ES', 'FR', 'PL', 'CZ', 'AT', 'CH', 'LI', 'SK', 'HU',
      'SI', 'IT', 'SM', 'HR', 'BA', 'YF', 'ME', 'AL', 'MK'].map((code) => {
      return { code }
    }),
  }],
}

const HighmapsComponent = () => {
  return <ReactHighmaps config={config} />
}
export default HighmapsComponent
