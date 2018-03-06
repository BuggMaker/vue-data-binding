var W =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Dep__ = __webpack_require__(2);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__Dep__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Watcher__ = __webpack_require__(3);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__Watcher__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ObserveUtils__ = __webpack_require__(4);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_2__ObserveUtils__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_2__ObserveUtils__["b"]; });





/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__observe_index__ = __webpack_require__(0);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Dep", function() { return __WEBPACK_IMPORTED_MODULE_0__observe_index__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Watcher", function() { return __WEBPACK_IMPORTED_MODULE_0__observe_index__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "observe", function() { return __WEBPACK_IMPORTED_MODULE_0__observe_index__["d"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "compile", function() { return __WEBPACK_IMPORTED_MODULE_0__observe_index__["c"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(5);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "proxy", function() { return __WEBPACK_IMPORTED_MODULE_1__utils__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "def", function() { return __WEBPACK_IMPORTED_MODULE_1__utils__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Wu__ = __webpack_require__(7);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Wu", function() { return __WEBPACK_IMPORTED_MODULE_2__Wu__["a"]; });




/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = Dep;
function Dep() {
  this.subs = new Map();
}
Dep.prototype = {
  constructor: Dep,
  addSub(watcher) {
    this.subs.set(watcher.id, watcher);
  },
  notify() {
    this.subs.forEach(watcher => {
      watcher.update();
    });
  }
};
Dep.target = null;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = Watcher;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(0);


let _uid = 0;
function Watcher(vm, exp, cb) {
  this.id = _uid++;
  this.vm = vm;
  this.exp = exp;
  this.cb = cb;
  this.value = this.depend();
}

Watcher.prototype = {
  constructor: Watcher,
  depend() {
    __WEBPACK_IMPORTED_MODULE_0____["a" /* Dep */].target = this;
    //通过触发getter,添加自己为订阅者
    var value = this.vm[this.exp];
    __WEBPACK_IMPORTED_MODULE_0____["a" /* Dep */].target = null;
    return value;
  },
  update() {
    let oldVal = this.value,
      newVal = this.vm[this.exp];
    if (oldVal !== newVal) {
      this.value = newVal;
      this.cb(newVal, oldVal);
    }
  }
};


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return observe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return compile; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(0);


function observe(data) {
  if (!data || typeof data !== "object") return;
  Object.keys(data).forEach(function(key) {
    let val = data[key],
      dep = new __WEBPACK_IMPORTED_MODULE_0____["a" /* Dep */]();
    //观察子属性
    observe(val);
    Object.defineProperty(data, key, {
      configurable: true,
      enumerable: true,
      get: function() {
        // console.log(`i get ${key}:${val}`);
        //添加订阅者
        __WEBPACK_IMPORTED_MODULE_0____["a" /* Dep */].target && dep.addSub(__WEBPACK_IMPORTED_MODULE_0____["a" /* Dep */].target);
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
                new __WEBPACK_IMPORTED_MODULE_0____["b" /* Watcher */](vm, exp, (newVal, oldVal) => {
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
            new __WEBPACK_IMPORTED_MODULE_0____["b" /* Watcher */](vm, exp, (newVal, oldVal) => {
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




/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(6);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__utils__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__utils__["b"]; });


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = proxy;
/* harmony export (immutable) */ __webpack_exports__["a"] = def;
function proxy(target, source) {
  for (const key in source) {
    if (source.hasOwnProperty(key)) {

      Object.defineProperty(target, key, {
        enumerable: true,
        configurable: true,
        get: function() {
          return source[key];
        },
        set: function(newVal) {
          source[key] = newVal;
        }
      });
    }
  }
}

function def(obj, key, val) {
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function() {
      return val;
    },
    set: function(newVal) {
      val = newVal;
    }
  });
}


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = Wu;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(1);


function Wu(options) {
  this.$options = options;
  this.$data = options.data || {};
  this.$methods = options.methods || {};
  this.$watched = options.watched;


  Object(__WEBPACK_IMPORTED_MODULE_0____["observe"])(this.$data);
  // 将data和methods以及computed中的属性方法代理在自己身上
  Object(__WEBPACK_IMPORTED_MODULE_0____["proxy"])(this, this.$data);
  Object(__WEBPACK_IMPORTED_MODULE_0____["proxy"])(this, this.$methods);
  
  Object(__WEBPACK_IMPORTED_MODULE_0____["compile"])(options.el || document.body, this);
}


/***/ })
/******/ ]);