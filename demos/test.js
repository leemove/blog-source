let Promise = require("./mypromise")

let promise = new Promise(function (res, rej) {
    console.log('start')
    setTimeout(() => {
        res(new Error('测试用错误'))
    }, 0);
}).then(function () {
    console.log('出错了1')
}).then(function () {
    console.log('出错了2')
})

console.log(promise)
