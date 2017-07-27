import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Card, Button } from 'antd'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'
import Container from '../Container'

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  }, {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  }, {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  }, {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  }, {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  }, {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  }, {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
]

const mixData = [
  {
    name: 'Page A',
    uv: 4000,
    female: 2400,
    male: 2400,
  }, {
    name: 'Page B',
    uv: 3000,
    female: 1398,
    male: 2210,
  }, {
    name: 'Page C',
    uv: 2000,
    female: 9800,
    male: 2290,
  }, {
    name: 'Page D',
    uv: 2780,
    female: 3908,
    male: 2000,
  }, {
    name: 'Page E',
    uv: 1890,
    female: 4800,
    male: 2181,
  }, {
    name: 'Page F',
    uv: 2390,
    female: 3800,
    male: 2500,
  }, {
    name: 'Page G',
    uv: 3490,
    female: 4300,
    male: 2100,
  },
]
const colProps = {
  lg: 12,
  md: 24,
}

const SimpleBarChart = () => (
  <Container>
    <BarChart data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <XAxis dataKey="name" />
      <YAxis />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Legend />
      <Bar dataKey="pv" fill="#8884d8" />
      <Bar dataKey="uv" fill="#82ca9d" />
    </BarChart>
  </Container>
)

const StackedBarChart = () => (
  <Container>
    <BarChart data={data}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <XAxis dataKey="name" />
      <YAxis />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Legend />
      <Bar dataKey="pv" stackId="a" fill="#8884d8" />
      <Bar dataKey="uv" stackId="a" fill="#82ca9d" />
    </BarChart>
  </Container>
)

const MixBarChart = () => (
  <Container>
    <BarChart data={mixData}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <XAxis dataKey="name" />
      <YAxis />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Legend />
      <Bar dataKey="female" stackId="a" fill="#8884d8" />
      <Bar dataKey="male" stackId="a" fill="#82ca9d" />
      <Bar dataKey="uv" fill="#ffc658" />
    </BarChart>
  </Container>
)

// CustomShapeBarChart
const getPath = (x, y, width, height) => {
  return `M${x},${y + height}
        C${x + (width / 3)},${y + height} ${x + (width / 2)},${y + (height / 3)} ${x + (width / 2)}, ${y}
        C${x + (width / 2)},${y + (height / 3)} ${x + (2 * (width / 3))},${y + height} ${x + width}, ${y + height}
        Z`
}

const TriangleBar = (props) => {
  const { fill, x, y, width, height } = props
  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />
}

TriangleBar.propTypes = {
  fill: PropTypes.string,
  x: PropTypes.number,
  y: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
}

const CustomShapeBarChart = () => (
  <Container>
    <BarChart data={mixData}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <XAxis dataKey="name" />
      <YAxis />
      <CartesianGrid strokeDasharray="3 3" />
      <Bar dataKey="female" fill="#8884d8" shape={<TriangleBar />} label />
    </BarChart>
  </Container>
)

const EditorPage = () => (
  <div className="content-inner">
    <Button type="primary"
      size="large"
      style={{
        position: 'absolute',
        right: 0,
        top: -48,
      }}
    >
      <a href="http://recharts.org/#/en-US/examples/TinyBarChart" target="blank">Show More</a>
    </Button>
    <Row gutter={32}>
      <Col {...colProps}>
        <Card title="SimpleBarChart">
          <SimpleBarChart />
        </Card>
      </Col>
      <Col {...colProps}>
        <Card title="StackedBarChart">
          <StackedBarChart />
        </Card>
      </Col>
      <Col {...colProps}>
        <Card title="MixBarChart">
          <MixBarChart />
        </Card>
      </Col>
      <Col {...colProps}>
        <Card title="CustomShapeBarChart">
          <CustomShapeBarChart />
        </Card>
      </Col>
    </Row>
  </div>
)

export default EditorPage
