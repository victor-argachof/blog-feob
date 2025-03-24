# Blog em Next.js

Este repositório contém um projeto simplificado de painel administrativo para gerenciar posts e categorias de um blog, desenvolvido em Next.js (usando o App Router).

## Funcionalidades

* Autenticação de usuário (login e logout via JWT, usando rotas API do Next.js).

* Criação, edição e exclusão de posts.

* Criação, edição e exclusão de categorias.

* Listagem de posts e categorias com paginação.

* Layout administrativo unificado, contendo cabeçalho fixo (navbar) e rodapé próprios.


## Tecnologias

* Next.js 15 (App Router para implementar as funcionalidades de CRUD)

* React

* TypeScript

* MySQL (Railway)

* Tailwind CSS

* Tremor

* EasyMDE (Markdown Editor)


## Pré-requisitos

* Node.js >= 18

* MySQL (railway)

* Arquivo .env


## Configuração e execução

1. Instale as dependências:

```
npm install
```

2. Configure o arquivo .env contendo as variáveis de ambiente necessárias: (dados de conexão ao banco e JWT_SECRET)

Exemplo de .env:

```
# Variáveis de conexão com o MySQL (Railway)
DATABASE_HOST=mainline.proxy.rlwy.net
DATABASE_PORT=59291
DATABASE_USER=root
DATABASE_PASSWORD=
DATABASE_NAME=railway

# Variável para JWT
JWT_SECRET=
```

3. Execute o servidor de desenvolvimento

```
npm run dev
```

## Uso

* Acesse a página inicial `http://localhost:3000/` e navegue entre as publicações.

* Acesse a rota `/login` para realizar a autenticação e acessar o painel administrativo.

* Ao efetuar a autenticação, será possível gerenciar os posts e categorias do blog.


## Licença

**Todos os direitos reservados.**

Este software é fornecido “no estado em que se encontra” (as is), sem garantias de qualquer tipo.

A utilização, reprodução, distribuição ou modificação deste software ou de qualquer parte dele **é estritamente proibida sem autorização prévia, expressa e por escrito** do autor.
