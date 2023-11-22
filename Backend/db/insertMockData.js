const mongoose = require('mongoose');
const UserHeliverse= require('../model/user'); 

console.log("hello");
const MONGODB_ATLAS_URI = MONGO_URI;

const insertMockData = async () => {
  try {
    await mongoose.connect(MONGODB_ATLAS_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    const mockData = require('../heliverseMockData.json');

    await UserHeliverse.insertMany(  mockData );

    console.log('Mock data inserted successfully.');
  } catch (error) {
    console.error('Error inserting mock data:', error);
  } finally {
    mongoose.connection.close();
  }
};

insertMockData();
