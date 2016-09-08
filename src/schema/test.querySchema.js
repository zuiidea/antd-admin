// 定义某个表的querySchema
// schema的结构和含义参考下面的例子
// 注意: 所有的key不能重复

module.exports = [
  {
    key: 'name',  // 传递给后端的字段名
    title: '用户名',  // 前端显示的名称
    placeholder: '请输入用户名',  // 提示语, 可选

    // 数据类型, 前端会根据数据类型展示不同的输入框
    // 目前可用的dataType: int/float/varchar/datetime
    dataType: 'varchar',

    // 显示类型, 一些可枚举的字段, 比如type, 可以被显示为单选框或下拉框
    // 默认显示类型是normal, 就是一个普通的输入框, 这时可以省略showType字段
    // 目前可用的showType: normal/select/radio/between
    // select和radio只能用于int和varchar
    // between只能用于int/float/datetime, 会显示2个输入框, 用于范围查询
    showType: 'normal',

    // 有一点要注意, 就算showType是normal, 也不意味是等值查询, 只是说传递给后台的是单独的一个值
    // 至于后台用这个值做等值/大于/小于/like, 前端不关心
  },

  {
    key: 'age',
    title: '年龄',
    placeholder: '请输入年龄',
    dataType: 'int',
  },
  {
    key: 'weight',
    title: '体重(kg)',
    dataType: 'float',  // 小数会统一保留2位
  },
  {
    key: 'type',
    title: '类型',
    dataType: 'int',
    showType: 'select',  // 下拉框选择, dataType可以是int或varchar, 但必须和options中的key类型一致
    options: [{key: 1, value: '类型1'}, {key: 2, value: '类型2'}],
  },
  {
    key: 'userType',
    title: '用户类型',
    dataType: 'varchar',  // 这个数据类型要和options中key的类型一致
    showType: 'radio',  // 单选框, 和下拉框schema是一样的, 只是显示时有差别
    options: [{key: 'typeA', value: '类型A'}, {key: 'typeB', value: '类型B'}],
  },
  {
    key: 'score',
    title: '分数',
    dataType: 'int',
    showType: 'between',  // 整数范围查询, 对于范围查询, 会自动生成xxBegin/xxEnd两个key传递给后端
  },
  {
    key: 'gpa',
    title: 'GPA',
    dataType: 'float',
    showType: 'between',  // 小数也可以范围查询, 固定两位小数
    placeholderBegin: '哈哈',  // 对于范围查询, 可以定义placeholderBegin和placeholderBegin, 用于两个框的提示语
    placeholderEnd: '切克闹',  // 如果不定义, 对于int/float的范围查询, 提示语是"最小值"/"最大值", 对于日期的范围查询, 提示语是"开始日期"/"结束日期"
  },
  {
    key: 'height',
    title: '身高(cm)',
    dataType: 'float',  // 小数等值查询
  },
  {
    key: 'duoxuan1',
    title: '多选1',
    dataType: 'int',
    showType: 'checkbox',  // checkbox
    options: [{key: 1, value: '类型1'}, {key: 2, value: '类型2'}],
  },
  {
    key: 'duoxuan2',
    title: '多选2',
    dataType: 'varchar',
    showType: 'multiSelect',  // 另一种多选
    options: [{key: 'type1', value: '类型1'}, {key: 'type2', value: '类型2'}],
  },
  {
    key: 'primarySchool',
    title: '入学日期',
    dataType: 'datetime',  // 日期范围查询, 日期范围查询占用的显示空间会很大, 注意排版
    showType: 'between',
  },
  {
    key: 'birthday',
    title: '出生日期',
    dataType: 'datetime',
    showType: 'between',
  },
  {
    key: 'xxbirthday',
    title: 'XX日期',
    dataType: 'datetime',  // 日期等值查询
  },
];
