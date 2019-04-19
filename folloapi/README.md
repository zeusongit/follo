# Follo-API

This project provides the Follo-API

## Config
Create a .env file at the root directory with the following properties 

DB_HOST=<your mongo host>:<port>

SERVER_PORT=<port for express server>

JWT_KEY=<jwt key>

## Default Config
If the the env file is not created, the api will run with the following properties:

DB_HOST=mongodb://localhost:27017

SERVER_PORT=3000

JWT_KEY=test


## Build

Run 
`npm install`

## Run

Run 
`npm start`

---
## API End Points with sample payload and headers

### User Authentication Endpoints
### POST /user/signup/
#### This will signup the user and provide authentication token.
```
headers: {
    Content-Type: application/json
}
```
```
body: {
	"firstName": "u1",
	"lastName": "u1",
	"email": "u1@u1.com",
	"password": "u1",
	"username": "u1"
}
```
```
response : {
    "email": "u1@u1.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InUxQHUxLmNvbSIsImlhdCI6MTU1NTM5ODcwM30"
}
```

### POST /user/login
#### This will login the user and provide provide authentication token.
```
headers: {
    Content-Type: application/json
}
```
```
body: {
	"email": "u1@u1.com",
	"password": "u1",
}
```
```
response : {
    
    "user": "u1@u1.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InUxQHUxLmNvbSIsImlhdCI6MTU1NTM5ODczMH0"

}
```
### POST /user/me 
#### This will return the user details, provided the user is authenticated (protected).
```
headers: {
    Content-Type: application/json
}
```
```
body: {
	"email": "u1@u1.com",
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InUxQHUxLmNvbSIsImlhdCI6MTU1NTM"
}
```
```
response : {
    "firstName": "u1",    
    "lastName": "u1",    
    "email": "u1@u1.com",
    "username": "u1"
}
```

### POST /user/logout
#### This will logout the user (protected).
```
headers: {
    Content-Type: application/json,
    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InUxQHUxLmNvbSIsImlhdCI6MT
}
```
```
response: {
    "status": 200,
    "message": "logged out"
}
```
---
### Post Related Endpoints
### POST /user/signup/
#### This will signup the user and provide authentication token (protected).
```
headers: {
    Content-Type: application/json
}
```
```
body: {
	"firstName": "u1",
	"lastName": "u1",
	"email": "u1@u1.com",
	"password": "u1",
	"username": "u1"
}
```
```
response : {
    "email": "u1@u1.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InUxQHUxLmNvbSIsImlhdCI6MTU1NTM5ODcwM30"
}
```
