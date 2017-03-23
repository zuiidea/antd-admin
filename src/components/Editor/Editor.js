import React from 'react'
import { Editor } from 'react-draft-wysiwyg'
import styles from './Editor.less'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'


const DraftEditor = (props) => {
  return (<Editor toolbarClassName={styles.toolbar} wrapperClassName={styles.wrapper} editorClassName={styles.editor} {...props} />)
}

export default DraftEditor
