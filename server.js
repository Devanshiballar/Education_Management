const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

require("./config/db");
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cookieParser = require("cookie-parser");
app.use(cookieParser());
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: " Education_managemnt API",
    version: "1.0.0",
    description: "API for managing expenses",
  },
  servers: [
    {
      url: "http://localhost:5000/api", // Replace with your API base URL
    },
  ],
};
// Options for Swagger JSDoc
const options = {
  swaggerDefinition,
  // Path to the API docs
  apis: [
    "./routes/user.route.js",
    "./routes/admin.route.js",
    "./routes/teacher.route.js",
    "./routes/student.route.js",
  ], // Path where API routes are defined
};

// Initialize SwaggerJSDoc
const swaggerSpec = swaggerJsdoc(options);

// Use Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const userRoutes = require("./routes/userRoutes");

app.use("/api/v1", userRoutes);

app.get("/", (req, res) => {
  res.send(
    "<center><h1>E-Library Management Api</h1><br>Get Recipe Api <a href=https://github.com/Devanshiballar/E-Library-Management.git target=_blank>Repository :E-Library Management</a></center>"
  );
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
