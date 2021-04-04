import React from 'react'
import { Button, Row } from 'antd'
import { Trans } from '@lingui/macro'
import { config } from '@/configs'
import styles from './index.less'

const Login: React.FC = () => {
  return (
    <>
      <div className={styles.form}>
        <div className={styles.logo}>
          <img alt="logo" src={config.logo} />
          <span>{config.title}</span>
          <Row>
            <Button
              type="primary"
              // onClick={this.handleOk}
              // loading={loading.effects.login}
            >
              <Trans>Sign in</Trans>
            </Button>
            <p>
              <span>
                <Trans>Username</Trans>
                ：guest
              </span>
              <span>
                <Trans>Password</Trans>
                ：guest
              </span>
            </p>
          </Row>
        </div>
      </div>
    </>
  )
}

export default Login
