## nodepop

It´s an **API** that works in **iOS** and **Android**.

## Init database

```shell
    npm run installDB

```

## Install dependencies

```shell
    npm install

```

## Start cluster

```shell
    npm run cluster

```

## mongoDB

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

## Language EN/ES
All requests that return error messages are localized to english, if you want to 
change language make the request with the header accept-language set to other language, 
i.e. Accept-Language: es 

## API Documentation

### POST /users/register

**Input Body**: { name, email, password}

**Result:** 

    {
      "success": true, 
      "message": "user created"
    }

### POST /users/login

**Input Body**: { email, password }

**Result:** 

    {
      "success": true, 
      "token": "..."
    }

After login, you will obtain a token (JWT)

Use that token in:
- Header: x-access-token: eyJ0eXAiO...
- Body: { token: eyJ0eXAiO... }
- Query string: ?token=eyJ0eXAiO...

### GET /ads

To get all the advertisements make a GET to: /apiv1/ads with a valid JWT

http://localhost:3000/apiv1/ads&token=jwt_valid_token

**Input Query**: 

skip: {int} skip records 
limit: {int} limit to records  
sort: {string} field name to sort by   
tag: {string} tag name to filter 
sale: {bool} filter by venta or not, example sale=true
price: {range} filter by price range, examples 10-50, -50, 10-, 50   
name: {string} filter names beginning with the string  
fields:{string} filter by field, examples ?fields=price- _id, ?fields=price%20name

Input query example: 
?tag=mobile&sale=false&name=ip&price=50-&skip=0&limit=2&sort=price&token=eyJ0eXAiO...

**Result:** 

    {
      "ok": true,
      "result": {
        "rows": [
          {
            "_id": "55fd9abda8cd1d9a240c8230",
            "nombre": "iPhone 3GS",
            "venta": false,
            "precio": 50,
            "foto": "/images/anuncios/iphone.png",
            "__v": 0,
            "tags": [
              "lifestyle",
              "mobile"
            ]
          }
        ],
        "total": 1
      }
    }

### GET /ads/tags

Return the list of available tags for the resource ads

**Result:** 

    {
        "success": true,
        "allowedTags": [
            "work",
            "lifestyle",
            "motor",
            "mobile"
        ]
    }∫

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
