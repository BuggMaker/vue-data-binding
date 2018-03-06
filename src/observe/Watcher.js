import { Dep } from ".";

let _uid = 0;
export function Watcher(vm, exp, cb) {
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
  update() {
    let oldVal = this.value,
      newVal = this.vm[this.exp];
    if (oldVal !== newVal) {
      this.value = newVal;
      this.cb.call(this.vm, newVal, oldVal);
    }
  }
};
