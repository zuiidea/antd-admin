import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Button, Row, Form, Input } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import config from 'utils/config'

import styles from './index.less'
const FormItem = Form.Item

@withI18n()
@connect(({ loading }) => ({ loading }))
@Form.create()
class Login extends PureComponent {
  handleOk = () => {
    const { dispatch, form } = this.props
    const { validateFieldsAndScroll } = form
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      dispatch({ type: 'login/login', payload: values })
    })
  }

  render() {
    const { loading, form, i18n } = this.props
    const { getFieldDecorator } = form

    return (
      <div className={styles.form}>
        <div className={styles.logo}>
          <img alt="logo" src={config.logoPath} />
          <span>{config.siteName}</span>
        </div>
        <form>
          <FormItem hasFeedback>
            {getFieldDecorator('username', {
              rules: [
                {
                  required: true,
                },
              ],
            })(
              <Input
                onPressEnter={this.handleOk}
                placeholder={i18n.t`Username`}
              />
            )}
          </FormItem>
          <FormItem hasFeedback>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                },
              ],
            })(
              <Input
                type="password"
                onPressEnter={this.handleOk}
                placeholder={i18n.t`Password`}
              />
            )}
          </FormItem>
          <Row>
            <Button
              type="primary"
              onClick={this.handleOk}
              loading={loading.effects.login}
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
        </form>
      </div>
    )
  }
}

Login.propTypes = {
  form: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default Login
