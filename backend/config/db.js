import mongoose from "mongoose";

const connectDb  = async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Connected to the database successfully");

    } catch(error){
        console.log("Error while connecting to the database", error.message);
    }
}

export default connectDb;
