import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Row, Col, Card, Spin } from 'antd'
import { Page, ScrollBar } from 'components'
import styles from './index.less'
import store from 'store'
import { YOUR_AMAP_KEY, VERSION, } from 'utils'
import { Map } from 'react-amap';

/**
 * 定位
 */
@connect(({ app, amap, loading }) => ({
    amap,
    loading,
}))
class Amap extends PureComponent {
  render() {
    const { mapProps, } = this.props;
    return (
      <Page
        // loading={loading.models.dashboard && sales.length === 0}
        className={styles.dashboard}
      >
            <div style={{ width:'100%', height:500, }}>
                <Map
                    amapkey={YOUR_AMAP_KEY}
                    version={VERSION}
                    mapStyle='amap://styles/blue'
                    loading={<Spin />}
                />
            </div>
      </Page>
    )
  }
}

Amap.propTypes = {
    amap: PropTypes.object,
    loading: PropTypes.object,
}

export default Amap
