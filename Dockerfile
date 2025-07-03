# Use uma imagem base oficial do Node.js.
FROM node:18-slim

# Define o diretório de trabalho dentro do contêiner.
WORKDIR /app

# Instala as dependências necessárias para as linguagens de programação.
# g++ para C++, python3 para Python, e openjdk-17-jdk para Java.
RUN apt-get update && apt-get install -y g++ python3 openjdk-17-jdk && rm -rf /var/lib/apt/lists/*

# Copia os arquivos de definição de pacotes.
COPY package*.json ./

# Instala as dependências do Node.js.
RUN npm install

# Copia o restante do código da aplicação para o diretório de trabalho.
COPY . .

# Expõe a porta que o servidor Node.js usa.
EXPOSE 3000

# Comando para iniciar a aplicação quando o contêiner for executado.
CMD [ "node", "server.js" ]
