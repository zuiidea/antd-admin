# 布局

## 新增布局

以新增名为 `secondary` 的布局为例，使以 `seconday` 开头的路由都使用该布局。

1. 在 `src/utils/config.js` 新增相关配置，参数详细请查看 [layouts](/zh-cn/configuration?id=layouts)。

   ```javascript
   layouts: [
           {
               name: 'primary',
               include: [/.*/],
               exclude: [/(\/(en|zh))*\/login/, /(\/(en|zh))*\/seconday\/(.*)/],
           },
           {
               name: 'secondary',
               include: [/(\/(en|zh))*\/seconday\/(.*)/],
           },
   ],
   ```

2. 在`src/layouts/BaseLayout.js` 文件中新增 `secondary` 布局组件。

   ```javascript
   import SecondaryLayout from './SecondaryLayout'

   const LayoutMap = {
     primary: PrimaryLayout,
     public: PublicLayout,
     secondary: SecondaryLayout,
   }
   ```

3. 在`src/layouts/` 目录中新增 `SecondaryLayout.js` 文件。

   ```javascript
   import React from 'react'

   export default ({ children }) => {
     return (
       <div>
         <h1>Seconday</h1>
         {children}
       </div>
     )
   }
   ```

4. 在`src/pages/` 目录中新增 `seconday/index.js` 文件。

   ```javascript
   import React from 'react'

   export default ({ children }) => {
     return <div>Seconday page Content</div>
   }
   ```

5. 最后，启动开发模式 `npm run start`，打开 [http://localhost:7000/seconday/](http://localhost:7000/seconday/)，你将看到 `seconday` 布局的页面。
