import express from "express";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import indexRouter from "./routes/indexRoutes.js";
import api from "./routes/api.js";

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

app.set("views", join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api", api);

app.listen(3000, () => [console.log("app listen" + 3000)]);
