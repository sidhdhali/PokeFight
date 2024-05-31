import mongoose, { connection } from 'mongoose'

const connectDB = async () =>
{
  try
  {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected`);
    console.log(connection.connection.db.databasename)
  }
  catch (error)
  {
    console.log(`connection error:`, error.stack)
  }
}
connectDB();
