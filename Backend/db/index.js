const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const dbURI = process.env.MONGODB_URI
// Connect to MongoDB (Update the connection URL)
console.log("check 4");

const connectDB = async () => {
  try { 
console.log("check 5");
    
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to mongoDB")
  }
  catch (error) {
    console.error("Error connecting to MongoDB")
  }
}
module.exports = connectDB;
