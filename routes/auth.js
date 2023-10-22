import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  const { opt } = req.query;
  if (opt === "logout") {
    req.session.destroy();
    res.redirect("/lab4");
  } else if (opt !== "login" && req.session.user) {
    res.send(`Welcome, ${req.session.user}`);
  } else {
    console.log("req.query", req.query);
    res.render("auth", { query: req.query });
  }
});

router.post("/", (req, res) => {
  const { username, password, opt } = req.body;
  if (username !== "admin" || password !== "admin") {
    res.redirect(
      301,
      `/auth?error=${encodeURIComponent("Incorrect username or password")}`
    );
  }
  if (opt === "login") {
    req.session.user = username;
    res.redirect("/auth");
  }

  if (opt === "logout") {
    req.session.destroy();
    res.redirect("/lab4");
  }
});

export default router;
