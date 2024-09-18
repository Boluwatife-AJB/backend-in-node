# JWT-AUTH-EXPRESS

This project is a simple authentication system using JWT (JSON Web Tokens) with Express.js. It includes user signup and signin functionalities, and protects routes using JWT middleware.

## Table of Contents

- [JWT-AUTH-EXPRESS](#jwt-auth-express)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Signup](#signup)
    - [Signin](#signin)
  - [Environment Variables](#environment-variables)
  - [API Endpoints](#api-endpoints)
  - [Project Structure](#project-structure)
    - [Controllers](#controllers)
    - [Middleware](#middleware)
    - [Models](#models)
    - [Routes](#routes)
    - [Config](#config)
  - [License](#license)


## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/Boluwatife-AJB/backend-in-node.git
    cd backend-in-node 
    ```

2. Switch to the jwt-auth-flow branch
    ```sh
    git checkout jwt-auth-flow
    ```

3. Install dependencies
    ```sh
    npm install
    ```
   
4. Create a .env file in the root directory and add the following environment variable:
    ```sh
    PORT=yourPortNumber
    MONGODB_URI=yourMongoDBConnectionURI
    JWT_SECRET=your_jwt_secret_key
    JWT_EXPIRES_IN=ExpirationTimeForJWTTokens
    JWT_COOKIE_EXPIRES_IN=ExpirationTimeForJWTCookies(in days)
    ```

5. Start the server
    ```sh
    npm start
    ```

## Usage

### Signup

To create a new user, send a POST request to `/signup` with the following JSON payload:
```bash
{
   "first_name": "Simon",
   "last_name": "Barjona",
   "email": "simonbarjona@example.com",
   "password": "yourpassword"
}
```

### Signin

To authenticate a user, send a POST request to `/signin` with the following JSON payload:
```bash
{
   "email": "simonbarjona@example.com",
   "password": "yourpassword"
}
```


## Environment Variables
The following environment variables need to be set in the `.env` file:

   - `PORT`: The port on which the server will run.
   - `MONGODB_URI`: The MongoDB connection string.
   - `JWT_SECRET`: The secret key for signing JWT tokens.
   - `JWT_EXPIRES_IN`: The expiration time for JWT tokens.
   - `JWT_COOKIE_EXPIRES_IN`: The expiration time for JWT cookies.
   

## API Endpoints
    
   - `POST /api/auth/signup`: Create a new user and returns a JWT token.
   - `POST /api/auth/signin`: Authenticates a user and returns a JWT token.


## Project Structure

```sh 
backend-in-node/
├── config/
│   └── db.js
├── controllers/
│   └── authController.js
├── middleware/
│   └── authMiddleware.js
├── models/
│   └── user.js
├── routes/
│   └── authRoutes.js
├── .env
├── app.js
├── package.json
├── README.md
└── server.js
```

### Controllers

   - **authController.js**: Contains the logic for user signup and signin.

### Middleware

   - **authMiddleware.js**: Middleware to verify JWT tokens.

### Models

   - **user.js**: Mongoose schema and model for the user.
  
### Routes

   - **authRoutes.js**: Defines the routes for user signup and signin.

### Config

   - **db.js**: This file contains the configuration and connection logic for MongoDB using Mongoose. 

## License
This project is licensed under the `MIT` License. See the LICENSE file for details.