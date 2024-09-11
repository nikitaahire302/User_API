# User Management API

This is a Node.js and Express.js-based API for managing user data, offering full CRUD (Create, Read, Update, Delete) operations with pagination support and rate-limiting. The API also utilizes environment variables to manage an `API_ID` for each request and CORS for cross-origin access.
## API Documentation link :  https://documenter.getpostman.com/view/38177037/2sAXqmB5rz

## Features

- **CRUD Operations**: Create, Read, Update, Delete user data.
- **Pagination**: Easily retrieve user data in chunks with `page` and `limit` query parameters.
- **Rate Limiting**: Limits requests to 100 per 15 minutes per IP to prevent abuse.
- **Custom Middleware**: Adds `API_ID` to each request for identification purposes.
- **Environment Variables**: Manage sensitive data like `PORT` and `API_ID` through a `.env` file.

## API Endpoints

### Get All Users (with Pagination)
```bash
GET /users?page=<page>&limit=<limit>

Retrieves a paginated list of users.
Parameters:
page: The page number (default is 1).
limit: The number of users per page (default is 5).

Get User by ID : GET /users/:id

Update User (Replace) : PUT /users/:id

Update User (Partial) : PATCH /users/:id

Delete User : DELETE /users/:id

#Installation :
1.Clone the repository: ....

2.Install dependencies: npm install

3.Start the server: npm run dev

#Usage
After starting the server, you can access the API via http://localhost:3000. Use tools like Postman or cURL to test the endpoints.

#Technologies Used
Node.js
Express.js
CORS for cross-origin resource sharing
dotenv for environment variables
express-rate-limit for rate limiting# User_API
