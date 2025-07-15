# Imagem base com Node.js 22.11.0 e npm 11.4.2
FROM node:22.11.0

# Diretório de trabalho
WORKDIR /app

# Copia os arquivos do projeto
COPY . .

# Instala o npm 11.4.2 explicitamente
RUN npm install -g npm@11.4.2

# Instala o pnpm globalmente
RUN npm install -g pnpm

# Instala dependências do shared
RUN cd shared && npm install && cd ..

# Instala dependências dos workspaces via pnpm
RUN pnpm run install:deps

# Expor as portas dos microfrontends
EXPOSE 4173
EXPOSE 4174
EXPOSE 4175

# Comando para rodar todos os microfrontends
CMD ["pnpm", "run", "dev"] 