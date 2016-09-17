module.exports = [
  {
    key: 'index',
    name: '数据相关',
    icon: 'user',
    child: [
      {
        key: 'list',
        name: '数据列表',
      },
    ],
  },
  {
    key: 'navigation',
    name: '测试导航',
    icon: 'setting',
    child: [
      {
        key: 'navigation1',
        name: '二级导航1',
      },
      {
        key: 'navigation2',
        name: '二级导航2',
        child: [
          {
            key: 'navigation21',
            name: '三级导航1',
          },
          {
            key: 'navigation22',
            name: '三级导航2',
          },
        ],
      },
    ],
  },
  // {
  //   key: 'test',
  //   name: '菜单三',
  //   icon: 'laptop',
  //   child: [
  //     {
  //       key: 'aaa',
  //       name: '选项a',
  //     },
  //     {
  //       key: 'bbb',
  //       name: '选项b',
  //     },
  //     {
  //       key: 'ccc',
  //       name: '选项c',
  //     },
  //     {
  //       key: 'sanjiaaa',  // 最多只能到三级导航
  //       name: '三级导航aaa',
  //       child: [
  //         {
  //           key: '666aa',
  //           name: '选项6',
  //         },
  //       ],
  //     },
  //     {
  //       key: 'sanjibbb',  // 最多只能到三级导航
  //       name: '三级导航bbb',
  //       child: [
  //         {
  //           key: '666bb',
  //           name: '选项6',
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   key: 'menu4',
  //   name: '菜单四',
  //   icon: 'notification',
  //   child: [
  //     {
  //       key: 'menu4',
  //       name: '菜单四一',
  //     },
  //    ],
  // },
  // {
  //   key: 'menu5',
  //   name: '菜单五',
  //   icon: 'folder',
  //   child: [
  //     {
  //       key: 'menu51',
  //       name: '菜单五一',
  //     },
  //     {
  //       key: 'menu52',
  //       name: '菜单五二',
  //     },
  //     {
  //       key: 'menu53',
  //       name: '菜单五三',
  //       child: [
  //         {
  //           key: 'menu531',
  //           name: '菜单五三一',
  //         },
  //       ],
  //     },
  //   ],
  // },
];
