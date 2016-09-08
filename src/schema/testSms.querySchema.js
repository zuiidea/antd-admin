// 定义某个表的querySchema
// schema的结构和含义参考下面的例子
// 注意: 所有的key不能重复

module.exports = [
  {
    key: 'id',  // 传递给后端的字段名
    title: 'ID',  // 前端显示的名称
    dataType: 'int',
  },
  {
    key: 'content',
    title: '内容',
    dataType: 'varchar',
  },
  {
    key: 'phoneModel',
    title: '手机型号',
    dataType: 'varchar',
  },
  {
    key: 'experience',
    title: '使用经验',
    dataType: 'varchar',
  },
  {
    key: 'frequency',
    title: '使用频率',
    dataType: 'varchar',
  },
  {
    key: 'isNative',
    title: '是否母语',
    dataType: 'varchar',
    showType: 'radio',
    options: [{key: 'yes', value: '是'}, {key: 'no', value: '否'}],
  },
];
