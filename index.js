const express = require('express');
const env = require('dotenv');
const app = express();
const mongoose = require('mongoose');
const e = require('express');

//Environment varibale
env.config();

//MongoDb connection
mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.fkuer.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }
).then(() => { 
    console.log('Database connection successful');
});

//Server test
app.get('/health-check', (req, res) => {
    res.status(200).json({
        message: "Hello from Server"
    })
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on ${process.env.PORT}`)
});
