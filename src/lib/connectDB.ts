import mongoose from 'mongoose';

const connectDB = async () => {
    if (!process.env.DB_URI) {
        console.error('DB_URI not defined');
        return;
    }

    try {
        await mongoose.connect(process.env.DB_URI);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('Failed to connect to MongoDB', error);
    }
};

export default connectDB;