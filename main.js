//实现双向绑定
//发布订阅模式
function Dep() {
    this.subs = []
}
Dep.prototype.addSub = function (sub) {
    this.subs.push(sub)
}
Dep.prototype.notify = function () {
    this.subs.forEach(sub => { sub.update() })
}

//模拟vue操作 
function Vue(options = {}) {
    this.$options = options
    this._data = this.$options.data
    new Observer(this._data)
    for (const key in this._data) {
        Object.defineProperty(this, key, {
            enumerable: true,
            get() {
                return this._data[key]
            },
            set(newVal) {
                this._data[key] = newVal
            }
        })
    }
    new compile(this.$options.el, this)

}

function compile(el, vm) { //#app  vue实例
    vm.$el = document.querySelector(el)  //dom
    const fragment = document.createDocumentFragment() //虚拟dom
    let child = null
    while (child = vm.$el.firstChild) {
        fragment.appendChild(child)

    }

    replace(fragment) //替换

    vm.$el.append(fragment)  //添加到真是dom

    function replace(fragment) {
        const pattern = /\{\{(.*)\}\}/
        Array.from(fragment.childNodes).forEach(node => {
            let text = node.textContent
            if (node.nodeType === 3 && pattern.test(text)) {
                const key = RegExp.$1.trim()
                new Watcher(vm, key, (newVal) => {
                    node.textContent = text.replace(pattern, newVal)
                })
                node.textContent = text.replace(pattern, vm[key])


            }
            if (node.childNodes && node.childNodes.length) {
                replace(node)
            }
        })
    }
}

function Observer(data) {
    const Dep = new Dep()
    for (var key in data) {
        let val = data[key]  //必须用let 形成块级作用域  保证val是当时那一个val
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
                Dep.notify()
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


