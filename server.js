const express=require('express');
const app=express();
const dotenv=require('dotenv');
const cors=require('cors');
const connectToDatabase = require('./config/connectToDatabase');

dotenv.config({
    path: './config/config.env'
});

connectToDatabase();
const auth=require('./routes/auth.routes');
app.use(cors());
app.use(express.json({ extended: false }));
app.use('/api/auth',auth);

if(process.env.NODE_ENV==='production') {
    app.use(express.static('client/build'));

    app.get('*',(req,res) => res.sendFile('./client/build/index.html'));
}

app.get('/', (req,res) => {
    res.send('hello');
});

let PORT=process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));