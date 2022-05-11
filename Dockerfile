FROM node:15

# diretório criado no container
WORKDIR /usr/src/

# copia todos os arquivos para o container
COPY . . 

RUN npm i 
#só executa quando rodarmos a imagem
CMD ["npx", "nodemon", "src/server.ts"] 