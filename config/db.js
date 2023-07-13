const mongoose = require('mongoose');
mongoose.set('strictQuery', false);


const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://kannasn003:JERRY003@hrm.qsf2yjr.mongodb.net/?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, 
    })
    
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
