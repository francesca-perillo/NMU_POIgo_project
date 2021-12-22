const server = require('./server');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Load environment variables from .env file
dotenv.config();

// Get the port from the environment or default to 3000
const PORT = process.env.PORT || 3000;

// Check if the required environment variables are set
if (!process.env.DB_CONNECTION_STRING)
    throw new Error('DB_CONNECTION_STRING is not set');

mongoose.connect(process.env.DB_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true }, error => {
    // If the connection fails, throw an error
    if (error)
        throw error;

    // If the connection is successful, console log a message saying so
    console.log('Connected to database');
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});