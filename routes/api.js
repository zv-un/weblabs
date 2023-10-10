import express from "express";
import multer from "multer";
const upload = multer({ dest: "uploads/" });

const router = express.Router();

router.post("/lab3/form", upload.single("avatar"), (req, res) => {
  return res.json({
    field: "ok",
    yourData: req.body,
  });
});

export default router;
