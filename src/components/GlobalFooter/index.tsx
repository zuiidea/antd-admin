import React from 'react'
import styles from './index.less'

interface LinkItem {
  key: string
  title: React.ReactNode
  href?: string
  blankTarget?: boolean
}

interface GlobalFooterProps {
  links?: LinkItem[]
  copyright?: React.ReactNode
}

const GlobalFooter: React.FC<GlobalFooterProps> = ({
  links = [],
  copyright,
}) => {
  return (
    <footer className={styles.globalFooter}>
      <div className={styles.links}>
        {links.map((link) => (
          <a
            key={link.key}
            title={link.key}
            target={link.blankTarget ? '_blank' : '_self'}
            href={link.href}
            rel="noreferrer"
          >
            {link.title}
          </a>
        ))}
      </div>
      {copyright && <div className={styles.copyright}>{copyright}</div>}
    </footer>
  )
}

export default GlobalFooter
