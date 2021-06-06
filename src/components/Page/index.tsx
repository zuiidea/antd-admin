import React from 'react'
import classnames from 'classnames'
import Loader from '../Loader'
import styles from './index.less'

interface IPageProps {
  inner?: boolean
  loading?: boolean
  className?: string
}

const Page: React.FC = (props: IPageProps) => {
  const { className, children, loading = false, inner = false } = props
  const loadingStyle = {
    height: 'calc(100vh - 184px)',
    overflow: 'hidden',
  }

  return (
    <div
      className={classnames(className, {
        [styles.contentInner]: inner,
      })}
      style={loading ? loadingStyle : null}
    >
      {loading ? <Loader spinning /> : ''}
      {children}
    </div>
  )
}

export default Page
