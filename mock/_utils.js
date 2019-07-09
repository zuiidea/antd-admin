/**
 * Query objects that specify keys and values in an array where all values are objects.
 * @param   {array}         array   An array where all values are objects, like [{key:1},{key:2}].
 * @param   {string}        key     The key of the object that needs to be queried.
 * @param   {string}        value   The value of the object that needs to be queried.
 * @return  {object|undefined}   Return frist object when query success.
 */
export function queryArray(array, key, value) {
  if (!Array.isArray(array)) {
    return
  }
  return array.filter(_ => _[key] === value)
}

export function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

export function randomAvatar() {
  const avatarList = [
    'photo-1549492864-2ec7d66ffb04.jpeg',
    'photo-1480535339474-e083439a320d.jpeg',
    'photo-1523419409543-a5e549c1faa8.jpeg',
    'photo-1519648023493-d82b5f8d7b8a.jpeg',
    'photo-1523307730650-594bc63f9d67.jpeg',
    'photo-1522962506050-a2f0267e4895.jpeg',
    'photo-1489779162738-f81aed9b0a25.jpeg',
    'photo-1534308143481-c55f00be8bd7.jpeg',
    'photo-1519336555923-59661f41bb45.jpeg',
    'photo-1551438632-e8c7d9a5d1b7.jpeg',
    'photo-1525879000488-bff3b1c387cf.jpeg',
    'photo-1487412720507-e7ab37603c6f.jpeg',
    'photo-1510227272981-87123e259b17.jpeg'
  ]
  return `//image.zuiidea.com/${avatarList[randomNumber(0, avatarList.length - 1)]}?imageView2/1/w/200/h/200/format/webp/q/75|imageslim`
}

export const Constant = {
  ApiPrefix: '/api/v1',
  NotFound: {
    message: 'Not Found',
    documentation_url: '',
  },
  Color: {
    green: '#64ea91',
    blue: '#8fc9fb',
    purple: '#d897eb',
    red: '#f69899',
    yellow: '#f8c82e',
    peach: '#f797d6',
    borderBase: '#e5e5e5',
    borderSplit: '#f4f4f4',
    grass: '#d6fbb5',
    sky: '#c1e0fc',
  },
}

export Mock from 'mockjs'
export qs from 'qs'
