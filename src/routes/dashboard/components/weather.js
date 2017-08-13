import React from 'react'
import PropTypes from 'prop-types'
import { Spin } from 'antd'
import styles from './weather.less'

function Weather ({ city, icon, dateTime, temperature, name, loading }) {
  return (
    <Spin spinning={loading}>
      <div className={styles.weather}>
        <div className={styles.left}>
          <div className={styles.icon}
            style={{
              backgroundImage: `url(${icon})`,
            }}
          />
          <p>{name}</p>
        </div>
        <div className={styles.right}>
          <h1 className={styles.temperature}>{`${temperature}°`}</h1>
          <p className={styles.description}>{city},{dateTime}</p>
        </div>
      </div>
    </Spin>)
}

Weather.propTypes = {
  city: PropTypes.string,
  icon: PropTypes.string,
  dateTime: PropTypes.string,
  temperature: PropTypes.string,
  name: PropTypes.string,
  loading: PropTypes.bool,
}

export default Weather
