/* global document */
import { Modal, message } from 'antd'
import React from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'
import styles from './layer.less'

const {
  info, success, error, warning, confirm,
} = Modal

const layer = {
  prefixCls: 'ant-layer',
  index: 1,
  info,
  success,
  error,
  warning,
  confirm,
}

layer.close = index => new Promise((resolve, reject) => {
  const { prefixCls } = layer
  let div = document.getElementById(`${prefixCls}-reference-${index}`)
  if (index === undefined) {
    const references = document.querySelectorAll(`.${prefixCls}-reference`)
    div = references[references.length - 1]
  }
  if (!div) {
    message.error('关闭失败，未找到Dom')
    return
  }
  const unmountResult = ReactDOM.unmountComponentAtNode(div)
  if (unmountResult && div.parentNode) {
    div.parentNode.removeChild(div)
    resolve(index)
  } else {
    reject(index)
  }
})

layer.closeAll = () => {
  const { prefixCls } = layer
  const references = document.querySelectorAll(`.${prefixCls}-reference`)
  let i = 0
  while (i < references.length) {
    layer.close()
    i += 1
  }
}

layer.open = (config) => {
  const props = Object.assign({}, config)
  const { content, ...modalProps } = props
  const { className, wrapClassName = '', verticalCenter = true } = modalProps
  const { prefixCls } = layer
  layer.index += 1
  const { index } = layer
  let div = document.createElement('div')
  div.id = `${prefixCls}-reference-${index}`
  div.className = `${prefixCls}-reference`
  document.body.appendChild(div)

  ReactDOM.render(<Modal
    visible
    title="Title"
    transitionName="zoom"
    maskTransitionName="fade"
    onCancel={() => {
        layer.close(index)
      }}
    onOk={() => {
        layer.close(index)
      }}
    {...modalProps}
    wrapClassName={classnames({ [styles.verticalCenter]: verticalCenter, [wrapClassName]: true })}
    className={classnames(prefixCls, className, [`${prefixCls}-${index}`])}
  >
    <div className={`${prefixCls}-body-wrapper`} style={{ maxHeight: document.body.clientHeight - 256 }}>
      {content}
    </div>
  </Modal>, div)

  return index
}

export default layer
