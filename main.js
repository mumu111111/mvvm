//实现双向绑定
//发布订阅
function Subject() {
    this.subs = []
}
Subject.prototype.addObserver = function () { }
Subject.prototype.delObserver = function () { }
Subject.prototype.notify = function () {
    this.subs.forEach(sub => { sub.update() })
}


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

// 数据监听  监听到value变化 改变页面
function Watcher(vm, key, fn) {
    this.vm = vm
    this.key = key
    this.fn - fn

}
Watcher.prototype.update = function () {
    this.fn(this.vm[this.key])
}


