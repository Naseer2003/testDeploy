# Clone repo
git clone <your_repo_url>

# Install dependencies
npm install

# Setup environment variables in .env
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret

# Run server
npm run dev

# API
http://localhost:5000/api

# Authentication APIs #

# register
POST http://localhost:5000/api/user/register

{
  "username": "john",
  "email": "john@mail.com",
  "password": "123456"
}

# login
POST http://localhost:5000/api/user/login

{
  "email": "john@mail.com",
  "password": "123456"
}

Response : {
  "token": "jwt_token_here"
}

# logout
POST http://localhost:5000/api/user/logout


# Admin only api's #

# Get All Users (Admin only)
GET http://localhost:5000/api/admin/getAllUsers

{
  "users": [
    { "_id": "1", "username": "John", "email": "john@mail.com" }
  ]
}

# Delete User (Admin only)
DELETE http://localhost:5000/api/admin/removeUser/:id

Authorization: Bearer <admin_token>

# 📂 File & Folder APIs

# Upload File
POST http://localhost:5000/api/files/upload

Body → form-data:

file: type: File

folder: type: Text, e.g. "myfolder"

{
  "_id": "...",
  "name": "myimage",
  "url": "https://res.cloudinary.com/your_cloud_name/image/upload/....jpg",
  "folder": "myfolder",
  "size": 12345,
  "type": "jpg",
  "createdAt": "...",
  "__v": 0
}

# Get All Folders
GET http://localhost:5000/api/files/folders

# Get Files in Folder
GET http://localhost:5000/api/files/:folderName

ex : GET http://localhost:5000/api/files/myFolder

# ✅ Summary of Endpoints

| Method | Endpoint                    | Description                     |
| ------ | --------------------------- | ------------------------------- |
| POST   | `/api/user/register`        | Register new user               |
| POST   | `/api/user/login`           | Login user                      |
| POST   | `/api/user/logout`          | Logout user                     |
| GET    | `/api/user/protected`       | Protected route (auth required) |
| GET    | `/api/admin/getAllUsers`    | Get all users (admin only)      |
| DELETE | `/api/admin/removeUser/:id` | Delete user (admin only)        |
| POST   | `/api/files/upload`         | Upload a file                   |
| GET    | `/api/files/folders`        | Get all folders                 |
| GET    | `/api/files/:folderName`    | Get files in folder             |


