# Follo-API

This project provides the Follo-API

## Config
Create a .env file at the root directory with the following properties 

DB_HOST=`<your mongo host>`:`<port>`

SERVER_PORT=`<port for express server>`

JWT_KEY=`<jwt key>`

### Default Config
If the the env file is not created, the api will run with the following properties:

DB_HOST=`mongodb://localhost:27017`

SERVER_PORT=`3000`

JWT_KEY=`test`


## Build

Run 
`npm install`

## Run

Run 
`npm start`

---
## API End Points with sample payload and headers
For complete list of attributes of a component, refer to its schema.

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
    Content-Type: application/json,
    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InUxQHUxLmNvbSIsImlhdCI6MT
}
```
```
body: {
	"email": "u1@u1.com",	
}
```
```
response : {
   "lastName": "u1",
    "profilePicture": "",
    "_id": "5cb919bbdb53e2273481680e",
    "firstName": "u1",
    "email": "u1@u1.com",
    "username": "u1",
    "createdCommunities": [],
    "followingCommunities": [],
    "createdPosts": [],
    "upvotes": [],
    "downvotes": []
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
### POST /user/:username/post/
#### This will add a post to the user account (protected).
```
headers: {
    Content-Type: application/json,
    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InUxQHUxLmNvbSIsImlhdCI6MT
}
```
In case of Text Post:
```
body: {
    "type":"text",
    "title": "My Post",
    "content": "This is my text post"
}
```
In case of Media Post:
```
body: {
    "title": "My Post",
    "type":"image",
    "content": "This is my image post",
    "post_media":[
        {
            "name":"aaaa.jpg",
            "url":"s3_location_of_image1"
        },
        {
            "name":"bbbb.jpg",
            "url":"s3_location_of_image2"
        }
    ]
}
```
In case of Event Post:
```
body: {
    "title": "My Post",
    "type":"event",
    "content": "This is my event post",
}
```
```
response : {
    "post": {
        "parent_community": {
            "_id": "5cb66e8af948654a7c8dc947",
            "cname": "carr1"
        },
        "created_by": {
            "_id": "5cb919bbdb53e2273481680e",
            "username": "u1"
        },
        "content": "This is my text post",
        "type": "text",
        "is_active": true,
        "_id": "5cbb21d290ba7017e49e6a21",
        "title": "My Post",
        "event_desc": [],
        "post_media": [],
        "posted_on": "2019-04-20T13:42:42.235Z",
        "last_updated_on": "2019-04-20T13:42:42.235Z",
        "__v": 0
    }
}
```
### PUT /user/:username/post/:postid
#### This will update user's post (protected).
```
headers: {
    Content-Type: application/json,
    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InUxQHUxLmNvbSIsImlhdCI6MT
}
```
In case of Text Post:
```
body: {
	"title": "My Post Update",
	"content": "This is my updated text post"
}
```
In case of Image Post:
```
body: {
	"title": "My Post",
	"content": "This is my updated image post",
    "images":[
        {
            "url":"S3://s3_location_of_image1"
        },
        {
            "url":"S3://s3_location_of_image2"
        }
    ]
}
```
```
response : {
    "id": "9999999999999999"
}
```
### GET /user/:username/post/
#### This will get all posts of the user (protected).
```
headers: {
    Content-Type: application/json,
    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InUxQHUxLmNvbSIsImlhdCI6MT
}
```
```
response : {
    "posts":[
        {
            "id":"2123121",
            "title": "My Post",
            "type":"text",
	        "content": "This is my text post",
            "last_updated_on":"01/01/2019 00:00:00",
            "posted_on":"01/01/2019 00:00:00",
            "upvotes":1,
            "downvotes":0
        },
        {
            "id":"2123122",
            "title": "My Post2",
            "type":"image",
	        "content": "This is my image post",
            "images":[
                {
                    "url":"S3://s3_location_of_image1"
                },
                {
                    "url":"S3://s3_location_of_image2"
                }
            ]            
            "last_updated_on":"01/01/2019 00:00:00",
            "posted_on":"01/01/2019 00:00:00",
            "upvotes":1,
            "downvotes":0
        }
    ]
}
```
### GET /user/:username/post/:postid
#### This will get a specific post (protected).
```
headers: {
    Content-Type: application/json,
    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InUxQHUxLmNvbSIsImlhdCI6MT
}
```
```
response : {
    "id": "9999999999999999"
}
```