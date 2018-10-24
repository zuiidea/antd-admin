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
  // https://uifaces.co
  const avatarList = [
    'https://randomuser.me/api/portraits/men/32.jpg',
    'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?h=350&auto=compress&cs=tinysrgb',
    'https://d3iw72m71ie81c.cloudfront.net/female-17.jpg',
    'https://randomuser.me/api/portraits/men/35.jpg',
    'https://pbs.twimg.com/profile_images/835224725815246848/jdMBCxHS.jpg',
    'https://pbs.twimg.com/profile_images/584098247641300992/N25WgvW_.png',
    'https://d3iw72m71ie81c.cloudfront.net/male-5.jpg',
    'https://images.pexels.com/photos/413723/pexels-photo-413723.jpeg?h=350&auto=compress&cs=tinysrgb',
    'https://images.pexels.com/photos/61100/pexels-photo-61100.jpeg?h=350&auto=compress&cs=tinysrgb',
    'https://randomuser.me/api/portraits/women/44.jpg',
    'https://randomuser.me/api/portraits/women/68.jpg',
    'https://randomuser.me/api/portraits/women/65.jpg',
    'https://randomuser.me/api/portraits/men/43.jpg',
    'https://tinyfac.es/data/avatars/475605E3-69C5-4D2B-8727-61B7BB8C4699-500w.jpeg',
    'https://pbs.twimg.com/profile_images/943227488292962306/teiNNAiy.jpg',
    'https://randomuser.me/api/portraits/men/46.jpg'
  ]
  return avatarList[randomNumber(0, avatarList.length - 1)]
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
