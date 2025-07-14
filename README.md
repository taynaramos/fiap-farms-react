# Description

This project is built using module federation with vite and react to create the microfrontends.

## Getting started

Add in each microfrontend an .env file following the .env.example

From root directory execute:

- cd shared && npm install && cd ..
- pnpm run install:deps
- pnpm run dev

Open your browser at http://localhost:4173/ to see the result

### Helpers:

To remove all the node_modules directories at once:

- rm -rf node_modules && cd shared && rm -rf node_modules  && cd ../host && rm -rf node_modules && cd ../remote && rm -rf node_modules && cd ../login && rm -rf node_modules && cd ../shared && rm -rf node_modules && cd ..

