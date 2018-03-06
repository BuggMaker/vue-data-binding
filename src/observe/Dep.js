export function Dep() {
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
