FROM node:18-alpine

WORKDIR /app

# Copia package.json e package-lock.json
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia o resto dos arquivos
COPY . .

# Expõe a porta
EXPOSE 4000

# Comando para desenvolvimento
CMD ["npm", "run", "dev"]