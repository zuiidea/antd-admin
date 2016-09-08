// 定义某个表的dataSchema, 结构跟querySchema很相似, 见下面的例子
// 注意: 所有的key不能重复

module.exports = [
  {
    key: 'id',  // 传递给后端的key
    title: 'ID',  // 前端显示的名字
    dataType: 'int',  // 数据类型, 目前可用的: int/float/varchar/datetime

    // 这一列是否是主键?
    // 如果不指定主键, 不能update/delete, 但可以insert
    // 如果指定了主键, insert/update时不能填写主键的值;
    // 如果是批量update/delete, 会把主键的一个数组传给后端
    // 只有int/varchar可以作为主键
    primary: true,

    // showType目前还不支持, 其实dataSchema和querySchema一样, 都是有showType属性的
    // 以后有空加上
    // showType: checkbox/radio

    // 扩展接口, 决定了这一列渲染成什么样子
    render: (text, record) => text,
  },

  {
    key: 'name',
    title: '用户名',
    dataType: 'varchar',
  },
  {
    key: 'score',
    title: '分数',
    dataType: 'int',
  },
  {
    key: 'gpa',
    title: 'GPA',
    dataType: 'float',
  },
  {
    key: 'birthday',
    title: '生日',
    // 对于日期类型要注意下, 在js端日期被表示为yyyy-MM-dd HH:mm:ss的字符串, 在java端日期被表示为java.util.Date对象
    // fastjson反序列化时可以自动识别
    // 序列化倒是不用特别配置, 看自己需求, fastjson会序列化为一个字符串, 前端原样展示
    dataType: 'datetime',
  },
];
