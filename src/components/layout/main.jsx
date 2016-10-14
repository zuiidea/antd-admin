import React, { PropTypes } from 'react'
import classnames from 'classnames'
import Header from './header'
import Bread from './bread'
import Footer from './footer'
import Sider from './sider'
import styles from './main.less'
import './common.less'

function Main({ children, location }) {
  return (
    <div className={styles.layout}>
      <aside className={styles.sider}>
        <Sider />
      </aside>
      <div className={styles.main}>
        <Header location={location} />
        <Bread location={location} />
        <div className={styles.container}>
          <div className={styles.content}>
            { children }
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}

Main.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object,
}

export default Main
