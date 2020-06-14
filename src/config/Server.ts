import express from "express";
import path from "path";
import "./LoaderEnvironmentVariable";
import AppRoutes from "../routes/index";

const app = express();
const cors = require("cors");



// Setting middleware make parse datas to json.
app.use(express.json());

// Setting middleware enable cors in application.
app.use(cors());

// Settings directory statics files to express server.s
app.use(express.static(path.resolve(__dirname, "..", "..", "uploads")))

// Loading routes application.
AppRoutes(app);

app.get("/test", (request, response) => response.json({ msg: "Success!!! " }))

export default app;