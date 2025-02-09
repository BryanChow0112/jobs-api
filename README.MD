# Jobs API

A RESTful API for managing job postings. Built with Node.js, Express and secured with JWT authentication, this API allows users to create, retrieve, update, and delete job listings.


## Badges

![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)


## Features

-   **User Authentication:**
    -   Secure user registration and login using JWT (JSON Web Tokens).
    -   Passwords are encrypted using bcryptjs before storage.
-   **Job Management:**
    -   Create, retrieve, update, and delete job postings.
    -   Authenticated access ensures that only authorized users can manage job data.


## Security

-   `helmet`: Sets various HTTP headers to help secure the application.
-   `cors`: Configured to allow requests from specific origins (configure carefully!).
-   `xss-clean`: Sanitizes user input to prevent XSS attacks.
-   `express-rate-limit`: Limits the number of requests from a single IP address.


## Endpoints

### Authentication (`/api/v1/auth`)

- #### POST `/register`: Registers a new user.
- #### POST `/login`: Logs in an existing user.

#### Request Body:
```json
{
    "name": "John",
    "email": "john@example.com",
    "password": "secret"
}
```


### Jobs (`/api/v1/jobs`)

Note: All endpoints under /api/v1/jobs require a valid JWT in the Authorization header.

- #### GET `/`: Retrieves all job postings.
- #### POST `/`: Creates a new job posting.
- #### GET `/:id`: Retrieves a single job posting by ID.
- #### DELETE `/:id`: Deletes a job posting by ID.
- #### PATCH `/:id`: Updates a job posting by ID.

#### Request Body:
```json
{
    "company": "Google",
    "position": "Software Engineer",
    "status": "pending" // optional
}
```
