## nodepop

## Init database

```shell
    npm run installDB

```

## Start cluster

```shell
    npm run cluster

```

## run mongoDB

This application uses mongoDB

To run:

```shell
./bin/mongod --dbpath ./data/db

```

## URL

localhost:3000

## Development

To start the app in dev mode use:

```shell

    npm run dev

```
## API Documentation

### Sign up

To sign up, make a POST to: /api/register/ with email, user and password

### Authentication

To obtain a token make a POST to: /apiv1/users/login with email & password

Use that token in:
- header: 'x-access-token'
- body: token
- query string: token

### GET advertisements

To get all the advertisements make a GET to: /apiv1/ads with a valid JWT

http://localhost:3000/apiv1/ads&token=jwt_valid_token

Filter by price:

?price=50

Filter by price between 10-50

?price=10-50 

Filter by price greater or equal than 10

?price=10-

Filter by price lower or equal than 50

?price=-50

Filter by name:

?name=Bike

Filter by sale:

?sale=false

Filter by fields:

?fields=price or ?fields=price%20name

By listing tags 

?fields=tags

To filter info:

?fields=price- _id

To paginate results you can use

?skip=1&limit2&fields=price

## ESLint

Local installation and usage:

```shell
npm install eslint --save-dev
```

setup configuration file:

```shell
./node_modules/.bin/eslint --init
```

run on project:

```shell
./node_modules/.bin/eslint ${workspaceFolder}/nodepop
```
