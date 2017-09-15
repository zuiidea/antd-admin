import React from 'react'
import { Iconfont } from 'components'
import { Table, Row, Col, Icon } from 'antd'
import styles from './index.less'
import './emoji'

const colorfulIcons = ['boluo', 'baixiangguo', 'chengzi', 'boluomei', 'caomei', 'dayouzi', 'chelizi', 'fanqie', 'hamigua', 'ganlan',
  'juzi', 'heimei', 'huolongguo', 'hongmei', 'lizi', 'lanmei', 'mangguo', 'mihoutao', 'longyan', 'mugua', 'lizi1', 'ningmeng']

const flatIcons = ['home', 'user', 'timelimit', 'shopcart', 'message', 'remind', 'service', 'shop', 'sweep', 'express',
  'payment', 'search', 'feedback', 'pencil', 'setting', 'refund', 'delete', 'star', 'heart', 'share', 'location', 'console']

const localSVGIcons = ['vomiting', 'smirking', 'surprised', 'unamused', 'zombie', 'tired', 'tongue', 'wink']

const localRequireSVGIcons = [
  require('../../../svg/cute/congratulations.svg'),
  require('../../../svg/cute/cry.svg'),
  require('../../../svg/cute/kiss.svg'),
  require('../../../svg/cute/leisurely.svg'),
  require('../../../svg/cute/notice.svg'),
  require('../../../svg/cute/proud.svg'),
  require('../../../svg/cute/shy.svg'),
  require('../../../svg/cute/sweat.svg'),
  require('../../../svg/cute/think.svg'),
]

const IcoPage = () => (<div className="content-inner">
  <Icon type="star-oo" />
  <h2 style={{ margin: '16px 0' }}>Colorful Icon</h2>
  <ul className={styles.list}>
    {colorfulIcons.map(item => (<li key={item}>
      <Iconfont className={styles.icon} colorful type={item} />
      <span className={styles.name}>{item}</span>
    </li>))}
  </ul>
  <h2 style={{ margin: '16px 0' }}>Flat Icon</h2>
  <ul className={styles.list}>
    {flatIcons.map(item => (<li key={item}>
      <Iconfont className={styles.icon} type={item} />
      <span className={styles.name}>{item}</span>
    </li>))}
  </ul>
  <h2 style={{ margin: '16px 0' }}>Local SVG</h2>
  <ul className={styles.list}>
    {localSVGIcons.map(item => (<li key={item}>
      <Iconfont className={styles.icon} colorful type={item} />
      <span className={styles.name}>{item}</span>
    </li>))}
  </ul>
  <h2 style={{ margin: '16px 0' }}>Local Require SVG</h2>
  <ul className={styles.list}>
    {localRequireSVGIcons.map(item => (<li key={item.default.id}>
      <Iconfont className={styles.icon} colorful type={item.default.id} />
      <span className={styles.name}>{item.default.id}</span>
    </li>))}
  </ul>
  <h2 style={{ margin: '16px 0' }}>API</h2>
  <Row>
    <Col lg={18} md={24}>
      <Table
        rowKey={(record, key) => key}
        pagination={false}
        bordered
        scroll={{ x: 800 }}
        columns={[
          {
            title: 'Property',
            dataIndex: 'props',
          },
          {
            title: 'Description',
            dataIndex: 'desciption',
          },
          {
            title: 'Type',
            dataIndex: 'type',
          },
          {
            title: 'Default',
            dataIndex: 'default',
          },
        ]}
        dataSource={[
          {
            props: 'type',
            desciption: 'icon type',
            type: 'String',
            default: '-',
          },
          {
            props: 'colorful',
            desciption: "to set the SVG has 'symbol element'",
            type: 'Bool',
            default: 'false',
          }]}
      />
    </Col>
  </Row>
  <h2 style={{ margin: '16px 0' }}>Thanks</h2>
  <div style={{ margin: '16px 0', lineHeight: 2 }}>
    <p>
      <a href="http://www.iconfont.cn/user/detail?uid=116813">何阿酥</a> colorful fruit icon
      <a href="http://www.iconfont.cn/collections/detail?cid=4014" target="_blank" rel="noopener noreferrer"> http://www.iconfont.cn/collections/detail?cid=4014</a>
    </p>
    <p>
      <a href="http://www.iconfont.cn/user/detail?uid=496384">ColinXu</a> colorful &apos;tsundere&apos; emoji icon
      <a href="http://www.iconfont.cn/collections/detail?cid=4116" target="_blank" rel="noopener noreferrer"> http://www.iconfont.cn/collections/detail?cid=4116</a>
    </p>
    <p>
      <a href="http://www.iconfont.cn/user/detail?uid=116813">咕噜小莫莫</a> colorful &apos;face cute&apos; emoji icon
      <a href="http://www.iconfont.cn/collections/detail?cid=4268" target="_blank" rel="noopener noreferrer"> http://www.iconfont.cn/collections/detail?cid=4268</a>
    </p>
  </div>
</div>)

export default IcoPage
