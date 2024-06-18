#### Inside the assesment folder (Frontend)Full Stack Application

# This repository contains a full stack application with separate frontend and backend components.



# Frontend React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Steps to start frontend
    1. Clone the repository
    2. cd ./assesment
    3. Run `npm install` to install all dependencies
    4. Run `npm run dev` to start the development server
    5. Open `http://localhost:5173/` in your browser to see the app



*******************************************************************

# Backend NodeJs + Fastify

This setup provide minimal setup for running a fastify backend server

## Steps to start backend
    1. Clone the repository
    2. cd ./start_backend
    3. Run `npm install` to install all dependencies
    4. Replace the mySQL server url with your url from env file
    5. Run `npx prisma db push` for database migration or synching
    6. Run `npm run dev` to start the server in development mode
    7. Open `http://127.0.0.1:5105/api-documentation` in your browser to see the swageer api or open api
    8. Open `http://127.0.0.1:5105/api/v1` in your browser to see the swageer api or open api




## Environment Variables
    Both frontend and backend configurations rely on a .env file, which is included in this repository. No additional setup is required for environment variables.

Usage
After starting both frontend and backend servers using npm run dev, you can access the application at http://localhost:5173 for the frontend and the backend APIs will be available accordingly.
Contributing
Feel free to fork this repository and submit pull requests with any improvements or fixes.

License
This project is licensed under the MIT License.