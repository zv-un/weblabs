import express from "express";
import multer from "multer";
import fs from "fs";
import validateFields from "../utils/validator.js";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

function saveToJSONFile(data, filename = "data.json") {
  fs.writeFile(filename, JSON.stringify(data, null, 4), "utf8", (err) => {
    if (err) {
      console.error("Error writing to the file:", err);
    } else {
      console.log(`Data saved to ${filename}`);
    }
  });
}

router.post("/lab3/form", upload.single("avatar"), (req, res) => {
  const formData = req.body;

  const validation = validateFields(req.body);
  // const validation = validateFields({});
  if (validation) {
    res.statusCode = 400;
    return res.json({ success: false, validation });
  }

  // Convert the array data to a buffer
  console.log(req.file);
  const imageBuffer = Buffer.from(req.file.buffer);
  // Save to file
  const saveDir = "public/lab3/uploads/";
  const savePath = saveDir + req.file.originalname;

  if (!fs.existsSync(saveDir)) {
    fs.mkdirSync(saveDir);
  }

  fs.writeFile(savePath, imageBuffer, (err) => {
    if (err) {
      console.error("Error saving the file:", err);
    } else {
      console.log(`File saved to ${savePath}`);
    }
  });

  saveToJSONFile({ ...req.body, avatar: req.file.originalname });

  return res.json({
    success: true,
    yourData: req.body,
  });
});

router.get("/lab3/form", (req, res) => {
  console.log("get req");
  fs.readFile("data.json", (err, data) => {
    if (err) {
      return res.json({ success: false });
    }
    const parsedJson = JSON.parse(data);
    console.log(parsedJson);
    res.json({ success: true, formData: parsedJson });
  });
});
export default router;
