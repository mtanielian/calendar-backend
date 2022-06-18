const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    console.log('MongoDB Connected...')
  } catch (error) {
    console.log(error);
    throw new Error('MongoDB Connection Failed!');
  }
}




module.exports = { dbConnection }