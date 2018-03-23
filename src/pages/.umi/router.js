import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import Layout from 'E:/antd-admin/src/layouts/index.js';
import { routerRedux } from 'dva/router';



let Router = DefaultRouter;
const { ConnectedRouter } = routerRedux;
Router = ConnectedRouter;


export default function() {
  return (
<Router history={window.g_history}>
  <Layout><Switch>
    <Route exact path="/chart/Container" component={() => React.createElement(require('E:/antd-admin/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/chart/Container' })} />
    <Route exact path="/chart/ECharts/AirportCoordComponent" component={() => React.createElement(require('E:/antd-admin/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/chart/ECharts/AirportCoordComponent' })} />
    <Route exact path="/chart/ECharts/BubbleGradientComponent" component={() => React.createElement(require('E:/antd-admin/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/chart/ECharts/BubbleGradientComponent' })} />
    <Route exact path="/chart/ECharts/CalendarComponent" component={() => React.createElement(require('E:/antd-admin/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/chart/ECharts/CalendarComponent' })} />
    <Route exact path="/chart/ECharts/ChartAPIComponent" component={() => React.createElement(require('E:/antd-admin/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/chart/ECharts/ChartAPIComponent' })} />
    <Route exact path="/chart/ECharts/ChartShowLoadingComponent" component={() => React.createElement(require('E:/antd-admin/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/chart/ECharts/ChartShowLoadingComponent' })} />
    <Route exact path="/chart/ECharts/ChartWithEventComponent" component={() => React.createElement(require('E:/antd-admin/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/chart/ECharts/ChartWithEventComponent' })} />
    <Route exact path="/chart/ECharts/DynamicChartComponent" component={() => React.createElement(require('E:/antd-admin/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/chart/ECharts/DynamicChartComponent' })} />
    <Route exact path="/chart/ECharts/EchartsComponent" component={() => React.createElement(require('E:/antd-admin/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/chart/ECharts/EchartsComponent' })} />
    <Route exact path="/chart/ECharts/GaugeComponent" component={() => React.createElement(require('E:/antd-admin/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/chart/ECharts/GaugeComponent' })} />
    <Route exact path="/chart/ECharts/GCalendarComponent" component={() => React.createElement(require('E:/antd-admin/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/chart/ECharts/GCalendarComponent' })} />
    <Route exact path="/chart/ECharts/GraphComponent" component={() => React.createElement(require('E:/antd-admin/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/chart/ECharts/GraphComponent' })} />
    <Route exact path="/chart/ECharts/" component={() => React.createElement(require('E:/antd-admin/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/chart/ECharts/' })} />
    <Route exact path="/chart/ECharts/LiquidfillComponent" component={() => React.createElement(require('E:/antd-admin/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/chart/ECharts/LiquidfillComponent' })} />
    <Route exact path="/chart/ECharts/LunarCalendarComponent" component={() => React.createElement(require('E:/antd-admin/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/chart/ECharts/LunarCalendarComponent' })} />
    <Route exact path="/chart/ECharts/MainPageComponent" component={() => React.createElement(require('E:/antd-admin/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/chart/ECharts/MainPageComponent' })} />
    <Route exact path="/chart/ECharts/MapChartComponent" component={() => React.createElement(require('E:/antd-admin/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/chart/ECharts/MapChartComponent' })} />
    <Route exact path="/chart/ECharts/ModuleLoadChartComponent" component={() => React.createElement(require('E:/antd-admin/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/chart/ECharts/ModuleLoadChartComponent' })} />
    <Route exact path="/chart/ECharts/MoonComponent" component={() => React.createElement(require('E:/antd-admin/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/chart/ECharts/MoonComponent' })} />
    <Route exact path="/chart/ECharts/SimpleChartComponent" component={() => React.createElement(require('E:/antd-admin/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/chart/ECharts/SimpleChartComponent' })} />
    <Route exact path="/chart/ECharts/theme/macarons" component={() => React.createElement(require('E:/antd-admin/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/chart/ECharts/theme/macarons' })} />
    <Route exact path="/chart/ECharts/theme/shine" component={() => React.createElement(require('E:/antd-admin/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/chart/ECharts/theme/shine' })} />
    <Route exact path="/chart/ECharts/ThemeChartComponent" component={() => React.createElement(require('E:/antd-admin/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/chart/ECharts/ThemeChartComponent' })} />
    <Route exact path="/chart/ECharts/TransparentBar3DComPonent" component={() => React.createElement(require('E:/antd-admin/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/chart/ECharts/TransparentBar3DComPonent' })} />
    <Route exact path="/chart/ECharts/TreemapComponent" component={() => React.createElement(require('E:/antd-admin/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/chart/ECharts/TreemapComponent' })} />
    <Route exact path="/chart/highCharts/HighChartsComponent" component={() => React.createElement(require('E:/antd-admin/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/chart/highCharts/HighChartsComponent' })} />
    <Route exact path="/chart/highCharts/HighmapsComponent" component={() => React.createElement(require('E:/antd-admin/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/chart/highCharts/HighmapsComponent' })} />
    <Route exact path="/chart/highCharts/HighMoreComponent" component={() => React.createElement(require('E:/antd-admin/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/chart/highCharts/HighMoreComponent' })} />
    <Route exact path="/chart/highCharts/HighstockComponent" component={() => React.createElement(require('E:/antd-admin/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/chart/highCharts/HighstockComponent' })} />
    <Route exact path="/chart/highCharts/" component={() => React.createElement(require('E:/antd-admin/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/chart/highCharts/' })} />
    <Route exact path="/chart/highCharts/mapdata/europe" component={() => React.createElement(require('E:/antd-admin/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/chart/highCharts/mapdata/europe' })} />
    <Route exact path="/chart/Recharts/AreaChartComponent" component={() => React.createElement(require('E:/antd-admin/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/chart/Recharts/AreaChartComponent' })} />
    <Route exact path="/chart/Recharts/BarChartComponent" component={() => React.createElement(require('E:/antd-admin/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/chart/Recharts/BarChartComponent' })} />
    <Route exact path="/chart/Recharts/Container" component={() => React.createElement(require('E:/antd-admin/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/chart/Recharts/Container' })} />
    <Route exact path="/chart/Recharts/" component={() => React.createElement(require('E:/antd-admin/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/chart/Recharts/' })} />
    <Route exact path="/chart/Recharts/LineChartComponent" component={() => React.createElement(require('E:/antd-admin/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/chart/Recharts/LineChartComponent' })} />
    <Route exact path="/chart/Recharts/ReChartsComponent" component={() => React.createElement(require('E:/antd-admin/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/chart/Recharts/ReChartsComponent' })} />
    <Route exact path="/dashboard/components/browser" component={() => React.createElement(require('E:/antd-admin/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/dashboard/components/browser' })} />
    <Route exact path="/dashboard/components/comments" component={() => React.createElement(require('E:/antd-admin/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/dashboard/components/comments' })} />
    <Route exact path="/dashboard/components/completed" component={() => React.createElement(require('E:/antd-admin/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/dashboard/components/completed' })} />
    <Route exact path="/dashboard/components/cpu" component={() => React.createElement(require('E:/antd-admin/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/dashboard/components/cpu' })} />
    <Route exact path="/dashboard/components/" component={() => React.createElement(require('E:/antd-admin/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/dashboard/components/' })} />
    <Route exact path="/dashboard/components/numberCard" component={() => React.createElement(require('E:/antd-admin/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/dashboard/components/numberCard' })} />
    <Route exact path="/dashboard/components/quote" component={() => React.createElement(require('E:/antd-admin/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/dashboard/components/quote' })} />
    <Route exact path="/dashboard/components/recentSales" component={() => React.createElement(require('E:/antd-admin/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/dashboard/components/recentSales' })} />
    <Route exact path="/dashboard/components/sales" component={() => React.createElement(require('E:/antd-admin/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/dashboard/components/sales' })} />
    <Route exact path="/dashboard/components/user" component={() => React.createElement(require('E:/antd-admin/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/dashboard/components/user' })} />
    <Route exact path="/dashboard/components/weather" component={() => React.createElement(require('E:/antd-admin/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/dashboard/components/weather' })} />
    <Route exact path="/dashboard/" component={() => React.createElement(require('E:/antd-admin/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/dashboard/' })} />
    <Route exact path="/error/" component={() => React.createElement(require('E:/antd-admin/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/error/' })} />
    <Route exact path="/" component={() => React.createElement(require('E:/antd-admin/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/' })} />
    <Route exact path="/login/" component={require('../login/index.js').default} />
    <Route exact path="/post/" component={() => React.createElement(require('E:/antd-admin/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/post/' })} />
    <Route exact path="/post/List" component={() => React.createElement(require('E:/antd-admin/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/post/List' })} />
    <Route exact path="/request/" component={() => React.createElement(require('E:/antd-admin/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/request/' })} />
    <Route exact path="/UIElement/dataTable/" component={() => React.createElement(require('E:/antd-admin/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/UIElement/dataTable/' })} />
    <Route exact path="/UIElement/dropOption/" component={() => React.createElement(require('E:/antd-admin/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/UIElement/dropOption/' })} />
    <Route exact path="/UIElement/editor/" component={() => React.createElement(require('E:/antd-admin/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/UIElement/editor/' })} />
    <Route exact path="/UIElement/iconfont/emoji" component={() => React.createElement(require('E:/antd-admin/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/UIElement/iconfont/emoji' })} />
    <Route exact path="/UIElement/iconfont/" component={() => React.createElement(require('E:/antd-admin/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/UIElement/iconfont/' })} />
    <Route exact path="/UIElement/layer/" component={() => React.createElement(require('E:/antd-admin/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/UIElement/layer/' })} />
    <Route exact path="/UIElement/search/" component={() => React.createElement(require('E:/antd-admin/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/UIElement/search/' })} />
    <Route exact path="/user/detail/" component={() => React.createElement(require('E:/antd-admin/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/user/detail/' })} />
    <Route exact path="/user/Filter" component={() => React.createElement(require('E:/antd-admin/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/user/Filter' })} />
    <Route exact path="/user/" component={() => React.createElement(require('E:/antd-admin/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/user/' })} />
    <Route exact path="/user/List" component={() => React.createElement(require('E:/antd-admin/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/user/List' })} />
    <Route exact path="/user/Modal" component={() => React.createElement(require('E:/antd-admin/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/user/Modal' })} />
  </Switch></Layout>
</Router>
  );
}
