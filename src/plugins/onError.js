import { message } from 'antd'

export default {
  onError (e) {
    e.preventDefault()
    message.error(e.message)
  },
}
