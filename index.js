const app = require("./app");
require("dotenv").config();
const connectWithDB = require("./config/DB-Connecteion");

// connect with Database
connectWithDB();

app.listen(4000, () => {
  console.log(`server is running at PORT 4000`);
});
