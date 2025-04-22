const express = require("express");
const router = express.Router();
const nanoid = require("nanoid");
const multer = require("multer");
const path = require("path");
const config = require("../config");
const fileItemsDb = require("../fileItemsDb");


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, nanoid() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.get("/", async (req, res) => {
  const items = fileItemsDb.getItems();
  res.send(items);
});

router.get("/:id", async (req, res) => {
  const items = fileItemsDb.getItems();
  const item = items.find((item) => item.id === req.params.id);
  if (!item) {
    res.send(items);
  }
});

router.post("/", upload.single("image"), async (req, res) => {
  const id = nanoid();
  const item = { ...req.body, id };
 

  await fileItemsDb.addItem(item);
  res.send(item);
});

router.delete("/:id", async (req, res) => {
  const success = await fileItemsDb.deleteItem(req.params.id);
  if (!success) {
    res.status(404), send({ error: "item not found" });
  }
  res.send({ message: "item delete successfuly" });
});

module.exports = router;
