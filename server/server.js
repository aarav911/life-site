import express from "express"
import multer from "multer"
import cors from "cors"
import fs from "fs"
import path from "path"

const app = express()
app.use(cors())

const LIFE_DATA = path.join(process.env.HOME, "LifeSiteFolder", "media")

// ensure folder exists
fs.mkdirSync(LIFE_DATA, { recursive: true })

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, LIFE_DATA)
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage })

app.get("/", (req, res) => {
  res.send("Life System Server Running")
})

app.post("/upload", upload.single("file"), (req, res) => {

  console.log("Upload request received")

  if (!req.file) {
    console.log("No file received")
    return res.status(400).json({ error: "No file uploaded" })
  }

  console.log("Saved:", req.file.originalname)

  res.json({
    status: "saved",
    file: req.file.originalname
  })

})

app.listen(3001, "0.0.0.0",() => {
  console.log("Life server running on http://localhost:3001")
})