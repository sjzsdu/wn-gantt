# wn-gantt

## 说明
本组件基于[wl-gantt](https://github.com/hql7/wl-gantt),更多详情可供参考

## 简介
  甘特图（Gantt chart）又称为横道图、条状图(Bar chart)、生产计划进度图。其通过条状图来显示项目，进度，和其他时间相关的系统进展的内在关系随着时间进展的情况。以提出者亨利·劳伦斯·甘特（Henry Laurence Gantt）先生的名字命名。  

## 新增功能
+ 拖动甘特图的两端，可以改变起止时间
+ 拖动整个甘特图，可以改变起止时间
+ 

## 快速上手

### 安装
`npm i wn-gantt --save` 

### 使用

```
import wnGantt from 'wn-gantt'
import "wn-gantt/lib/wn-gantt.css"
Vue.use(wnGantt)
```  

## 文档
###  Attributes 参数
  | 序号 | 参数 | 说明 | 类型 | 可选值 | 默认值 | 注意 |
  | ---- | ---- | ---- | ---- | ---- | ---- | ---- |
  | 1 | data | 数据 | Array | - | [] | - |
  | 2 | dateType | gantt图区日期表头类型 | String | monthAndDay、yearAndMonth、yearAndDay | yearAndMonth | - |
  | 3 | treeProps | 树表配置项 | Object | - | - | 见下方props |
  | 4 | startDate | 项目开始时间 | String、Object | 必填 |-| 注意：不要求任务时间线在项目开始时间内，并且当任务时间超出项目时间时，将更新项目时间 |
  | 5 | endDate | 项目结束时间 | String、Object | 必填 | - | 注意：不要求任务时间线在项目开始时间内，并且当任务时间超出项目时间时，将更新项目时间 |
  | 6 | checkSource | 是否检查源数据符合规则 | Boolean | - | - | 检查源数据为自动修改不符合规范的时间为符合规则的期望值 |
  | 7 | treatIdAsIdentityId | 是否使用id来作为自增id | Boolean | - | false | 如果是请保证id本来就简短的数字型而不是较长的字符串或guid |
  | 8 | autoGanttDateType | 自动调整gantt时间跨度类型，具体规则见`版本记录1` | Boolean | - | true | - |
  | 9 | nameFormatter | 名称列格式化内容函数 | Function | - | - | Function(row, column, cellValue, index) |
  | 10 | 其他Table Attributes | [文档地址](https://element.eleme.cn/#/zh-CN/component/table) | - | - | - | - |
  | 11 | usePreColumn | 是否使用内置前置任务列 | Boolean | - | false | - |
  | 12 | preMultiple | 前置任务是否可以多选 | Boolean | - | true | 如果开启多选则pre字段必须是Array，否则可以是Number\String | 
  | 13 | preFormatter | 前置内容列格式化函数 | Function | - | - | 如不传则根据`prop name字段+，`拼接 | 
  | 14 | emptyCellText | 空值单元格占位符 | String | - | '-' | - | 
  | 15 | useCheckColumn | 是否使用内置复选框列 | Boolean | - | false | - |
  | 16 | useIndexColumn | 是否使用内置序号列 | Boolean | - | false | - | 
  | 17 | edit | 是否可编辑 | Boolean | - | true | - |
  | 18 | parentChild | 使用复选框时，是否父子关联 | Boolean | - | true | 必须配置props的id、children字段 |
  | 19 | ganttOnly | 是否只显示图形 | Boolean | - | false | - |
  | 20 | lazy | 同el-table | Boolean | - | false | - |
  | 21 | load | 同el-table | Function | - | - | - |

### props 配置项
| 序号 | 参数 | 说明 | 默认值 |
| ---- | ---- | ---- | ---- |
| 1 | children | 数据的子集children字段,表示为树表 | children |
| 2 | name | 用于显示名字的字段 | name |
| 3 | id | 每条数据的id，必须唯一 | id |
| 4 | pid | 每条数据的父节点id字段 | pid |
| 5 | startDate | 每条数据的开始时间字段 | startDate |
| 6 | endDate | 每条数据的结束时间字段| endDate |
| 7 | identityId | 数据自增id | identityId |
| 8 | parents | 自增父级id树，逗号分隔 | parents |
| 9 | pre | 前置任务字段，字段值应是前置任务的id | pre |
| 10 | hasChildren | 指定哪些行是包含子节点 | hasChildren |

### Events 事件
  | 序号 | 事件名 | 说明 | 回调参数 |
  | ---- | ---- | ---- | ---- |
  | 1 | timeChange | 当任务时间发生更改时触发 | function(row) 依次为当前行数据 |
  | 2 | 其他Table Events | [文档地址](https://element.eleme.cn/#/zh-CN/component/table) | - | - |
  | 3 | preChange | 前置任务修改事件 | function(row) 依次为当前行数据 |
  | 4 | nameChange | 名称修改事件 |  function(row) 依次为当前行数据 |
  | 5 | taskAdd | 添加任务事件 |  function(row) 依次为当前行数据 |
  | 6 | taskRemove | 删除任务事件 |  function(row) 依次为当前行数据 |

### Methods 方法
  | 序号 | 方法名 | 说明 | 回调参数 |
  | ---- | ---- | ---- | ---- |
  | 1 | loadTree | 手动调用树表懒加载 | function(row) 依次为要展开的行信息 |
  | 2 | loadTreeAdd | 更新树表懒加载后的子节点 | function(id, list) 依次为要更新的节点id，要添加的子节点list，注意此为合并list和原来的子节点数据 |
  | 3 | loadTreeRemove | 移除懒加载数据的子节点 | function(id, list) 依次为要更新的节点id，要删掉的子字节的rowKey |

### slot
  | 序号 | 名字 | 说明 |
  | ---- | ---- | ---- |
  | 1 | prv | 用于插入列表中名称前的列，如不生效需加`fixed` |
  | 2 | - | 插入在默认列及甘特图之间的列 |

### 版本记录

> 1.0.2版本，增加lazy和load参数，支持懒加载，并提供懒加载时的方法：Methods：1,2,3；增加ganttOnly参数支持只显示图形

> 1.0.1版本 增加内置复选框列、序号列；增加是否可编辑参数；修改内置前置任务列配置参数值为false；增加复选框的父子联动属性；增加名称列可编辑逻辑；增加添加、移除任务事件；

> 1.0.0版本 增加内置前置任务列，支持多选前置和单选前置，并自动校验源数据前置任务合法性。

> 0.1.6版本 更新gantt。1表格支持[el-table](https://element.eleme.cn/#/zh-CN/component/table)大部分`Attributes`和`Events`；2名称列增加`nameFormatter`格式化内容函数支持；3日期列改为点击显示编辑输入框的形式。注意树表时`rowKey`参数必须传，默认为`id`。

> 0.1.5版本 更新gantt日期支持` yearAndMonth、monthAndDay、yearAndWeek`类型，并自动调整，规则为：大于12个月的自动调整为`yearAndMonth`,3个月到12个月之间的，自动调整为`yearAndWeek`, 2个月及以内的自动调整为`monthAndDay`。新增参数`autoGanttDateType`可以管理是否自动调整，如果要关闭自动调整请保证时间跨度尽可能的少，否则会有明显的性能问题。修复部分时间更改情况不回调的问题。