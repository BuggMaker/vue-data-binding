# vue-twoway-data-binding
vue双向数据绑定原理
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
  3. 通过Dep来管理订阅者,其中data的每一个属性拥有一个Dep实例(data与Dep为一对多的关系)
  4. 通过compile解析模板template,分析出那些是data的属性并
