const Ajax = require("robe-ajax")

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {

  return Ajax.ajax({
      url: url,
      method:options.method||'get',
      data:options.data||{},
      processData:options.method=='get'?true:false,
      dataType:'JSON',
  })
  .done((data) => {
    return data
  })

}
