import { message } from 'antd'

export default {
  onError(e, dispatch) {
    e.preventDefault()
    message.error(e.message)
  },
}
