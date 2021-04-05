import React from 'react'
import PropTypes from 'prop-types'
import styles from './FilterItem.less'

const FilterItem = ({ label = '', children }) => {
  const labelArray = label.split('')
  return (
    <div className={styles.filterItem}>
      {labelArray.length > 0 && (
        <div className={styles.labelWrap}>
          {labelArray.map((item, index) => (
            <span className="labelText" key={index}>
              {item}
            </span>
          ))}
        </div>
      )}
      <div className={styles.item}>{children}</div>
    </div>
  )
}

FilterItem.propTypes = {
  label: PropTypes.string,
  children: PropTypes.element.isRequired,
}

export default FilterItem
