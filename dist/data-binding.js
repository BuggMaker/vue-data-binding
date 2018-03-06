var D =
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
      this.cb.call(this.vm, newVal, oldVal);
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


function observe(model) {
  if (!model || typeof model !== "object") return;
  Object.keys(model).forEach(function(key) {
    let val = model[key],
      dep = new __WEBPACK_IMPORTED_MODULE_0____["a" /* Dep */]();
    //观察子属性
    observe(val);
    Object.defineProperty(model, key, {
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

function compile(view) {}




/***/ })
/******/ ]);