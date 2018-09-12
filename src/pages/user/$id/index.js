import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import styles from './index.less'

@connect(({ userDetail }) => ({ userDetail }))
class UserDetail extends PureComponent {
  render() {
    const { userDetail } = this.props
    const { data } = userDetail
    const content = []
    for (let key in data) {
      if ({}.hasOwnProperty.call(data, key)) {
        content.push(
          <div key={key} className={styles.item}>
            <div>{key}</div>
            <div>{String(data[key])}</div>
          </div>
        )
      }
    }
    return (
      <div className="content-inner">
        <div className={styles.content}>{content}</div>
      </div>
    )
  }
}

UserDetail.propTypes = {
  userDetail: PropTypes.object,
}
