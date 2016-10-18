'use strict'

const qs = require('qs')
const fs = require('fs')
const Mock = require('mockjs')
const Ajax = require("robe-ajax")

Mock.mock(/\.json/, function (options) {
  console.log(options);
  return options
})

const mock = {};
console.log(fs);


Ajax.ajax({
    url: 'hello.json',
    dataType: 'json',
    data: {
        foo: 1,
        bar: 2,
        faz: 3
    }
}).done(function(data, status, jqXHR) {
  console.log(data)
})
