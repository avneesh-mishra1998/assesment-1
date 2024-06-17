#### Inside the assesment folder (Frontend)Full Stack Application

# This repository contains a full stack application with separate frontend and backend components.

## Frontend (Assessment folder)

    The frontend is built using React with Vite as the bundler and Redux for state management.

# Getting Started
    Navigate to the assessment folder:

    bash
    Copy code
    move to folder
    Install dependencies:
    Running the Frontend

   # bash
    Copy code
    cd assesment
    npm install
    npm run dev
    To start the frontend development server:

    This command will run the frontend using Vite.

## Backend (Backend folder)
   # use url for swagger docs: http://127.0.0.1:5105/api-documentation
    The backend is implemented with Fastify and uses JWT for authentication.

    Getting Started
    Move to the start_backend directory:

    bash
    Copy code
    move to folder
    Install dependencies:
    Running the Backend
    To start the backend server:


   # bash
    Copy code
    cd start_backend
    npm install
    npm run dev

    This command will start the backend server using Fastify. 

## Environment Variables
    Both frontend and backend configurations rely on a .env file, which is included in this repository. No additional setup is required for environment variables.

Usage
After starting both frontend and backend servers using npm run dev, you can access the application at http://localhost:5173 for the frontend and the backend APIs will be available accordingly.
Contributing
Feel free to fork this repository and submit pull requests with any improvements or fixes.

License
This project is licensed under the MIT License.