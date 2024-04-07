import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongoUri = process.env.DB_CONNECION;
    await mongoose.connect(mongoUri, {
      autoIndex: true,
    });
    console.log(`Connected to mongo database`);
  } catch (error) {
    console.error(`Error in mongo connection: ${error.message}`);
  }
};

export default connectDB;
