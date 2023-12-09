import mongoose from "mongoose";

const Connection = async () => {
    const URL = process.env.URL;
    try {
        const connectionInstance = await mongoose.connect(URL);
        console.log(`Database connected Successfully to: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log(`Error while connecting with the database`, error.message);
        process.exit(1)
    }
}

export default Connection;