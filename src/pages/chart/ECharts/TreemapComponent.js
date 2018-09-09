import React from 'react'
import ReactEcharts from 'echarts-for-react'
import echarts from 'echarts'

const TreemapComponent = () => {
  let diskData = [
    {
      value: 180,
      name: 'Accounts',
      path: 'Accounts',
      children: [
        {
          value: 76,
          name: 'Access',
          path: 'Accounts/Access',
          children: [
            {
              value: 12,
              name: 'DefaultAccessPlugin.bundle',
              path: 'Accounts/Access/DefaultAccessPlugin.bundle',
            },
            {
              value: 28,
              name: 'FacebookAccessPlugin.bundle',
              path: 'Accounts/Access/FacebookAccessPlugin.bundle',
            },
            {
              value: 20,
              name: 'LinkedInAccessPlugin.bundle',
              path: 'Accounts/Access/LinkedInAccessPlugin.bundle',
            },
            {
              value: 16,
              name: 'TencentWeiboAccessPlugin.bundle',
              path: 'Accounts/Access/TencentWeiboAccessPlugin.bundle',
            },
          ],
        },
        {
          value: 92,
          name: 'Authentication',
          path: 'Accounts/Authentication',
          children: [
            {
              value: 24,
              name: 'FacebookAuthenticationPlugin.bundle',
              path:
                'Accounts/Authentication/FacebookAuthenticationPlugin.bundle',
            },
            {
              value: 16,
              name: 'LinkedInAuthenticationPlugin.bundle',
              path:
                'Accounts/Authentication/LinkedInAuthenticationPlugin.bundle',
            },
            {
              value: 20,
              name: 'TencentWeiboAuthenticationPlugin.bundle',
              path:
                'Accounts/Authentication/TencentWeiboAuthenticationPlugin.bundle',
            },
            {
              value: 16,
              name: 'TwitterAuthenticationPlugin.bundle',
              path:
                'Accounts/Authentication/TwitterAuthenticationPlugin.bundle',
            },
            {
              value: 16,
              name: 'WeiboAuthenticationPlugin.bundle',
              path: 'Accounts/Authentication/WeiboAuthenticationPlugin.bundle',
            },
          ],
        },
        {
          value: 12,
          name: 'Notification',
          path: 'Accounts/Notification',
          children: [
            {
              value: 12,
              name: 'SPAAccountsNotificationPlugin.bundle',
              path:
                'Accounts/Notification/SPAAccountsNotificationPlugin.bundle',
            },
          ],
        },
      ],
    },
    {
      value: 1904,
      name: 'AddressBook Plug-Ins',
      path: 'AddressBook Plug-Ins',
      children: [
        {
          value: 744,
          name: 'CardDAVPlugin.sourcebundle',
          path: 'AddressBook Plug-Ins/CardDAVPlugin.sourcebundle',
          children: [
            {
              value: 744,
              name: 'Contents',
              path: 'AddressBook Plug-Ins/CardDAVPlugin.sourcebundle/Contents',
            },
          ],
        },
        {
          value: 28,
          name: 'DirectoryServices.sourcebundle',
          path: 'AddressBook Plug-Ins/DirectoryServices.sourcebundle',
          children: [
            {
              value: 28,
              name: 'Contents',
              path:
                'AddressBook Plug-Ins/DirectoryServices.sourcebundle/Contents',
            },
          ],
        },
        {
          value: 680,
          name: 'Exchange.sourcebundle',
          path: 'AddressBook Plug-Ins/Exchange.sourcebundle',
          children: [
            {
              value: 680,
              name: 'Contents',
              path: 'AddressBook Plug-Ins/Exchange.sourcebundle/Contents',
            },
          ],
        },
        {
          value: 432,
          name: 'LDAP.sourcebundle',
          path: 'AddressBook Plug-Ins/LDAP.sourcebundle',
          children: [
            {
              value: 432,
              name: 'Contents',
              path: 'AddressBook Plug-Ins/LDAP.sourcebundle/Contents',
            },
          ],
        },
        {
          value: 20,
          name: 'LocalSource.sourcebundle',
          path: 'AddressBook Plug-Ins/LocalSource.sourcebundle',
          children: [
            {
              value: 20,
              name: 'Contents',
              path: 'AddressBook Plug-Ins/LocalSource.sourcebundle/Contents',
            },
          ],
        },
      ],
    },
    {
      value: 36,
      name: 'Assistant',
      path: 'Assistant',
      children: [
        {
          value: 36,
          name: 'Plugins',
          path: 'Assistant/Plugins',
          children: [
            {
              value: 36,
              name: 'AddressBook.assistantBundle',
              path: 'Assistant/Plugins/AddressBook.assistantBundle',
            },
            {
              value: 8,
              name: 'GenericAddressHandler.addresshandler',
              path: 'Recents/Plugins/GenericAddressHandler.addresshandler',
            },
            {
              value: 12,
              name: 'MapsRecents.addresshandler',
              path: 'Recents/Plugins/MapsRecents.addresshandler',
            },
          ],
        },
      ],
    },
  ]
  let formatUtil = echarts.format
  function getLevelOption() {
    return [
      {
        itemStyle: {
          normal: {
            borderWidth: 0,
            gapWidth: 5,
          },
        },
      },
      {
        itemStyle: {
          normal: {
            gapWidth: 1,
          },
        },
      },
      {
        colorSaturation: [0.35, 0.5],
        itemStyle: {
          normal: {
            gapWidth: 1,
            borderColorSaturation: 0.6,
          },
        },
      },
    ]
  }
  const option = {
    title: {
      text: 'Disk Usage',
      left: 'center',
    },

    tooltip: {
      formatter(info) {
        let { value, treePathInfo } = info
        let treePath = []

        for (let i = 1; i < treePathInfo.length; i++) {
          treePath.push(treePathInfo[i].name)
        }

        return [
          `<div class="tooltip-title">${formatUtil.encodeHTML(
            treePath.join('/')
          )}</div>`,
          `Disk Usage: ${formatUtil.addCommas(value)} KB`,
        ].join('')
      },
    },

    series: [
      {
        name: 'Disk Usage',
        type: 'treemap',
        visibleMin: 300,
        label: {
          show: true,
          formatter: '{b}',
        },
        itemStyle: {
          normal: {
            borderColor: '#fff',
          },
        },
        levels: getLevelOption(),
        data: diskData,
      },
    ],
  }

  return (
    <div className="examples">
      <div className="parent">
        <label> render a disk usage treemap. </label>
        <ReactEcharts
          option={option}
          style={{ height: '500px', width: '100%' }}
          className="react_for_echarts"
        />
      </div>
    </div>
  )
}

export default TreemapComponent
