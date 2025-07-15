# Descrição

Este projeto utiliza module federation com Vite e React para criar microfrontends.

## Como começar

1. Em cada microfrontend, adicione um arquivo `.env` seguindo o modelo do `.env.example`.
2. A partir do diretório raiz, execute:

```sh
cd shared && npm install && cd ..
pnpm run install:deps
pnpm run dev
```

Abra o navegador em: [http://localhost:4173/](http://localhost:4173/) para ver o resultado.

## Rodando com Docker no WSL

1. **Construa a imagem Docker:**

```sh
docker build -t fiap-farms-mf .
```

2. **Rode o container expondo as portas dos microfrontends:**

```sh
docker run --network="host" fiap-farms-mf
```

- O parâmetro `--network="host"` garante que as portas do container fiquem acessíveis no Windows e no WSL.
- Acesse no navegador:
  - [http://localhost:4173/](http://localhost:4173/) (host)
  - [http://localhost:4174/](http://localhost:4174/) (remote)
  - [http://localhost:4175/](http://localhost:4175/) (login)

## Dicas úteis

Para remover todos os diretórios `node_modules` de uma vez:

```sh
rm -rf node_modules && cd shared && rm -rf node_modules  && cd ../host && rm -rf node_modules && cd ../remote && rm -rf node_modules && cd ../login && rm -rf node_modules && cd ../shared && rm -rf node_modules && cd ..
```

