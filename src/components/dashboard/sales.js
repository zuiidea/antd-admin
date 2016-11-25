import React, { PropTypes } from 'react'
import { Icon } from 'antd'
import styles from './sales.less'
import {color} from '../../utils'
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts'

const data = [
      {name: '2000', Clothes: 400, Food: 240, Electronics: 240},
      {name: '2011', Clothes: 300, Food: 198, Electronics: 220},
      {name: '2012', Clothes: 200, Food: 980, Electronics: 229},
      {name: '2013', Clothes: 278, Food: 398, Electronics: 200},
      {name: '2014', Clothes: 189, Food: 480, Electronics: 281},
      {name: '2015', Clothes: 239, Food: 380, Electronics: 250},
      {name: '2016', Clothes: 349, Food: 430, Electronics: 210},
];

function Sales(props) {
  return (
    <div className={styles.sales}>
      <div className={styles.title}>Yearly Sales</div>
      <ResponsiveContainer minHeight={360}>
      <LineChart data={data}>
       <Legend  verticalAlign="top" align="right" height={36}/>
       <XAxis dataKey="name" axisLine={{stroke:color.borderBase,strokeWidth:1}}  tickLine={false}/>
       <YAxis axisLine={false} tickLine={false} />
       <CartesianGrid vertical={false} stroke={color.borderBase} strokeWidth={1} />
       <Tooltip/>
       <Line type="monotone" dataKey="Food" stroke={color.purple} strokeWidth={3} dot={{fill:color.purple}} activeDot={{r: 5,strokeWidth:0}}/>
       <Line type="monotone" dataKey="Clothes" stroke={color.red} strokeWidth={3} dot={{fill:color.red}}  activeDot={{r: 5,strokeWidth:0}}/>
       <Line type="monotone" dataKey="Electronics" stroke={color.green} strokeWidth={3}  dot={{fill:color.green}}  activeDot={{r: 5,strokeWidth:0}}/>
      </LineChart>
    </ResponsiveContainer>
    </div>
  )
}

export default Sales
