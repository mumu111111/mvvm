//实现双向绑定

//发布订阅




// data数据劫持
function Observer(data) {
    for (var key in data) {
        let val = data[key]  //必须用let 形成块级作用域  保证val是每一个
        Object.defineProperty(data, key, {
            enumerable: true,
            get() {
                return val
            },
            set(newVal) {
                if (newVal == val) {
                    return
                }
                val = newVal
                dep.notify()
            }

        })
    }
}

// 数据监听  
