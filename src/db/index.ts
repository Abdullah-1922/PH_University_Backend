
import config from "../app/config";
import mongoose from "mongoose";

const connectDB= async () => {
  try {

    const connectionInstance = await mongoose.connect(`${config.DATABASE_URL}`)
     console.log(`Mongodb connected !! DB HOST ${connectionInstance.connection.host}`);
  } catch (err) {

    console.log('mongodb connection error',err);
    process.exit(1)
  }
};

export default connectDB