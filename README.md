# Bem-vindo ao Projeto NG-Challenge!

Este é um projeto que foi desenvolvido na etapa de desafio técnico do processo seletivo da NG.CASH.
Trata-se de uma API que simula uma plataforma de banco.

## Tecnologias utilizadas

Em seu desenvolvimento foi utilizada linguagem ***TypeScript*** para escrever os códigos e ***Node.js*** juntamente com o framework ***Express*** para fornecer toda a estrutura que possibilitou a construção dos endpoints da aplicação. 

Fora isso, foi utilizado o ORM ***Sequelize***, que é o responsável por toda a abstração de consultas e manipulações do banco de dados PostgreSQL.

Para a geração e verificação de tokens foi utilizado o ***JWT*** (JSON Web Token), com ele é possível verificar se o usuário está devidamente autenticado e se ele tem permissões para realizar determinadas ações, como consultar o saldo em sua conta, realizar transferências para outros usuários e consultar todas as transferências que ele participou.

Para armazenar a senha do usuário no banco de dados com mais segurança foi utilizada a biblioteca ***bcrypt***, que permite transformar a senha em uma hash e também fazer a comparação da senha enviada ao fazer login e a hash salva no banco de dados. 

E por fim, para os testes de integração foi utilizado ***Mocha*** e ***Chai*** para estruturar os testes e fazer as asserções e o ***Sinon*** para mockar as funções, não permitindo que os testes tivessem acesso ao banco de dados.

## O que foi desenvolvido

  - Banco de dados PostgreSQL utilizando o Sequelize. Este banco possui tabelas que armazenam informações dos usuários, das contas e das transações; 
  - Endpoints que lêem e escrevem em um banco de dados PostgreSQL;
  - Middlewares que realizam verificações dos dados enviados nas requisições e se o usuário está autenticado e possui permissão para realizar determinadas ações;
  - Divisão da aplicação em camadas (arquitetura MSC), o que permite uma maior organização do código e maior facilidade de manutenção;
  - Testes de integração que dão uma maior segurança na hora de refatorar o código, sem correr o risco de quebrar a aplicação.

## Como rodar o projeto na sua máquina utilizando o Docker:

1. Navegue até o local onde deseja clonar o repositório e utilize o **git clone**:
```
git clone git@github.com:Tayna-Silva-Macedo/NG-Challenge.git
```

2. Acesse o diretório do projeto **NG-Challenge** e instale as dependências necessárias:
```
cd NG-Challenge
npm install
```

3. Suba o container Docker para rodar os serviços utilizando o comando:
```
docker-compose up -d --build
```

> ℹ️ Ao subir a aplicação, o serviço de Back-end estará rodando na porta 3001, o banco de dados PostgreSQL estará rodando na porta 5432 e a ferramenta de gerenciamento de banco de dados Adminer estará rodando na porta 8080.

4. Para rodar os testes de integração é utilizado o seguinte comando:

```
npm test
```

## Endpoints da API:

#### Cadastro de usuário

|Método |Funcionalidade                                                                     |URL                                          |
|:-----:|:---------------------------------------------------------------------------------:|:-------------------------------------------:|
|`POST` |Realiza o cadastro de um novo usuário e retorna o usuário cadastrado               |http://localhost:3001/register               |

Na requisição `POST`, é necessário informar um JSON no seguinte formato:

```
{
	"username": "taynasm",
	"password": "1234567AbC"
}
```

#### Login

|Método |Funcionalidade                                                                    |URL                                           |
|:-----:|:--------------------------------------------------------------------------------:|:--------------------------------------------:|
|`POST` |Realiza o login do usuário e retorna um token                                     |http://localhost:3001/login                   |

Na requisição `POST`, é necessário informar um JSON no seguinte formato:

```
{
	"username": "taynasm",
	"password": "1234567AbC"
}
```

#### Saldo

|Método |Funcionalidade                                                                    |URL                                           |
|:-----:|:--------------------------------------------------------------------------------:|:--------------------------------------------:|
|`GET`  |Retorna o saldo do usuário logado                                                 |http://localhost:3001/balance                 |

#### Transações

|Método|Funcionalidade                                                                    |URL                                                        |
|:----:|:--------------------------------------------------------------------------------:|:---------------------------------------------------------:|
|`POST`|Realiza o cadastro de uma nova transação e retorna essa transação cadastrada      |http://localhost:3001/transactions                         |
|`GET` |Retorna todas as transações que o usuário logado participou                       |http://localhost:3001/transactions                         |
|`GET` |Retorna todas as transações que o usuário logado participou filtrando pela data   |http://localhost:3001/transactions?date=AAAA-MM-DD         |
|`GET` |Retorna as transações cash-in que o usuário logado participou                     |http://localhost:3001/transactions/cash-in                 |
|`GET` |Retorna as transações cash-in que o usuário logado participou filtrando pela data |http://localhost:3001/transactions/cash-in?date=AAAA-MM-DD |
|`GET` |Retorna as transações cash-out que o usuário logado participou                    |http://localhost:3001/transactions/cash-out                |
|`GET` |Retorna as transações cash-out que o usuário logado participou filtrando pela data|http://localhost:3001/transactions/cash-out?date=AAAA-MM-DD|

Na requisição `POST` é necessário informar um JSON no seguinte formato:

```
{
	"username": "taynasm",
	"value": 50
}
```
