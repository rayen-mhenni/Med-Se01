const express = require("express");
const User = require("../models/Administration");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const bcrypt = require("bcryptjs");
const router = express.Router();
require("dotenv").config();
const SECRET_KEY = process.env.SECRET_KEY;
const auth = require("../middleware/auth");
var address = require("address");
const { OAuth2Client } = require("google-auth-library");

router.post("/api/login", async (req, res, next) => {
  const { email, password } = req.body;
  let ip = address.ip();
  console.log(ip);
  if (!(email && password && ip)) {
    res.status(400).send("All input is required");
  }
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      bcrypt
        .compare(password, user.password)
        .then(async (match) => {
          if (!match) throw new createError(403, "Password is not correct");
          const token = jwt.sign(
            {
              id: user.id,
              role: user.role,
              ip: user.ip,
            },
            SECRET_KEY,
            {
              expiresIn: "1D",
            }
          );
          User.findByIdAndUpdate(user._id, {
            status: "active",
          });
          return res.status(200).json({
            message: "Welcome " + user.UserName,
            token,
            user: {
              id: user._id,
              UserName: user.UserName,
              LastName: user.LastName,
              email: user.email,
              role: user.role,
              phone: user.phone,
              location: user.location,
              userImage: user.userImage,
              status: user.status,
            },
          });
        })
        .catch((error) => {
          console.error(error);
          next(error);
          res.status().json({ message: "Connexion réfuser " + user.UserName });
        });
    } else {
      throw new createError(404, "Email not found");
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
});

//Login Google

const client = new OAuth2Client(
  "913791692427-7op1mas3df4pt1fikad6pli7njalnov2.apps.googleusercontent.com"
);

const users = [];

function upsert(array, item) {
  const i = array.findIndex((_item) => _item.email === item.email);
  if (i > -1) array[i] = item;
  else array.push(item);
}

router.post("/api/google-login", async (req, res) => {
  const { token } = req.body;
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience:
      "913791692427-7op1mas3df4pt1fikad6pli7njalnov2.apps.googleusercontent.com",
  });

  const { name, email, picture, sub } = ticket.getPayload();

  upsert(users, { name, email, picture });

  let Usertoken = jwt.sign({ _id: sub, email: email }, SECRET_KEY, {
    expiresIn: "24h",
  });
  res.status(201);
  res.json({ name, email, photo: picture, token: Usertoken, _id: sub });
});

router.post("/api/hash", auth.verifyToken, async (req, res, next) => {
  const { password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  try {
    const hash = bcrypt.hashSync(password, salt);
    res.status(201).json({ hash });
  } catch (error) {
    next(error);
  }
});
module.exports = router;
