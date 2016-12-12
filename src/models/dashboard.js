import {myCity} from '../services/dashboard'
import {parse} from 'qs'

export default {
  namespace : 'dashboard',
  state : {
    weather: {

    },
  },
  subscriptions : {
    setup({dispatch}) {
      dispatch({type: 'queryWeather'})
    }
  },
  effects : {
    *queryWeather({
      payload
    }, {call, put}) {
      const result = yield call(myCity, parse(payload))
      const data = result.query.results.json
      console.log(data)
      // if (data.success) {
      //   yield put({
      //     type: 'loginSuccess',
      //     payload: {
      //       user: {
      //         name: data.username
      //       }
      //     }
      //   })
      // } else {
      //   yield put({type: 'hideLoading'})
      // }
    },
  },
  reducers : {

  }
}
