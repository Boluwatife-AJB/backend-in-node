# JWT-AUTH-EXPRESS

This project is a simple authentication system using JWT (JSON Web Tokens) with Express.js. It includes user signup and signin functionalities, and protects routes using JWT middleware.

## Table of Contents

- [JWT-AUTH-EXPRESS](#jwt-auth-express)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Signup](#signup)
    - [Signin](#signin)
    - [Forgot-Password](#forgot-password)
    - [Resend-OTP](#resend-otp)
    - [Verify-OTP](#verify-otp)
    - [Reset-Password](#reset-password)
  - [Environment Variables](#environment-variables)
  - [API Endpoints](#api-endpoints)
  - [Project Structure](#project-structure)
    - [Controllers](#controllers)
    - [Middleware](#middleware)
    - [Models](#models)
    - [Routes](#routes)
    - [Views](#views)
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
```sh
{
   "first_name": "Simon",
   "last_name": "Barjona",
   "email": "simonbarjona@example.com",
   "password": "yourpassword"
}
```

### Signin

To authenticate a user, send a POST request to `/signin` with the following JSON payload:
```sh
{
   "email": "simonbarjona@example.com",
   "password": "yourpassword"
}
```

### Forgot-Password

To initiate a password reset, send a POST request to `/auth/forgot-password` with the following JSON payload:
```sh
{
   "email": "simonbarjona@example.com"
}
```
This will send an OTP to the user's email address.

### Resend-OTP

To resend the OTP, send a GET request to `auth/resend-otp` with requires a resetToken gotten from the response from forgot-password route.

This will resend the OTP to the user's email address

### Verify-OTP

To verify the OTP, send a POST request to `/auth/verify-otp` with the following JSON payload:
```sh
{
   "otp": "123456"
}
```
This will verify the OTP provided by


### Reset-Password
To reset the password, send a POST request to `/auth/reset-password` with the following JSON payload:
```sh
{
   "new_password": "newpassword",
   "new_password_confirm": "newpassword"
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
│   ├── viewController.js
│   └── authController.js
├── middleware/
│   └── authMiddleware.js
├── models/
│   └── user.js
├── public/
│   ├── assets/
│   │    ├── images/
│   │    └── svg/
│   └── css/
├── routes/
│   ├── authRoutes.js
│   └── viewRoutes.js
├── utils/
│   └── email.js
├── views/
│   ├── pages/
│   │    ├── forgot-password.ejs
│   │    ├── index.ejs
│   │    ├── reset-password.ejs
│   │    ├── sign-in.ejs
│   │    ├── sign-up.ejs
│   │    └── verify-otp.ejs
│   └── partials/
│        └── head.ejs
├── .env
├── .env.example
├── app.js
├── package.json
├── README.md
├── server.js
└── tailwind.config.js
```

### Controllers

   - **authController.js**: Handles user authentication processes including signup, signin, password reset, and OTP verification. It uses JWT for token generation and bcrypt for password hashing. The controller functions interact with the User model and send responses to the client.
   - **viewController.js**: This file defines several controller functions that are used to render different views related to user authentication processes. Each function sets the appropriate status code and renders the corresponding view with a specific title.

### Middleware

   - **authMiddleware.js**: Middleware to verify JWT tokens.

### Models

   - **user.js**: Mongoose schema and model for the user.
  
### Routes

   - **authRoutes.js**: Defines the api routes for user signin, signup, forgot-password, resend-otp, verify-otp and reset-password.
   - **viewRoutes.js**: Defines the view routes for the signin, signup, forgot-password, resend-otp, verify-otp and reset-password pages.

### Views

The `views` folder contains the EJS templates used to render the frontend pages of the application. Here is a summary of the files:

- **pages/**
   - **forgot-password.ejs**: Template for the forgot password page where users can request a password reset.
   - **index.ejs**: Template for the home page.
   - **reset-password.ejs**: Template for the reset password page where users can set a new password.
   - **sign-in.ejs**: Template for the sign-in page where users can log into their accounts.
   - **sign-up.ejs**: Template for the sign-up page where users can create a new account.
   - **verify-otp.ejs**: Template for the OTP verification page where users can enter the OTP sent to their email.

- **partials/**
   - **head.ejs**: Template for the head section of the pages, including meta tags and stylesheets.

### Config

   - **db.js**: This file contains the configuration and connection logic for MongoDB using Mongoose. 



## License
This project is licensed under the `MIT` License. See the LICENSE file for details.