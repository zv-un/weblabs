import express from "express";
import session from "express-session";
import bodyParser from "body-parser";

import { fileURLToPath } from "url";
import { dirname, join } from "path";

import indexRouter from "./routes/indexRoutes.js";
import api from "./routes/api.js";
import authRouter from "./routes/auth.js";

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
  session({
    secret: "secret_key_123456789qwertyqqq",
    resave: false,
    saveUninitialized: true,
  })
);

app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
});

app.set("views", join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api", api);
app.use("/auth", authRouter);

app.listen(3000, () => [console.log("app listen" + 3000)]);
