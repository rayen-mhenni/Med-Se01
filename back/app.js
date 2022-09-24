const express = require("express");
const app = express();
const upload = require("express-fileupload");
const morgan = require("morgan");
const bodyParser = require("body-parser");
require("./config/database");
const patient = require("./routes/PatientControllers");
const vacation = require("./routes/vacation");
const analyseRoutes = require("./routes/analyse");
const crudUser = require("./routes/User");
const pingRoutes = require("./routes/ping");
const condidat = require("./routes/condidat");
const entretient = require("./routes/entretient");
const auth_User = require("./routes/auth_User");
const info_dash = require("./routes/info_dash");
flash = require("express-flash");
require("dotenv").config();
const SECRET_KEY = process.env.SECRET_KEY;
const socketIo = require("socket.io");
const PORT = 3017;
console.log(PORT);
const multer = require("multer");
const path = require("path");
const server = require("http").createServer(app);
const io = socketIo(server);
io.on("connection", (socket) => {
  console.log("new user connected");
});
//stocker information dans bd a travers un id et dans le cookies ( navigateur)
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "../AB/src/assets/uploads");
  },
  filename(req, file, cb) {
    cb(null, `${file.originalname}`);
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Images only!");
  }
}
const uploadImage = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

// POST File
app.post("/api/upload", uploadImage.single("userImage"), (req, res) => {
  console.log("Upload", req.file.location);
  if (req.file.location) {
    return res.status(200).json({ message: "Image Uploaded With Success" });
  }
  res.status(200).json({ message: "Image Uploaded With Success" });
  res.send(req.file.location);
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT,POST,PATCH,DELETE,GET");
    return res.status(200).json({});
  }
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(upload({ limit: "5mb" }));
app.use(
  morgan(
    ":date[web] :remote-user IP :remote-addr Method :method URL :url Status:status - :response-time ms Agent :user-agent"
  )
);

app.use(analyseRoutes);
app.use(pingRoutes);
app.use(crudUser);
app.use(patient);
app.use(vacation);
app.use(condidat);
app.use(entretient);
app.use(auth_User);
app.use(info_dash);

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ error: { status: err.status || 500, message: err.message } });
});

app.listen(PORT, () => console.log("Running on Port " + PORT));
