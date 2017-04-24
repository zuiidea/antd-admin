import { myCity, queryWeather, query } from '../services/dashboard'
import { parse } from 'qs'

// zuimei 摘自 http://www.zuimeitianqi.com/res/js/index.js
let zuimei = {
  parseActualData (actual) {
    let weather = {
      icon: `http://www.zuimeitianqi.com/res/icon/${zuimei.getIconName(actual.wea, 'big')}`,
      name: zuimei.getWeatherName(actual.wea),
      temperature: actual.tmp,
      dateTime: new Date(actual.PTm).format('MM-dd hh:mm'),
    }
    return weather
  },

  getIconName (wea, flg) {
    let myDate = new Date()
    let hour = myDate.getHours()
    let num = 0
    if (wea.indexOf('/') !== -1) {
      let weas = wea.split('/')
      if (hour < 12) {
        num = zuimei.replaceIcon(weas[0])
        if (num < 6) {
          num = `${num}_${flg}_night.png`
        } else {
          num = `${num}_${flg}.png`
        }
      } else if (hour >= 12) {
        num = zuimei.replaceIcon(weas[1])
        if (hour >= 18) {
          num = `${num}_${flg}_night.png`
        } else {
          num = `${num}_${flg}.png`
        }
      }
    } else {
      if ((hour >= 18 && hour <= 23) || (hour >= 0 && hour <= 6)) {
        num = `${num}_${flg}_night.png`
      } else {
        num = `${num}_${flg}.png`
      }
    }

    return num
  },

  replaceIcon (num) {
    if (num === 21) {
      num = 7
    } else if (num === 22) {
      num = 8
    } else if (num === 10 || num === 11 || num === 12 || num === 23 || num === 24 || num === 25) {
      num = 9
    } else if (num === 13 || num === 15 || num === 26 || num === 27 || num === 34) {
      num = 14
    } else if (num === 17 || num === 28) {
      num = 16
    } else if (num === 35) {
      num = 18
    } else if (num === 31 || num === 32 || num === 33) {
      num = 20
    } else if (num === 30) {
      num = 29
    }

    return num
  },

  getWeatherName (wea) {
    let name = ''
    if (wea.indexOf('/') !== -1) {
      let weas = wea.split('/')
      name = `${zuimei.getWeatherByCode(weas[0])}转${zuimei.getWeatherByCode(weas[1])}`
    } else {
      name = zuimei.getWeatherByCode(wea)
    }

    return name
  },

  getWeatherByCode (number) {
    let wea = ''
    let num = Number(number)
    if (num === 0) {
      wea = '晴'
    } else if (num === 1) {
      wea = '多云'
    } else if (num === 2) {
      wea = '阴'
    } else if (num === 3) {
      wea = '阵雨'
    } else if (num === 4) {
      wea = '雷阵雨'
    } else if (num === 5) {
      wea = '雷阵雨并伴有冰雹'
    } else if (num === 6) {
      wea = '雨夹雪'
    } else if (num === 7) {
      wea = '小雨'
    } else if (num === 8) {
      wea = '中雨'
    } else if (num === 9) {
      wea = '大雨'
    } else if (num === 10) {
      wea = '暴雨'
    } else if (num === 11) {
      wea = '大暴雨'
    } else if (num === 12) {
      wea = '特大暴雨'
    } else if (num === 13) {
      wea = '阵雪'
    } else if (num === 14) {
      wea = '小雪'
    } else if (num === 15) {
      wea = '中雪'
    } else if (num === 16) {
      wea = '大雪'
    } else if (num === 17) {
      wea = '暴雪'
    } else if (num === 18) {
      wea = '雾'
    } else if (num === 19) {
      wea = '冻雨'
    } else if (num === 20) {
      wea = '沙尘暴'
    } else if (num === 21) {
      wea = '小雨-中雨'
    } else if (num === 22) {
      wea = '中雨-大雨'
    } else if (num === 23) {
      wea = '大雨-暴雨'
    } else if (num === 24) {
      wea = '暴雨-大暴雨'
    } else if (num === 25) {
      wea = '大暴雨-特大暴雨'
    } else if (num === 26) {
      wea = '小雪-中雪'
    } else if (num === 27) {
      wea = '中雪-大雪'
    } else if (num === 28) {
      wea = '大雪-暴雪'
    } else if (num === 29) {
      wea = '浮沉'
    } else if (num === 30) {
      wea = '扬沙'
    } else if (num === 31) {
      wea = '强沙尘暴'
    } else if (num === 32) {
      wea = '飑'
    } else if (num === 33) {
      wea = '龙卷风'
    } else if (num === 34) {
      wea = '若高吹雪'
    } else if (num === 35) {
      wea = '轻雾'
    } else if (num === 53) {
      wea = '霾'
    } else if (num === 99) {
      wea = '未知'
    }

    return wea
  },
}

export default {
  namespace: 'dashboard',
  state: {
    weather: {
      city: '成都',
      temperature: '5',
      name: '晴',
      icon: 'http://www.zuimeitianqi.com/res/icon/0_big.png',
      dateTime: new Date().format('MM-dd hh:mm'),
    },
    sales: [],
    quote: {
      avatar: 'http://img.hb.aicdn.com/bc442cf0cc6f7940dcc567e465048d1a8d634493198c4-sPx5BR_fw236',
    },
    numbers: [],
    recentSales: [],
    comments: [],
    completed: [],
    browser: [],
    cpu: {},
    user: {
      avatar: 'http://img.hb.aicdn.com/bc442cf0cc6f7940dcc567e465048d1a8d634493198c4-sPx5BR_fw236',
    },
  },
  subscriptions: {
    setup ({ dispatch }) {
      dispatch({ type: 'query' })
      dispatch({ type: 'queryWeather' })
    },
  },
  effects: {
    *query ({
      payload,
    }, { call, put }) {
      const data = yield call(query, parse(payload))
      yield put({ type: 'queryWeather', payload: { ...data } })
    },
    *queryWeather ({
      payload,
    }, { call, put }) {
      const myCityResult = yield call(myCity, { flg: 0 })
      const result = yield call(queryWeather, { cityCode: myCityResult.selectCityCode })
      const weather = zuimei.parseActualData(result.data.actual)
      weather.city = myCityResult.selectCityName
      yield put({ type: 'queryWeatherSuccess', payload: {
        weather,
      } })
    },
  },
  reducers: {
    queryWeatherSuccess (state, action) {
      return {
        ...state,
        ...action.payload,
      }
    },
    queryWeather (state, action) {
      return {
        ...state,
        ...action.payload,
      }
    },
  },
}
