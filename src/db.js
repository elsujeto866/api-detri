import mongoose from 'mongoose';

const conectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost/detridb');
        console.log('DB is connected');
    } catch (error) {
        console.log('Error in DB connection');
        console.log(error);
    }
};

export default conectDB;