# 📦 lambda-http-helper

A tiny helper that provide a better api for HTTP based Lambda function (AWS)

[![npm version](https://img.shields.io/npm/v/lambda-http-helper.svg?style=flat-square)](https://www.npmjs.org/package/lambda-http-helper)
[![npm downloads](https://img.shields.io/npm/dm/lambda-http-helper.svg?style=flat-square)](http://npm-stat.com/charts.html?package=lambda-http-helper)

## Wan't to help ⁉️

This is a small project, it has already help me to write cleaner code for my ƛ **lambda** function and i think it can help the community.

If you want to help me with **code**, **test**, **documentation** or if you have any **sugestion**.
  ***Please*** contact me or feel free to send pull request.

## Installation

To start using it, just type this command in your console :

```bash
npm install lambda-http-helper
```

## Basic usage
This is the main way of using this package.

```js
const lambdaHttp = require('lambda-http-helper')

module.exports.yourLambdaFunction = lambdaHttp((req, res) => {

  const {body} = req

  res({
    type: 'json',
    cors: true,
    status: 200
  })({
    hello: body.world
  })

})
```

## Alternative usage

You can also use it in a more "*functionnal*" way.

```js
const {req, res} = require('lambda-http-helper')

module.exports.yourLambdaFunction = (event, context, callback) => {

  const {body} = req(event)

  res({
    type: 'json',
    cors: true,
    status: 200
  }, callback))({
    hello: body.world
  })

}
```

## API

`Lambda-http-helper` provide two main variables to interact with the API Gateway methods and variables

### The *req* object

This *request* object is a plain javascript object. It give you access to ***Body***, ***Param*** and ***Query*** data.

```js
const {body, params, query} = req
```

### The *res* function

This is the Response ***function***,

- It help your to "prepare" your response.
- It return a function that take the actual data as parameters.

#### JSON response example
```js
// return some json with status 200
const successResponse = res({
  status: 200, // default value
  type: 'json' // default value
})

// calling the success method to send data back to the Client
successResponse({
  hello: 'world'
})
```

#### HTML response example
```js
// return some html with status 404
const notFound = res({
  status: 404,
  type: 'html'
})

// calling the success method to send data back to the Client
const template = getNotFoundHTMLTemplate()
notFound(template)
```


## ⚠️ Disclaimer ⚠️

`Lambda-http-helper` is a tiny helper that i wrote in a long and boring flight 🛩, there is no test yet, be carefull.
