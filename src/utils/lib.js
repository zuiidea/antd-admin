import config from 'config'
import Logger from './logger'
import reqwest from 'reqwest'

function ajax(data){

  if(config.debug && data.url.indexOf('http')<0){
    setTimeout(function(){
      if(data.url==config.user.info){
        if(localStorage.getItem("username")&&localStorage.getItem("username")=="guest"&&
          localStorage.getItem("password")&&localStorage.getItem("password")=='guest'){
            data.success({
              message:'登录成功',
              isSuccess:true,
              userName:"guest"
            })
        }else {
          data.success({
            message:'获取信息成功',
            isSuccess:false,
            userName:"guest"
          })
        }

      }else if (data.url==config.user.signIn) {
        if(data.complete){
          data.complete()
        }
        if(data.data.username=='guest'&&data.data.password=='guest'){
          localStorage.setItem("username","guest")
          localStorage.setItem("password","guest")
          data.success({
            message:'登录成功',
            isSuccess:true,
            userName:"guest"
          })
        }else {
          data.success({
            message:'密码错误',
            isSuccess:false
          })
        }
      }else if (data.url==config.user.signOut) {
        localStorage.removeItem("username")
        localStorage.removeItem("password")
        location.reload()
      }
    },500)
  }else {
    reqwest(data)
  }
}

module.exports = {
  config,
  ajax,
  Logger
}
