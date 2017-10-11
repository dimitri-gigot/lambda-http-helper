module.exports = lambdaHttp
lambdaHttp.res = res
lambdaHttp.req = req

////////////////////////////////////////////////////////////////////////////////
// wrapper
////////////////////////////////////////////////////////////////////////////////
function lambdaHttp(cb){
  return (event, context, callback) => {
    const request = req(event)
    const response = (opt) => (data) => res(opt, callback)(data)
    if(cb && typeof cb === 'function') cb(request, response)
  }
}


////////////////////////////////////////////////////////////////////////////////
// response function
////////////////////////////////////////////////////////////////////////////////
function res(opts, callback){
  let r = {
   statusCode: opts.status || 200,
   headers: {
     'Content-type': getResponseType(opts.type||'json')
   }
 }

 if(opts.headers){
   const keys = Object.keys(opts.headers)
   if(keys.length){
     keys.forEach((key) => {
       r.headers[key] = opts.headers[key]
     })
   }
 }

 if(opts.cors) r.headers['Access-Control-Allow-Origin'] = '*'

  return (data) => {
    r.body = opts.type === 'json' || !opts.type ? JSON.stringify(data) : data
    callback(null,r)
  }
}

////////////////////////////////////////////////////////////////////////////////
// usefull res function
////////////////////////////////////////////////////////////////////////////////
function getResponseType(type){
  return ({
    'json' : 'application/json; charset=utf-8',
    'html' : 'text/html; charset=utf-8'
  })[type] || type
}

////////////////////////////////////////////////////////////////////////////////
// request method
////////////////////////////////////////////////////////////////////////////////
function req(event){
  return {
    query : event.queryStringParameters || {},
    param : event.pathParameters || {},
    body : getBodyAsJson(event.body)
  }
}

////////////////////////////////////////////////////////////////////////////////
// usefull req function
////////////////////////////////////////////////////////////////////////////////
function getBodyAsJson(raw){
  let body = null
  try{
    body = JSON.parse(raw)
  }catch(e){
    body = queryStringToJSON(raw)
  }
  return body || raw || {}
}

function queryStringToJSON(queryString) {
  if(queryString.indexOf('?') > -1){
    queryString = queryString.split('?')[1];
  }
  var pairs = queryString.split('&');
  var result = {};
  pairs.forEach(function(pair) {
    pair = pair.split('=');
    result[pair[0]] = decodeURIComponent(pair[1].replace(/\+/g, '%20') || '');
  });
  return result;
}
