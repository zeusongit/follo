# Folloapi

This project provides the Follo-API

## Config
Create a .env file at the root directory with the following properties 

DB_HOST=<your mongo host>:<port>
SERVER_PORT=<port for express server>
JWT_KEY=<jwt key>

## Default Config
If the the env file is not created, the api will run with the following properties
DB_HOST=mongodb://localhost:27017
SERVER_PORT=3000
JWT_KEY=test

## Build

Run npm install

## Run

Run npm start

## API End Points with sample payload and headers

### POST /user/signup/
### This will signup the user and provide authentication token

headers: {
    Content-Type: application/json
}

body: {
	"firstName": "u1",
	"lastName": "u1",
	"email": "u1@u1.com",
	"password": "u1",
	"username": "u1"
}

response : {
    "email": "u1@u1.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InUxQHUxLmNvbSIsImlhdCI6MTU1NTM5ODcwM30.mDkc_lPcxFv1WFwhZPPYfcx0ScHsa1qox91IMfSnN8I"
}

### POST /user/login
### This will login the user and provide provide authentication token

headers: {
    Content-Type: application/json
}

body: {
	"email": "u1@u1.com",
	"password": "u1",
}

response : {
    
    "user": "u1@u1.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InUxQHUxLmNvbSIsImlhdCI6MTU1NTM5ODczMH0.CQU4keiDtk98FJ-7OaY0HGgP0Z85bNRRvkFoDPrtJWc"

}

### POST /user/logout
### This will logout the user

headers: {
    Content-Type: application/json,
    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InUxQHUxLmNvbSIsImlhdCI6MTU1NTM5ODczMH0.CQU4keiDtk98FJ-7OaY0HGgP0Z85bNRRvkFoDPrtJWc
}

response: {
    "status": 200,
    "message": "logged out"
}