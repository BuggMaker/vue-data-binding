import { Dep, Watcher } from ".";

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
  // 获取属性值
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
                  this.getVMVal(vm, exp).bind(vm)
                );
              } else {
                // 其他指令model bind text等
                this.update(child, dir, this.getVMVal(vm, exp));
                new Watcher(vm, exp, (newVal, oldVal) => {
                  this.update(child, dir, newVal, oldVal);
                });
                // model
                if (dir === "model") {
                  let oldVal = this.getVMVal(vm, exp);
                  child.addEventListener("input", e => {
                    var newVal = e.target.value;
                    if (newVal !== oldVal) {
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

function compile(template, vm) {
  let el =
    template.nodeType == compileUtil.elementNodeType
      ? template
      : document.querySelector(template);

  if (el) {
    let fragment = compileUtil.node2Fragment(el);
    compileUtil.compileNode(fragment, vm);
    el.appendChild(fragment);
  }
}

export { observe, compile };
