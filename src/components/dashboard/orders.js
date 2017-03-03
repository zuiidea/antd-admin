import React, { PropTypes } from 'react'
import styles from './orders.less'
import { color } from '../../utils'
import { PieChart, Pie, ResponsiveContainer } from 'recharts'

function Orders (props) {
  return <div className={styles.order}>
    <ResponsiveContainer minHeight={360}>
      <PieChart width={500} height={200}>
        <Pie data={props.data?props.data.data01 : []} cx={200} cy={200} outerRadius={60} fill="#8884d8"/>
        <Pie data={props.data?props.data.data02 : []} cx={200} cy={200} innerRadius={70} outerRadius={90} fill="#82ca9d" label/>
      </PieChart>
    </ResponsiveContainer>
  </div>
}

Orders.propTypes = {
  props: PropTypes.object
}

export default Orders
