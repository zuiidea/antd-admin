import React, { PropTypes } from 'react'
import styles form './ico.less'

const Ico = (type) => <svg className={styles.ico} aria-hidden="true">
    <use xlink:href={`#icon-${type}`}></use>
</svg>

export default Ico
