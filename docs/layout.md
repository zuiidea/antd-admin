# Layout

## Add a new layout

Take a new layout named `secondary` as an example to make the route starting with `secondary` use this layout.

1. Add related configuration in `src/utils/config.js`. For details, please refer to [layouts](/configuration?id=layouts).

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

2. Add the `secondary` layout component to the `src/layouts/BaseLayout.js` file.

```javascript
   import SecondaryLayout from './SecondaryLayout'

   const LayoutMap = {
     primary: PrimaryLayout,
     public: PublicLayout,
     secondary: SecondaryLayout,
   }
```

3. Add the `SecondaryLayout.js` file to the `src/layouts/` directory.

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

4. Add a `secondary/index.js` file to the `src/pages/` directory.

```javascript
   import React from 'react'

   export default ({ children }) => {
     Return <div>Secondary page Content</div>
   }
```

5. Finally, start the development mode `npm run start`, open [http://localhost:7000/secondary/](http://localhost:7000/secondary/) and you will see the page for the `secondary` layout.
