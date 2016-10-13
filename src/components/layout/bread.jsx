import React, {PropTypes} from 'react'
import {Breadcrumb, Icon} from 'antd'
import styles from './main.less'

function Bread({location}) {
  return (
    <div className={styles.bread}>
      <Breadcrumb>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>
          <a href="">Application Center</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <a href="">Application List</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>An Application</Breadcrumb.Item>
      </Breadcrumb>
    </div>
  )
}

Bread.propTypes = {
  location: PropTypes.object
}

export default Bread
