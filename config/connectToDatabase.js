const mongoose = require('mongoose');

const connectToDatabase = async () => {
    try {
        const connection=await mongoose.connect(
            process.env.MONGO_URI,
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