const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const cookieParcer = require("cookie-parser");
const fileUpload = require("express-fileupload");

// regular middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cors to connect with frontend
app.use(cors());

// cookie & fileUpload
app.use(cookieParcer());
app.use(fileUpload());

// for swagger documentation
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocumentation = YAML.load("./swagger.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocumentation));

// morgan middleware
app.use(morgan("tiny"));

// import all routes here
const home = require("./routes/Home");

// router middleware

app.use("/api/v1", home);

// export app
module.exports = app;
