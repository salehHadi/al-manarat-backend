const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const cookieParcer = require("cookie-parser");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");

// to get image from FrontEnd image
const corsOrigin = "http://localhost:3000/";
app.use(express.static(__dirname + "../.."));
app.use(cors());
app.use(
  cors({
    origin: [corsOrigin],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

// regular middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// cookie & fileUpload
app.use(cookieParcer());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: " /Users/mac/Desktop/al-manarat-backend/tmp",
  })
);

// for swagger documentation
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocumentation = YAML.load("./swagger.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocumentation));

// morgan middleware
app.use(morgan("tiny"));

// import all routes here
const home = require("./routes/Home");
const user = require("./routes/user");
const customer = require("./routes/customerRequest");
const project = require("./routes/project");

// router middleware

app.use("/api/v1", home);
app.use("/api/v1", user);
app.use("/api/v1", customer);
app.use("/api/v1", project);

// export app
module.exports = app;
