FROM node:20

WORKDIR /app

# Copia package.json e package-lock.json
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia o resto dos arquivos
COPY . .

# Expõe a porta do Vite
EXPOSE 5173

# Comando para desenvolvimento
CMD ["npm", "run", "dev", "--", "--host"]