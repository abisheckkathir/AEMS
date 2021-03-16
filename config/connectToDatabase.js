const mongoose = require('mongoose');
const config = require('config');

const connectToDatabase = async () => {
    try {
        await mongoose.connect(
            config.get('mongoURI'),
            {
                useCreateIndex: true,
                useFindAndModify: true,
                useUnifiedTopology: true,
                useNewUrlParser: true
            }
        )
        console.log('Conneceted to DB')
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports=connectToDatabase;