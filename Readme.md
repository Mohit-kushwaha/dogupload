Dog and Authentication API
This project provides an API for managing dog pictures and user authentication (register, login, logout). It is built with Node.js, Express.js, MongoDB, and uses Swagger for API documentation.

Features
Upload, update, delete, and get dog pictures.
Register, login, and logout users.
API documentation via Swagger.
Requirements
To get this API up and running, ensure you have the following:

Node.js (v12 or later)
MongoDB (local or cloud)
Postman or any HTTP client for testing endpoints
Swagger UI for API documentation (provided)
Installation Instructions
Follow these steps to set up the project locally.

1. Clone the Repository
Clone this repository to your local machine.



git clone https://github.com/your-username/dog-auth-api.git
cd dog-auth-api
2. Install Dependencies
Install all the required dependencies using npm:



npm install
3. Set Up Environment Variables
Create a .env file in the root of your project and add the following:

env

MONGO_URI=mongodb://localhost:27017/dogAuthAPI or use mongodb+srv://admin:V2ZgkqXiVMbKQFjz@cluster0.cwuvqsl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=_:"^35]59cp6$Y=u,[="tD8JwV£S}3K'Ak*,O~vN+\4-b2Sd"J
PORT=3000
MONGO_URI: Your MongoDB connection string (local or cloud).
JWT_SECRET: A secret key to sign JWT tokens.
PORT: Port number for your server (default is 5000).
4. Start the Server
Once you have set up the environment variables, you can start the server.



npm start
Your server should now be running at http://localhost:3000.

5. API Documentation
Access the API documentation by navigating to:



http://localhost:3000/api-docs
Here, you can view all available API endpoints, including the ability to test them directly via Swagger UI.

6. Testing API Endpoints
You can use Postman or any HTTP client to test the API endpoints. Below are the available routes:

Authentication Routes:
POST /api/auth/register: Register a new user.
POST /api/auth/login: Login with username and password.
POST /api/auth/logout: Logout the current user.
Dog Routes:
POST /api/dogs: Upload a new dog picture (requires authentication).
GET /api/dogs: Get a list of all dogs.
GET /api/dogs/{id}: Get a specific dog by ID.
PUT /api/dogs/{id}: Update a dog picture (requires authentication).
DELETE /api/dogs/{id}: Delete a dog picture (requires authentication).
7. Example Request
Register a New User


POST /api/auth/register
Content-Type: application/json

{
  "username": "username",
  "password": "password123"
}
Login a User


POST /api/auth/login
Content-Type: application/json

{
  "username": "username",
  "password": "password123"
}
Upload a Dog Picture


POST /api/dogs
Content-Type: multipart/form-data
Authorization: Bearer <your_jwt_token>

{
  "name": "Buddy",
  "image": <image_file>
}
8. License
MIT License. See the LICENSE file for more information.