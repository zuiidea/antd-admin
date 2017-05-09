import React from 'react'
import { Iconfont } from '../../../components'
import { Table, Row, Col, Icon } from 'antd'
import styles from './index.less'

const colorfulIcons = ['boluo', 'baixiangguo', 'chengzi', 'boluomei', 'caomei', 'dayouzi', 'chelizi', 'fanqie', 'hamigua', 'ganlan',
  'juzi', 'heimei', 'huolongguo', 'hongmei', 'lizi', 'lanmei', 'mangguo', 'mihoutao', 'longyan', 'mugua', 'lizi1', 'ningmeng']

const flatIcons = ['home', 'user', 'timelimit', 'shopcart', 'message', 'remind', 'service', 'shop', 'sweep', 'express',
  'payment', 'search', 'feedback', 'pencil', 'setting', 'refund', 'delete', 'star', 'heart', 'share', 'location', 'console']

const IcoPage = () => <div className="content-inner">
  <h2 style={{ margin: '16px 0' }}>Colorful</h2>
  <ul className={styles.list}>
    {colorfulIcons.map(item => <li key={item}>
      <Iconfont className={styles.icon} colorful type={item} />
      <span className={styles.name}>{item}</span>
    </li>)}
  </ul>
  <h2 style={{ margin: '16px 0' }}>Flat</h2>
  <ul className={styles.list}>
    {flatIcons.map(item => <li key={item}>
      <Iconfont className={styles.icon} type={item} />
      <span className={styles.name}>{item}</span>
    </li>)}
  </ul>
  <Icon type="emoji-kiss" local style={{ fontSize: 24 }} />
  <h2 style={{ margin: '16px 0' }}>Props</h2>
  <Row>
    <Col lg={18} md={24}>
      <Table
        rowKey={(record, key) => key}
        pagination={false}
        bordered
        scroll={{ x: 800 }}
        columns={[
          {
            title: '参数',
            dataIndex: 'props',
          },
          {
            title: '说明',
            dataIndex: 'desciption',
          },
          {
            title: '类型',
            dataIndex: 'type',
          },
          {
            title: '默认值',
            dataIndex: 'default',
          },
        ]}
        dataSource={[
          {
            props: 'type',
            desciption: '图标类型',
            type: 'String',
            default: '-',
          },
          {
            props: 'colorful',
            desciption: '是否是symbol类型的彩色图标',
            type: 'Bool',
            default: 'false',
          }]}
      />
    </Col>
  </Row>
  <h2 style={{ margin: '16px 0' }}>Thanks</h2>
  <p style={{ margin: '24px 0' }}>
    <a href="http://www.iconfont.cn/user/detail?uid=116813">何阿酥</a> colorful fruit icon
    <a href="http://www.iconfont.cn/collections/detail?cid=4014" target="_blank"> http://www.iconfont.cn/collections/detail?cid=4014</a>
  </p>
</div>

export default IcoPage
