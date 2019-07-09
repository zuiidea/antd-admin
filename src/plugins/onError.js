import { message } from 'antd'

export default {
  onError(e, dispatch) {
    e.preventDefault()
    if (e.message) {
      message.error(e.message)
    } else {
      /* eslint-disable */
      console.error(e)
    }
  },
}
