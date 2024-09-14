# About project

This project contains scripts to setup a Next.js project with all the necessary configurations in my own way.

## What is next-base-cli included?

This project contains the following dependencies:

- Next.js (latest version)
- Shadcn/UI
- tailwindcss
- eslint
- @typescript-eslint/parser
- @typescript-eslint/eslint-plugin
- prettier
- eslint-config-prettier
- eslint-plugin-prettier
- prettier-plugin-tailwindcss
- eslint-plugin-simple-import-sort
- lint-staged
- husky
- @commitlint/config-conventional
- @commitlint/cli

## How to use it?

I recommended you install in global mode:

```
npm install -g next-base-cli
```

After that, you can run the script to setup your project:

```
next-base create
```

Following the instructions, you can setup a next.js codebase

Currently, I have 2 template that you can choose:

- Standard: https://github.com/khachoangpt/next-codebase

- With i18n: https://github.com/khachoangpt/next-codebase-i18n

Project structure

```
├── .commitlintrc.json
├── .env.example
├── .eslintrc.json
├── .husky
│   ├── commit-msg
│   └── pre-commit
├── .lintstagedrc
├── .prettierrc
├── .vscode
│   ├── i18n-ally-custom-framework.yml
│   └── settings.json
├── README.md
├── docs
│   └── swagger.json
├── next.config.mjs
├── openapi-ts.config.ts
├── package.json
├── postcss.config.mjs
├── public
│   ├── messages
│   └── static
├── server.ts
├── src
│   ├── actions
│   ├── app
│   ├── client
│   ├── components
│   ├── configs
│   ├── constants
│   ├── i18n.ts
│   ├── middleware.ts
│   ├── modules
│   ├── store
│   ├── types
│   └── utils
├── tailwind.config.ts
└── tsconfig.json
```

## Configuration

### env

- Create a `.env.local` file in the root directory of your project and use `.env.example` as a template file.
- **SWAGGER_JSON_URL**: The URL of the OpenAPI specification (JSON format). I use it to generate `swagger.json` file in the `docs` folder to generate SDK for app.
- **NEXT_PUBLIC_API_URL**: The URL of the backend API.
- **NEXT_PUBLIC_MAINTENANCE_MODE**: `true/false` to enable/disable the maintenance mode.

**I will continue to add more features in the future. Thanks for your time.**
