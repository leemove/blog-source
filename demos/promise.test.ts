import mPromise from './promise'

const promise = new mPromise(function (res, rej) {
    res(1)
})

promise.then((res) => {
    console.log(res)
    return new mPromise(function (res, rej) {
        setTimeout(() => {
            res(123)
        }, 1000);
    })
}, err => console.log(err))