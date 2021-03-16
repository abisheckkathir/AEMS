const express=require('express');
const app=express();
const connectToDatabase = require('./config/connectToDatabase');

app.get('/', (req,res) => {
    res.send('hello');
});

let PORT=process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));