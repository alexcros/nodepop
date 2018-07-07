## nodepop

## run mongoDB

This application uses mongoDB

To run:

```shell
./bin/mongod --dbpath ./data/db
```

## run mongoose



## cross-env

Installed en dev environment

## URL

localhost:3000

## Development

To start the app in dev mode use:

```shell

    npm run dev

```
## API Documentation

### Authentication

To obtain a token make a POST to: /apiv1/users/login with email & password

Use that token in:
- header: 'x-access-token'
- body: token
- query string: token

### Use JWT in every call

http://localhost:3000/apiv1/ads

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

To choose only some fields:

?fields=price- _id

To paginate results you can use

?skip=1&limit2&fields=price

## Script

mongoimport

