import { proxy, compile, observe } from ".";

export function Wu(options) {
  this.$options = options;
  this.$data = options.data || {};
  this.$methods = options.methods || {};
  this.$watched = options.watched;


  observe(this.$data);
  // 将data和methods以及computed中的属性方法代理在自己身上
  proxy(this, this.$data);
  proxy(this, this.$methods);
  
  compile(options.el || document.body, this);
}
