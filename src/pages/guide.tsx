import { Button, Card, Divider, Typography } from 'antd';
import { setLocale, useIntl } from 'umi';

const { Title, Paragraph, Text } = Typography;

export default function HomePage() {
  const intl = useIntl();
  return (
    <div style={{ padding: 16 }}>
      <Title level={3}>
        {intl.formatMessage({ id: 'welcome' }) || 'Welcome'}
      </Title>

      <Card style={{ marginBottom: 16 }}>
        <Paragraph>
          <Text strong>快速开始</Text>
        </Paragraph>
        <Paragraph>
          运行开发环境:
          <pre style={{ background: '#f6f8fa', padding: 8, borderRadius: 4 }}>
            npm run dev
          </pre>
        </Paragraph>
      </Card>

      <Card style={{ marginBottom: 16 }}>
        <Paragraph>
          <Text strong>添加页面</Text>
        </Paragraph>
        <Paragraph>
          在 <Text code>src/pages</Text> 下新建一个文件 (例如{' '}
          <Text code>src/pages/hello.tsx</Text>)，Umi 会自动把它注册为路由。
        </Paragraph>
        <Paragraph>
          示例页面代码:
          <pre style={{ background: '#f6f8fa', padding: 8, borderRadius: 4 }}>
            {`import React from 'react';
export default function Hello() {
  return <div style={{ padding: 16 }}>Hello 页面</div>;
}`}
          </pre>
        </Paragraph>
      </Card>

      <Card style={{ marginBottom: 16 }}>
        <Paragraph>
          <Text strong>多语言 (i18n)</Text>
        </Paragraph>
        <Paragraph>
          本项目使用 Umi 的国际化支持，翻译文件位于{' '}
          <Text code>src/locales</Text>（例如 <Text code>zh-CN.json</Text>、
          <Text code>en-US.json</Text>）。
        </Paragraph>
        <Paragraph>
          {intl.formatMessage({ id: 'guide.i18n.example' })}
        </Paragraph>
        <pre style={{ background: '#f6f8fa', padding: 8, borderRadius: 4 }}>
          {`// src/locales/zh-CN.json
{
  "welcome": "欢迎使用本项目"
}

// 页面中使用
import { useIntl } from 'umi';
const intl = useIntl();
intl.formatMessage({ id: 'welcome' });`}
        </pre>
        <Paragraph>
          {intl.formatMessage({ id: 'guide.i18n.usage' })}{' '}
          <Button size="small" onClick={() => setLocale('zh-CN', true)}>
            中文
          </Button>
          <Button
            size="small"
            style={{ marginLeft: 8 }}
            onClick={() => setLocale('en-US', true)}
          >
            English
          </Button>
        </Paragraph>
      </Card>

      <Card style={{ marginBottom: 16 }}>
        <Paragraph>
          <Text strong>引入 ECharts</Text>
        </Paragraph>
        <Paragraph>安装依赖（项目根目录）：</Paragraph>
        <pre style={{ background: '#f6f8fa', padding: 8, borderRadius: 4 }}>
          npm install echarts --save
        </pre>
        <Paragraph>在页面中使用：</Paragraph>
        <pre style={{ background: '#f6f8fa', padding: 8, borderRadius: 4 }}>
          {`import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

export default function ChartPage() {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    const chart = echarts.init(ref.current);
    chart.setOption({ xAxis: { type: 'category', data: ['a','b','c'] }, yAxis: { type: 'value' }, series: [{ data: [5,20,36], type: 'bar' }] });
    return () => chart.dispose();
  }, []);
  return <div ref={ref} style={{ width: '100%', height: 400 }} />;
}`}
        </pre>
      </Card>

      <Card style={{ marginBottom: 16 }}>
        <Paragraph>
          <Text strong>图标优化</Text>
        </Paragraph>
        <Paragraph>
          项目中的菜单图标已抽取到组件：
          <Text code>src/components/IconMap.tsx</Text>，PrimaryLayout
          已从此处引入并使用统一的 ICON_MAP。
        </Paragraph>
        <Paragraph>使用示例：</Paragraph>
        <pre style={{ background: '#f6f8fa', padding: 8, borderRadius: 4 }}>
          {`import { ICON_MAP, Icon } from '@/components/IconMap';
const icon = ICON_MAP['dashboard']; // 或者 <Icon name="dashboard" />`}
        </pre>
      </Card>

      <Card style={{ marginBottom: 16 }}>
        <Paragraph>
          <Text strong>测试（Testing）</Text>
        </Paragraph>
        <Paragraph>
          本项目使用 Jest 和 @testing-library/react
          进行单元测试。测试文件通常放在被测模块同目录，文件名以{' '}
          <Text code>.test.ts</Text> 或 <Text code>.test.tsx</Text> 结尾。
        </Paragraph>

        <Paragraph>
          运行测试命令：
          <pre style={{ background: '#f6f8fa', padding: 8, borderRadius: 4 }}>
            {`pnpm install
pnpm test
pnpm test:watch`}
          </pre>
        </Paragraph>

        <Paragraph>
          测试函数示例（放在 <Text code>src/utils</Text>）：
        </Paragraph>
        <pre style={{ background: '#f6f8fa', padding: 8, borderRadius: 4 }}>
          {`// src/utils/sum.ts
export function sum(a: number, b: number) { return a + b }

// src/utils/sum.test.ts
import { sum } from './sum'

test('sum adds numbers', () => {
  expect(sum(1, 2)).toBe(3)
})`}
        </pre>

        <Paragraph>测试组件示例（使用 @testing-library/react）：</Paragraph>
        <pre style={{ background: '#f6f8fa', padding: 8, borderRadius: 4 }}>
          {`// src/components/DropOption.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import DropOption from './DropOption'

test('clicking menu item calls callback', () => {
  const onMenuClick = jest.fn()
  render(<DropOption menuOptions={[{ key: 'one', label: 'One' }]} onMenuClick={onMenuClick} />)
  fireEvent.click(screen.getByText('One'))
  expect(onMenuClick).toHaveBeenCalledWith('one')
})`}
        </pre>

        <Paragraph>小贴士：</Paragraph>
        <ul>
          <li>
            使用 `jest.fn()` 创建 mock 回调；使用 `jest.mock()` 模拟模块。
          </li>
          <li>
            已在 <Text code>src/setupTests.ts</Text> 中引入
            `@testing-library/jest-dom`，可使用额外断言。
          </li>
          <li>需要模拟网络请求时，可 mock 全局 `fetch` 或使用 `msw`。</li>
        </ul>
      </Card>

      <Divider />
      <Paragraph type="secondary">
        更多帮助请查看项目 README 或联系维护者。
      </Paragraph>
    </div>
  );
}
