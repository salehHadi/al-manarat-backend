const mongoose = require("mongoose");

// `mongodb+srv://sasa97977s:${process.env.DB_PASS}@cluster0.ycpox6y.mongodb.net/Almanar-Backend?retryWrites=true&w=majority`,
const connectWithDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB GOT CONNECTED");
  } catch (error) {
    console.log("DB Conteccted Issue");
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectWithDB;
