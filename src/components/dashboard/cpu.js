import React, {PropTypes} from 'react'
import {Icon,Table,Tag} from 'antd'
import styles from './cpu.less'
import {classnames,color} from '../../utils'
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts'

function Cpu(props) {
  return <div className={styles.cpu}>
    <div className={styles.number}>
      <div className={styles.item}>
        <p>usage</p>
        <p>{props.usage}</p>
      </div>
      <div className={styles.item}>
        <p>space</p>
        <p>{props.space}</p>
      </div>
      <div className={styles.item}>
        <p>cpu</p>
        <p>{props.cpu}</p>
      </div>
    </div>
    <ResponsiveContainer minHeight={300}>
      <LineChart data={props.data} margin={{left: -40}}>
        <XAxis dataKey="name" axisLine={{stroke:color.borderBase,strokeWidth:1}}  tickLine={false}/>
        <YAxis axisLine={false} tickLine={false} />
        <CartesianGrid vertical={false} stroke={color.borderBase} strokeDasharray="3 3" />
       <Line type="monotone" connectNulls={true} dataKey="cpu" stroke={color.blue} fill={color.blue}  />
     </LineChart>
   </ResponsiveContainer>
  </div>
}

Cpu.propTypes = {
  props: PropTypes.object
}

export default Cpu
