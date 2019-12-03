import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Button, Row, Input } from 'antd'
import { GlobalFooter } from 'ant-design-pro'
import { Form } from '@ant-design/compatible'
import '@ant-design/compatible/assets/index.css'
import { GithubOutlined } from '@ant-design/icons'
import { Trans, withI18n } from '@lingui/react'
import { setLocale } from 'utils'
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

    let footerLinks = [
      {
        key: 'github',
        title: <GithubOutlined />,
        href: 'https://github.com/zuiidea/antd-admin',
        blankTarget: true,
      },
    ]

    if (config.i18n) {
      footerLinks = footerLinks.concat(
        config.i18n.languages.map(item => ({
          key: item.key,
          title: (
            <span onClick={setLocale.bind(null, item.key)}>{item.title}</span>
          ),
        }))
      )
    }

    return (
      <Fragment>
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
        <div className={styles.footer}>
          <GlobalFooter links={footerLinks} copyright={config.copyright} />
        </div>
      </Fragment>
    )
  }
}

Login.propTypes = {
  form: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default Login
