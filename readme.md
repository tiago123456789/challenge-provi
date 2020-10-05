Requisitos:
============

- Node.js versão 12.18.3
- Npm versão 6.14.6
- pm2
- Docker
- Docker compose


Configurar ambiente de desenvolvimento:
========================================

- Clonar o projeto
- Acessar o projeto e depois executar o comando: **npm install**
- Na raiz do projeto criar um diretório chamando *logs*
- Criar um arquivo **.env** baseado no arquivo **.env.example**
- Na raiz do projeto executar o comando: **docker-compose up -d** para criar o banco de dados do mongodb e redis.
- Na raiz do projeto executar o comando: **npm run job:create-steps** para criar os steps(que são o campos parar atualizar. Como: cpf, full-name, phone-number, address e etc)
- Na raiz do projeto executar o comando: **npm run start:dev** para levandar o servidor da aplicação.

Configurar ambiente de produção:
================================

- Clonar o projeto
- Acessar o projeto e depois executar o comando: **npm install --only=production**
- Na raiz do projeto criar um diretório chamando *logs*
- Criar um arquivo **.env** baseado no arquivo **.env.example**
- Na raiz do projeto executar o comando: **npm run job:create-steps** para criar os steps(que são o campos parar atualizar. Como: cpf, full-name, phone-number, address e etc)
- Na raiz do projeto executar o comando: **npm run start** para fazer o build do código typescript e depois levandar o servidor da aplicação.


Configurações para rodar os testes:
====================================

- Clonar o projeto
- Acessar o projeto e depois executar o comando: **npm install**
- Na raiz do projeto criar um diretório chamando *logs*
- Criar um arquivo **.env.testing** baseado no arquivo **.env.example**
- Na raiz do projeto executar o comando: **docker-compose up -d** para criar o banco de dados do mongodb e redis.
- Na raiz do projeto executar o comando: **npm run job:create-steps** para criar os steps(que são o campos parar atualizar. Como: cpf, full-name, phone-number, address e etc)
- Na raiz do projeto executar o comando: **npm test** para rodar os testes de unidade e integração.


OBSERVAÇÕES:
============

- Na raiz do projeto existe um arquivo chamado *provi_challenge.postman_collection.json* que deve ser importado no postman. Ele contém as rotas da aplicação.
- Existem duas rotas:
    - /api/v1/users para criar um usuário
    - /api/v1/users/cpf para adicionar os dados referentes ao campo informado. Exemplo nesse caso foi informado o campo **cpf**, mas existem outras como: **full-name**, **phone-number**, etc. Você poderá encontrar os campos disponíveis em ./src/jobs/CreateStepsDefault.ts e pode ser adicionado novos campos. A ordem dos campos é baseada na informação **createdAt**
