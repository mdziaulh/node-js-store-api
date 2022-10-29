const http = require('http');
const app = require('./app');
const connectDB = require('./db/connect');

require('dotenv').config();
require('express-async-errors');

const server = http.createServer(app);

const PORT = process.env.PORT || 3000;

async function startServer(){
    try {
        // connect to DB
        await connectDB(process.env.MONGO_URL);
        server.listen(PORT, () => {
            console.log(`Listening to the server on port: ${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
}

// Start the server
startServer();