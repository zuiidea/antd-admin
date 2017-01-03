import React, { PropTypes } from 'react'
import styles from './cpu.less'
import { color } from '../../utils'
import CountUp from 'react-countup'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts'

const countUpProps = {
  start: 0,
  duration: 2.75,
  useEasing: true,
  useGrouping: true,
  separator: ','
}

function Cpu (props) {
  return <div className={styles.cpu}>
    <div className={styles.number}>
      <div className={styles.item}>
        <p>usage</p>
        <p><CountUp
          end={props.usage}
          suffix='GB'
          {...countUpProps}
          /></p>
      </div>
      <div className={styles.item}>
        <p>space</p>
        <p><CountUp
          end={props.space}
          suffix='GB'
          {...countUpProps}
          /></p>
      </div>
      <div className={styles.item}>
        <p>cpu</p>
        <p><CountUp
          end={props.cpu}
          suffix='%'
          {...countUpProps}
          /></p>
      </div>
    </div>
    <ResponsiveContainer minHeight={300}>
      <LineChart data={props.data} margin={{left: -40}}>
        <XAxis dataKey='name' axisLine={{stroke: color.borderBase, strokeWidth: 1}} tickLine={false} />
        <YAxis axisLine={false} tickLine={false} />
        <CartesianGrid vertical={false} stroke={color.borderBase} strokeDasharray='3 3' />
        <Line type='monotone' connectNulls dataKey='cpu' stroke={color.blue} fill={color.blue} />
      </LineChart>
    </ResponsiveContainer>
  </div>
}

Cpu.propTypes = {
  props: PropTypes.object
}

export default Cpu
