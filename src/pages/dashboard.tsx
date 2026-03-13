import { Card, Col, Row, Statistic } from 'antd';
import { startTransition, useDeferredValue, useEffect, useState } from 'react';

import useIsMounted from '@/hooks/useIsMounted';
import dashboardService from '../services/dashboard';

type BrowserItem = { name: string; percent?: number };

type DashboardData = {
  cpu?: { cpu?: number; space?: number };
  sales?: unknown[];
  browser?: BrowserItem[];
};

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData>({} as DashboardData);

  const deferredData = useDeferredValue(data);

  const isMounted = useIsMounted();
  useEffect(() => {
    (async () => {
      try {
        const resp = await dashboardService.getDashboard();
        if (isMounted()) startTransition(() => setData(resp || {}));
      } catch (e) {
        // ignore for demo
      }
    })();
  }, [isMounted]);

  return (
    <div>
      <Row gutter={16}>
        <Col span={8} style={{ display: 'flex' }}>
          <Card style={{ flex: 1, minHeight: 120 }}>
            <Statistic
              title="CPU"
              value={deferredData.cpu?.cpu || 0}
              suffix="%"
            />
          </Card>
        </Col>
        <Col span={8} style={{ display: 'flex' }}>
          <Card style={{ flex: 1, minHeight: 120 }}>
            <Statistic
              title="Space"
              value={deferredData.cpu?.space || 0}
              suffix="MB"
            />
          </Card>
        </Col>
        <Col span={8} style={{ display: 'flex' }}>
          <Card style={{ flex: 1, minHeight: 120 }}>
            <Statistic
              title="Sales Points"
              value={(deferredData.sales || []).length}
            />
          </Card>
        </Col>
      </Row>

      <Card style={{ marginTop: 16 }} title="Browser Share">
        {(deferredData.browser || []).map((b) => (
          <div key={b.name} style={{ marginBottom: 8 }}>
            {b.name}: {b.percent}%
          </div>
        ))}
      </Card>
    </div>
  );
}
