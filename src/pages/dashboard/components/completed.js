import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Color } from 'utils'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import styles from './completed.less'

function Completed({ data }) {
  return (
    <div className={styles.sales}>
      <div className={styles.title}>TEAM TOTAL COMPLETED</div>
      <ResponsiveContainer minHeight={360}>
        <AreaChart data={data}>
          <Legend
            verticalAlign="top"
            content={prop => {
              const { payload } = prop
              return (
                <ul
                  className={classnames({
                    [styles.legend]: true,
                    clearfix: true,
                  })}
                >
                  {payload.map((item, key) => (
                    <li key={key}>
                      <span
                        className={styles.radiusdot}
                        style={{ background: item.color }}
                      />
                      {item.value}
                    </li>
                  ))}
                </ul>
              )
            }}
          />
          <XAxis
            dataKey="name"
            axisLine={{ stroke: Color.borderBase, strokeWidth: 1 }}
            tickLine={false}
          />
          <YAxis axisLine={false} tickLine={false} />
          <CartesianGrid
            vertical={false}
            stroke={Color.borderBase}
            strokeDasharray="3 3"
          />
          <Tooltip
            wrapperStyle={{
              border: 'none',
              boxShadow: '4px 4px 40px rgba(0, 0, 0, 0.05)',
            }}
            content={content => {
              const list = content.payload.map((item, key) => (
                <li key={key} className={styles.tipitem}>
                  <span
                    className={styles.radiusdot}
                    style={{ background: item.color }}
                  />
                  {`${item.name}:${item.value}`}
                </li>
              ))
              return (
                <div className={styles.tooltip}>
                  <p className={styles.tiptitle}>{content.label}</p>
                  {content.payload && <ul>{list}</ul>}
                </div>
              )
            }}
          />
          <Area
            type="monotone"
            dataKey="Task complete"
            stroke={Color.grass}
            fill={Color.grass}
            strokeWidth={2}
            dot={{ fill: '#fff' }}
            activeDot={{ r: 5, fill: '#fff', stroke: Color.green }}
          />
          <Area
            type="monotone"
            dataKey="Cards Complete"
            stroke={Color.sky}
            fill={Color.sky}
            strokeWidth={2}
            dot={{ fill: '#fff' }}
            activeDot={{ r: 5, fill: '#fff', stroke: Color.blue }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

Completed.propTypes = {
  data: PropTypes.array,
}

export default Completed
