# vue-twoway-data-binding
vue双向数据绑定原理
## 基本原理
- 首先看原理图如下  
![MVVM框架数据双向绑定原理图](https://github.com/BuggMaker/vue-twoway-data-binding/blob/master/resources/img/data-binding.png)
- 其中主要部分及其功能
 1. 
- 基本步骤如下
    1. Vue包括data和template两部分,分别对应Model与View
    2. 通过observe为data的每一个属性和其子属性添加`getter`和`setter`
    3. 通过Dep来管理订阅者,其中data的每一个属性拥有一个Dep实例(data与Dep为一对多的关系)
    4. 通过compile解析模板template,分析出那些是data的属性并
