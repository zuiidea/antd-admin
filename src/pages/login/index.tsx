import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { history, useIntl } from 'umi';

import adminService from '@/services/admin';
import useGlobalStore from '@/store/useGlobalStore';
import config from '@/utils/config';
import styles from './index.module.less';

export default function Login() {
  const intl = useIntl();
  const [form] = Form.useForm();

  type LoginForm = { username?: string; adminname?: string; password?: string };

  const onFinish = (values: LoginForm) => {
    (async () => {
      try {
        const creds = {
          adminname: String(values.username ?? values.adminname ?? ''),
          password: String(values.password ?? ''),
        };
        await adminService.login(creds);
        message.success(intl.formatMessage({ id: 'login.success' }));
        useGlobalStore.getState().login();

        const admin = (await adminService.currentAdmin()) as
          | import('@/types/admin').Admin
          | undefined;
        if (admin) {
          useGlobalStore.getState().setCurrentUser(admin);
        }

        history.push('/dashboard');
      } catch (e: any) {
        console.error(e);
      }
    })();
  };

  return (
    <div className={styles.page}>
      <div className={styles.form}>
        <div className={styles.logo}>
          <img alt="logo" src={config.logoPath} />
          <span>{config.siteName}</span>
        </div>

        <Form
          form={form}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            name="username"
            label={intl.formatMessage({ id: 'login.username' })}
            rules={[
              {
                required: true,
                message: intl.formatMessage({ id: 'login.usernameRequired' }),
              },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              autoComplete="username"
              placeholder={intl.formatMessage({ id: 'login.username' })}
            />
          </Form.Item>

          <Form.Item
            name="password"
            label={intl.formatMessage({ id: 'login.password' })}
            rules={[
              {
                required: true,
                message: intl.formatMessage({ id: 'login.passwordRequired' }),
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              autoComplete="current-password"
              placeholder={intl.formatMessage({ id: 'login.password' })}
            />
          </Form.Item>

          <Form.Item
            noStyle
            name="remember"
            valuePropName="checked"
            className={styles.remember}
          >
            <Checkbox>{intl.formatMessage({ id: 'login.remember' })}</Checkbox>
          </Form.Item>

          <div style={{ color: 'grey' }}>
            use guest/guest or admin/admin login
          </div>

          <Button type="primary" htmlType="submit">
            {intl.formatMessage({ id: 'login.submit' })}
          </Button>
        </Form>
      </div>
    </div>
  );
}
