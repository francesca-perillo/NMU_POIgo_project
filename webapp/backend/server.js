const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://poiGo:emadproject21@cluster0.sb9vr.mongodb.net/poiGo"
mongoose.connect(uri, { useNewUrlParser: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const categories = require('../../Backend/routes/category');

app.use('/category', categories);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});