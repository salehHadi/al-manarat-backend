const app = require("./app");
require("dotenv").config();
const connectWithDB = require("./config/DB-Connecteion");
const cloudinary = require("cloudinary");

// connect with Database
connectWithDB();

// config Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.listen(4000, () => {
  console.log(`server is running at PORT 4000`);
});
