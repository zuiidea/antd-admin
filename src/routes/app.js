import React, { PropTypes } from 'react'
import classnames from 'classnames'
import Header from '../components/layout/header'
import Bread from '../components/layout/bread'
import Footer from '../components/layout/footer'
import Sider from '../components/layout/sider'
import styles from '../components/layout/main.less'
import '../components/layout/common.less'

function App({ children, location }) {
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

App.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object,
}

export default App
