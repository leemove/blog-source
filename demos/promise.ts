const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";


class mPromise<T> {
    status = PENDING
    private value: T
    private error: Error

    private onFulfilledCallbacks : Function[] = []
    private onRejectedCallbacks: Function[] = []
    constructor (resolver: (resolve: Function, reject: Function)=> any){
        const that = this
        try {
            resolver(resolve, reject)
        } catch (error) {
            reject(error)
        }
        function resolve(value) {
            that.value = value
            that.status = FULFILLED
            that.onFulfilledCallbacks.forEach(func => func(that.value))
        }
        function reject(error) {
            that.error = error
            that.status = REJECTED
            that.onRejectedCallbacks.forEach(func => func(that.error))
        }
    }

    then(onFulfilled: Function, onRejected: Function): mPromise<T> {
        const that = this
        let brigePromise: mPromise<T>
        if (that.status === FULFILLED) {
            brigePromise = new mPromise((resolve, reject) => {
                setTimeout(() => {
                    try {
                        let x = onFulfilled(that.value)
                        resolvePromise(brigePromise, x, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
                }, 0)
            })
        } else if(that.status === REJECTED) {
            brigePromise = new mPromise((resolve, reject) => {
                setTimeout(() => {
                    try {
                        let x = onRejected(that.error)
                        resolvePromise(brigePromise, x, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
                }, 0)
            })
        } else {
            brigePromise = new mPromise((resolve, reject) => {
                setTimeout(() => {
                    
                }, 0);
            })
        }

        return brigePromise
    }
}
function resolvePromise<T> (brigePromise: mPromise<T>, x, resolve:Function, reject: Function) {
    if (x instanceof mPromise) {
        if (x.status === PENDING) {
            // 如果返回的x是一个pending的promise,并没有什么意义,我们必须要等到x的状态不是才可以 
            x.then(y => {
                resolvePromise(brigePromise, y, resolve, reject)
            }, e => reject(e))
        } else {
            x.then(resolve, reject)
        }
    } else {
        resolve(x)
    }
}

export default mPromise