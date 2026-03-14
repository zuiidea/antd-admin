# 布局

## 新增布局

以新增名为 `secondary` 的布局为例，使以 `secondary` 开头的路由都使用该布局。

1. 在 `src/utils/config.js` 新增相关配置，参数详细请查看 [layouts](/zh-cn/configuration?id=layouts)。

   ```javascript
   layouts: [
           {
               name: 'primary',
               include: [/.*/],
               exclude: [/(\/(en|zh))*\/login/, /(\/(en|zh))*\/secondary\/(.*)/],
           },
           {
               name: 'secondary',
               include: [/(\/(en|zh))*\/secondary\/(.*)/],
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
         <h1>Secondary</h1>
         {children}
       </div>
     )
   }
   ```

4. 在`src/pages/` 目录中新增 `secondary/index.js` 文件。

   ```javascript
   import React from 'react'

   export default ({ children }) => {
     return <div>Secondary page Content</div>
   }
   ```

5. 最后，使用 `npm run dev` 启动开发模式，然后在浏览器中打开该布局页面（查看开发服务器输出以获取实际 URL），例如 `/secondary/`。
