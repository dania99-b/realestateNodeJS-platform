# realestateNodeJS-platform

Overview:
RealEstate Backend project using Node.js (Fastify), Prisma (MySQL), and MongoDB Atlas.
Includes a Laravel mini-task for listing retrieval.

------------------------------------------------------------
Table of Contents:
1. Prerequisites
2. Environment Setup
3. Database Configuration
4. Environment Variables
5. Installing Dependencies & Migrations
6. Running the Project
7. API Endpoints
8. Design Decisions
9. Future Improvements
10. Project Structure
11. Submission Details
------------------------------------------------------------

1. Prerequisites:
- Git
- Node.js >=16 + npm/yarn
- MySQL (XAMPP recommended)
- MongoDB Atlas (free tier)

------------------------------------------------------------
2. Environment Setup:
1. Install Node.js and npm/yarn
2. Start XAMPP → Start MySQL & open phpMyAdmin (http://localhost/phpmyadmin)
3. MongoDB Atlas → Create cluster, add DB user, whitelist your IP

------------------------------------------------------------
3. Database Configuration:

MySQL:
1. Create database:
   CREATE DATABASE realEstate;
2. Update Prisma datasource in prisma/schema.prisma:
   DATABASE_URL="mysql://root:your_mysql_password@127.0.0.1:3306/realEstate"

MongoDB:
Connection string example:
   MONGODB_URI="mongodb+srv://<mongo_user>:<mongo_password>@cluster0.xyz.mongodb.net/realEstate?retryWrites=true&w=majority"
> Make sure your IP is whitelisted in Atlas

------------------------------------------------------------
4. Environment Variables (.env):

# MySQL
DATABASE_URL="mysql://root:your_mysql_password@127.0.0.1:3306/realEstate"

# MongoDB
MONGODB_URI="mongodb+srv://<mongo_user>:<mongo_password>@cluster0.xyz.mongodb.net/realEstate?retryWrites=true&w=majority"

------------------------------------------------------------
5. Installing Dependencies & Migrations:

# Install Node dependencies
npm install
# or
yarn

# Prisma generate & migrate
npx prisma generate
npx prisma migrate dev --name init

# Migrate MySQL data to MongoDB
node migrateToMongo.js
# Ensure agentId in MongoDB references correct Agent._id

------------------------------------------------------------
6. Running the Project:

Node.js API:
node realEstate.js

Laravel mini-task:
php artisan serve

------------------------------------------------------------
7. Design Decisions:

- Fastify for high-performance Node server
- Prisma ORM for MySQL — type-safe & migrations
- Mongoose + MongoDB Atlas — aggregation-friendly
- mysqlId in MongoDB links Agents & Listings

------------------------------------------------------------
8. Future Improvements:

1. JWT Authentication
2. Unit & Integration Testing
3. Dockerize MySQL, MongoDB & Node app
4. CI/CD with GitHub Actions
5. Centralized Logging & APM
6. Redis caching for heavy aggregations

------------------------------------------------------------
9. Project Structure:

/node-api
  /src
  /prisma
  migrateToMongo.js
  package.json
  .env.example

/laravel-api
  app/
  routes/
  .env.example

/postman_collection.json
README.txt

------------------------------------------------------------
10. Submission Details:

- LinkedIn Profile: https://www.linkedin.com/in/your-profile
- Self-Rating: 8/10
- Postman Collection: included in repo
  
------------------------------------------------------------
11. Postman Collection: [👉 Download Postman Collection](https://github.com/dania99-b/realestateNodeJS-platform/blob/main/Real_state.postman_collection.json)


------------------------------------------------------------
End of README
------------------------------------------------------------
