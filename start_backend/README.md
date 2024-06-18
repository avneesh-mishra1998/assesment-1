# NodeJs + Fastify

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
