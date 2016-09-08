/**
 * 定义sidebar中的菜单项
 *
 * 一些约定:
 * 1.菜单最多3层;
 * 2.只有顶层的菜单可以带图标;
 * 3.只有"叶子"节点才能跳转;
 * 4.所有的key都不能重复;
 */

module.exports = [
  {
    key: 'index',  // route时url中的值
    name: '菜单哈哈哈',  // 在菜单中显示的名称
    icon: 'smile',  // 只有顶层菜单可以带图标
    child: [
      {
        key: 'option1',
        name: '模拟CRUD',
      },
      {
        key: 'option2',
        name: '短信表管理',
      },
      {
        key: 'option3',
        name: '选项3',
      },
    ],
  },
  {
    key: 'daohang',
    name: '导航',
    icon: 'appstore',
    child: [
      {
        key: '555',
        name: '选项5',
      },
      {
        key: 'sanji',  // 最多只能到三级导航
        name: '三级导航',
        child: [
          {
            key: '666',
            name: '选项6',
          },
          {
            key: '777',
            name: '选项7',
          },
          {
            key: '888',
            name: '选项8',
          },
          {
            key: '999',
            name: '选项9',
          },
        ],
      },
    ],
  },
  {
    key: 'test',
    name: '测试',
    icon: 'eye',
    child: [
      {
        key: 'aaa',
        name: '选项a',
      },
      {
        key: 'bbb',
        name: '选项b',
      },
      {
        key: 'ccc',
        name: '选项c',
      },
      {
        key: 'sanjiaaa',  // 最多只能到三级导航
        name: '三级导航aaa',
        child: [
          {
            key: '666aa',
            name: '选项6',
          },
        ],
      },
      {
        key: 'sanjibbb',  // 最多只能到三级导航
        name: '三级导航bbb',
        child: [
          {
            key: '666bb',
            name: '选项6',
          },
        ],
      },
    ],
  },
];
