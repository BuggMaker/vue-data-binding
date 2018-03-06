import { Dep } from ".";

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

function compile(template) {

}

export { observe, compile };
