# Quick Start

> Before delving into Ant Design React, a good knowledge base of [React](http://facebook.github.io/react/) 、 [ES2015+](http://es6.ruanyifeng.com/) 、 [Antd Design](https://ant.design/docs/react/introduce-cn). Learn about [UmiJS](https://umijs.org/). Ensure you have [Node.js](https://nodejs.org/) (v18+ recommended) and [Git](https://git-scm.com/) installed.

## Installation

```bash
git clone https://github.com/zuiidea/antd-admin.git my-project
cd my-project
```

## Scaffolding

The project layout is as follows:

```bash
├── dist/               # Default build output directory
├── mock/               # Mock files 
├── public/             # Static resource 
├── src/                # Source code
│ ├── components/       # Components
│ ├── e2e/              # Integrated Test Case
│ ├── layouts/          # Common Layouts
│ ├── locales/          # i18n resources
│ ├── models/           # Global dva Model
│ ├── pages/            # Sub-pages and templates
│ ├── services/         # Backend Services
│ │ ├── api.js          # API configuration
│ │ └── index.js        # API export
│ ├── themes/           # Themes
│ │ ├── default.less    # Less variable
│ │ ├── index.less      # Global style
│ │ ├── mixin.less      # Less mixin
│ │ └── vars.less       # Less variable and mixin
│ ├── utils/            # Utility
│ │ ├── config.js       # Application configuration
│ │ ├── constant.js     # Static constant
│ │ ├── index.js        # Utility methods
│ │ ├── request.js      # Request function(axios)
│ │ └── theme.js        # Style variables used in js
├── .editorconfig       
├── .env                
├── .eslintrc           
├── .gitignore          
├── .prettierignore     
├── .prettierrc         
├── .stylelintrc.json   
├── .travis.yml         
└── .umirc.js           
└──  package.json      
```

## Development

1. Install dependencies (recommended: `pnpm`).

```bash
pnpm install
```

Or with other package managers:

```bash
npm install
# or
yarn install
```

2. Start local development server.

```bash
npm run dev
```

3. After startup, open the app in a browser (see dev server output for the actual URL/port).
