# Description

This project is built using module federation with vite and react to create the microfrontends.

## Getting started

Add in each microfrontend an .env file following the .env.example

Enter in shared directory and execute:

- npm install

Go back to the root. From this directory execute:

- npm run install:deps
- npm run dev

Open your browser at http://localhost:4173/ to see the result

### Helpers:

To remove all the node_modules directories at once:

- rm -rf node_modules && cd shared && rm -rf node_modules  && cd ../host && rm -rf node_modules && cd ../remote && rm -rf node_modules && cd ../login && rm -rf node_modules && cd ../shared && rm -rf node_modules && cd ..

