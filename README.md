# vue-twoway-data-binding

实现简单的vue双向数据绑定  
![效果图](https://github.com/BuggMaker/vue-twoway-data-binding/blob/master/resources/img/animate.gif)

## 基本原理

- 首先看原理图如下  
![MVVM框架数据双向绑定原理图](https://github.com/BuggMaker/vue-twoway-data-binding/blob/master/resources/img/data-binding.png)

- 其中主要部分及其功能(首字母大写为课实例化的类,小写为函数)
 1. MVVM即Vue对象,主要包括data和template两部分(其他暂不考虑)
 2. data对象数据模型Model,template对应视图View
 3. observe为数据劫持模块,主要实现数据的getter和setter,并为属性绑定订阅者,在属性值发生变化是通知订阅者
 4. Watcher为订阅者,通过depend将自己添加至订阅者管理模块Dep实例中,主要实现属性值变化时调用回调函数更新视图
 5. Dep为订阅者管理模块,是建立observe与Watcher的桥梁.通过notify通知所有订阅者数据发生变化
 6. compile为模板解析模块,解析'v-'指令以及模板字面量等,并为相应属性添加订阅者Watcher和回调函数
 
- 基本步骤如下
 1. Vue包括data和template两部分,分别对应Model与View
 2. 通过observe为data的每一个属性和其子属性添加`getter`和`setter`
 3. 通过Dep实例来管理订阅者,其中data的每一个属性拥有一个Dep实例(data与Dep实例为一对多的关系)
 4. 通过compile解析模板template,分析出那些是data的属性并创建Watcher实例,添加至属性对应Dep实例中
 5. 当data属性值发生变化时,即调用属性的getter时会触发Dep实例的notify方法,接着出发Watcher实例的update方法,刷新视图
 6. 当视图数据发生变化时,改变data对应属性值,继续步骤5,实现视图刷新
 
## 用法
 ```
 <div id='wu-app'>
        <input type="text" v-model='text'>
        <br>
        <label for="">Input value:{{text}}</label>
        <br>
        <input type="button" v-on:click='btnClick' value='Click Me'>
 </div>
 <script>
     window.onload = function () {
         var app = new W.Wu({
             el: '#wu-app',
             data: {
                 text: 'Hello World!'
             },
             methods: {
                 btnClick(e) {
                     this.text = 'You clicked the button!'
                 }
             }
         })
     }
 </script>
 ```
 
## 代码分析
#### 主模块:入口
```
export function Wu(options) {
  this.$options = options;
  this.$data = options.data || {};
  this.$methods = options.methods || {};
  this.$watched = options.watched;

  // 将data和methods以及computed中的属性方法代理在自己身上
  proxy(this, this.$data);
  proxy(this, this.$methods);
  
  // 初始化数据劫持
  observe(this.$data);
  // 模板解析
  compile(options.el || document.body, this);
}
```
#### 数据劫持
```
function observe(data) {
  if (!data || typeof data !== "object") return;
  Object.keys(data).forEach(function(key) {
    let val = data[key],
      dep = new Dep();
    //观察子属性
    observe(val);
    Object.defineProperty(data, key, {
      configurable: true,
      enumerable: true,
      get: function() {
        // console.log(`i get ${key}:${val}`);
        //添加订阅者
        Dep.target && dep.addSub(Dep.target);
        return val;
      },
      set: function(newVal) {
        // console.log(`i set ${key}:${val}-->${newVal}`);
        val = newVal;
        //通知所有订阅者数据变更
        dep.notify();
      }
    });
  });
}

```
#### 模板解析
```
let compileUtil = {
  elementNodeType: 1,
  textNodeType: 3,
  isDirective(attr) {
    let reg = /v-|:|@/;
    return reg.test(attr);
    return (
      attr.indexof("v-") == 0 ||
      attr.indexof(":") == 0 ||
      attr.indexof("@") == 0
    );
  },
  // 将原生节点拷贝到fragment
  node2Fragment(node) {
    let frag = document.createDocumentFragment();
    [].slice.call(node.childNodes).forEach(child => {
      frag.appendChild(child);
    });
    return frag;
  },
  // 更新回调函数
  update(node, dir, newVal, oldVal) {
    switch (dir) {
      case "model":
        node.value = typeof newVal === "undefined" ? "" : newVal;
        break;
      case "class":
        break;
      case "html":
        break;
      case "text":
        node.textContent = typeof newVal === "undefined" ? "" : newVal;
        break;
    }
  },
  // 获取属性值(当表达式为不只是key,而是一各需要运算的语句是如何处理?)
  getVMVal(vm, exp) {
    let src = vm;
    exp.split(".").forEach(k => {
      src = src[k];
    });
    return src;
  },
  // 设置属性值
  setVMVal(vm, exp, val) {
    let src = vm,
      keys = exp.split(".");
    for (let i = 0; i < keys.length; i++) {
      const k = keys[i];
      if (i < keys.length - 1) {
        src = src[k];
      } else {
        src[k] = val;
      }
    }
    return src;
  },
  // 解析节点
  compileNode(node, vm) {
    [].slice.call(node.childNodes).forEach(child => {
      switch (child.nodeType) {
        // 节点
        case compileUtil.elementNodeType:
          let attrs = child.attributes;
          [].slice.call(attrs).forEach(attr => {
            // 判断是否为内部指令
            let attrName = attr.name;
            if (this.isDirective(attrName)) {
              let dir = attrName.split(/v-|:|@/).join(""),
                exp = attr.value;
              // 事件
              if (dir.substring(0, 2) === "on") {
                child.addEventListener(
                  dir.substring(2),
                  //注意 this 指向
                  this.getVMVal(vm, exp).bind(vm)
                );
              } else {
                // 其他指令model bind text等
                this.update(child, dir, this.getVMVal(vm, exp));
                // 订阅者
                new Watcher(vm, exp, (newVal, oldVal) => {
                  // 更新回调
                  this.update(child, dir, newVal, oldVal);
                });
                // model
                if (dir === "model") {
                  let oldVal = this.getVMVal(vm, exp);
                  // 注册对于表单输入项的input事件
                  child.addEventListener("input", e => {
                    var newVal = e.target.value;
                    if (newVal !== oldVal) {
                      // 更改数值
                      this.setVMVal(vm, exp, newVal);
                    }
                  });
                }
              }
              // 移除指令
              // child.removeAttributes(attr);
            }
          });
          if (child.childNodes && child.childNodes.length > 0) {
            this.compileNode(child, vm);
          }
          break;
        // 文本
        case compileUtil.textNodeType:
          var text = child.textContent,
            reg = /\{\{(.*)\}\}/;
          if (reg.test(text)) {
            var exp = reg.exec(text)[1];
            this.update(child, "text", this.getVMVal(vm, exp));
            new Watcher(vm, exp, (newVal, oldVal) => {
              this.update(child, "text", newVal, oldVal);
            });
          }
          break;
      }
    });
  }
};
// 模板解析
function compile(template, vm) {
  let el =
    template.nodeType == compileUtil.elementNodeType
      ? template
      : document.querySelector(template); // 取出id为el的第一个节点作为容器

  if (el) {
    // 将原始节点存为fragment进行操作 减少页面渲染次数 提升效率
    let fragment = compileUtil.node2Fragment(el);
    compileUtil.compileNode(fragment, vm);
    // 处理完后 重新添加至容器
    el.appendChild(fragment);
  }
}
```
#### 订阅者
```
let _uid = 0;
export function Watcher(vm, exp, cb) {
  // 唯一标识
  this.id = _uid++;
  this.vm = vm;
  this.exp = exp;
  this.cb = cb;
  this.value = this.depend();
}

Watcher.prototype = {
  constructor: Watcher,
  depend() {
    Dep.target = this;
    //通过触发getter,添加自己为订阅者
    var value = this.vm[this.exp];
    Dep.target = null;
    return value;
  },
  // 更新
  update() {
    let oldVal = this.value,
      newVal = this.vm[this.exp];
    if (oldVal !== newVal) {
      this.value = newVal;
      this.cb(newVal, oldVal);
    }
  }
};

```
#### 订阅者管理
```
export function Dep() {
  // 键值对 
  this.subs = new Map();
}
Dep.prototype = {
  constructor: Dep,
  // 添加订阅者
  addSub(watcher) {
    // 通过订阅者id作为唯一标识 避免重复订阅
    this.subs.set(watcher.id, watcher);
  },
  // 通知订阅者
  notify() {
    this.subs.forEach(watcher => {
      watcher.update();
    });
  }
};
Dep.target = null;
```

