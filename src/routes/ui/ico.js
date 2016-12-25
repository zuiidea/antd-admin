import React, { PropTypes } from 'react'
import {Ico} from '../../components/ui'
import styles from './ico.less'

const iconlist = ['Cherry','Cheese','Bread','Beer','Beet','Bacon','Banana','Asparagus','Apple']

const IcoPage = () => <div className="content-inner">
  <ul className={styles.list}>
    {iconlist.map ( item =><li key={item}><Ico className={styles.icon} type={item} /><span className={styles.name}>{item}</span></li>)}
  </ul>
</div>

export default IcoPage
