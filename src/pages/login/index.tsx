import React from 'react'
import { Button, Row, Input, Form } from 'antd'
import { GithubOutlined } from '@ant-design/icons'
import { GlobalFooter } from '@/components'
import { Trans, t } from '@lingui/macro'
import { config, languages } from '@/configs'
import styles from './index.less'

const FormItem = Form.Item

const Login: React.FC = () => {
  const footerLinks = [
    {
      key: 'github',
      title: <GithubOutlined />,
      href: 'https://github.com/zuiidea/antd-admin',
      blankTarget: true,
    },
    ...languages.map((item) => ({
      key: item.key,
      title: <span>{item.value}</span>,
    })),
  ]

  const handleFinish = (values) => {
    console.log(values)
  }

  return (
    <>
      <div className={styles.form}>
        <div className={styles.logo}>
          <img alt="logo" src={config.logo} />
          <span>{config.title}</span>
        </div>
        <Form onFinish={handleFinish}>
          <FormItem
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
            hasFeedback
          >
            <Input placeholder={t`Username`} />
          </FormItem>
          <FormItem
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
            hasFeedback
          >
            <Input.Password placeholder={t`Password`} />
          </FormItem>
          <Row>
            <Button type="primary" htmlType="submit">
              <Trans>Sign in</Trans>
            </Button>
            <p>
              <span className="margin-right">
                <Trans>Username</Trans>
                ：guest
              </span>
              <span>
                <Trans>Password</Trans>
                ：guest
              </span>
            </p>
          </Row>
        </Form>
      </div>
      <div className={styles.footer}>
        <GlobalFooter links={footerLinks} copyright={config.copyright} />
      </div>
    </>
  )
}

export default Login
