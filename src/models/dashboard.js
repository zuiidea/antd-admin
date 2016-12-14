import {myCity,queryWeather} from '../services/dashboard'
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
      const myCityResult = yield call(myCity, {flg:0})
      const myCityData = myCityResult.query.results.json

      const result = yield call(queryWeather, {cityCode:myCityData.selectCityCode})
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
