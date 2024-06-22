import express from "express";
import swaggerUi from "swagger-ui-express";
import fs from "fs";

const app = express();
const swaggerFile = fs.readFileSync("./swagger.json", "utf8");
const swaggerDocument = JSON.parse(swaggerFile);

// Serve Swagger UI
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default app;
