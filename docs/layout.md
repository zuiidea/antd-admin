# Layout

## Add a new layout

Take a new layout named `secondary` as an example to make the route starting with `seconday` use this layout.

1. Add related configuration in `src/utils/config.js`. For details, please refer to [layouts](/configuration?id=layouts).

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

2. Add the `secondary` layout component to the `src/layouts/BaseLayout.js` file.

```javascript
   import SecondaryLayout from './SecondaryLayout'

   const LayoutMap = {
     Primary: PrimaryLayout,
     Public: PublicLayout,
     Secondary: SecondaryLayout,
   }
```

3. Add the `SecondaryLayout.js` file to the `src/layouts/` directory.

```javascript
   import React from 'react'

   export default ({ children }) => {
     Return (
       <div>
         <h1>Seconday</h1>
         {children}
       </div>
     )
   }
```

4. Add a `seconday/index.js` file to the `src/pages/` directory.

```javascript
   import React from 'react'

   export default ({ children }) => {
     Return <div>Seconday page Content</div>
   }
```

5. Finally, start the development mode `npm run start`, open [http://localhost:7000/seconday/](http://localhost:7000/seconday/) and you will see the page for the `seconday` layout.
