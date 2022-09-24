const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/Administration");
const Patient = require("../models/patient");

const Vacation = require("../models/Vacation");
const SECRET_KEY = "AZyWmZ1456@TOOP";
const {
  vacationStatus,
  calculateVacationPeriod,
} = require("../utils/vacation");
const auth = require("../middleware/auth");
const { getUser, getVacations, createVacation } = require("../utils/query");

router.get("/api/info", auth.verifyToken, async (req, res, next) => {
  const now = new Date().toISOString().slice(0, 10);
  try {
    const nbuser = await User.count({ created_at: now });
    const nbuserA = await User.count({ created_at: now, role: "analysta" });
    const nbuserMark = await User.count({ created_at: now, role: "makiting" });
    const nbPation = await Patient.count();


    const data = { nbuser, nbuserA, nbuserMark, nbPation };
    if (data) {
      res.status(200).json({ data });
    } else res.status(200).json({ err });
  } catch (err) {
    next(err);
  }
});

router.get("/api/activeUser", async (req, res, next) => {
  const now = new Date().getFullYear();

  try {
   
   
    var months = [
      {
        January: await User.count({
          created_at: new RegExp(".*" + now + "-01" + ".*"),
        }),
        February: await User.count({
          created_at: new RegExp(".*" + now + "-02" + ".*"),
        }),
        March: await User.count({
          created_at: new RegExp(".*" + now + "-03" + ".*"),
        }),
        April: await User.count({
          created_at: new RegExp(".*" + now + "-04" + ".*"),
        }),
        May: await User.count({
          created_at: new RegExp(".*" + now + "-05" + ".*"),
        }),
        June: await User.count({
          created_at: new RegExp(".*" + now + "-06" + ".*"),
        }),
        July: await User.count({
          created_at: new RegExp(".*" + now + "-07" + ".*"),
        }),
        August: await User.count({
          created_at: new RegExp(".*" + now + "-08" + ".*"),
        }),
        September: await User.count({
          created_at: new RegExp(".*" + now + "-09" + ".*"),
        }),
      },
    ];
    const data = { months};
    if (data) {
      res.status(200).json(data);
    } else res.status(500).json({ err });
  } catch (err) {
    next(err);
  }
});

router.get("/api/analysta", async (req, res, next) => {
  const now = new Date().getFullYear();
  try {
   
    var months = [
      {
        January: await User.count({
          created_at: new RegExp(".*" + now + "-01" + ".*"),
          role:"analysta"
        }),
        February: await User.count({
          created_at: new RegExp(".*" + now + "-02" + ".*"),
          role:"analysta"
        }),
        March: await User.count({
          created_at: new RegExp(".*" + now + "-03" + ".*"),
          role:"analysta"
        }),
        April: await User.count({
          created_at: new RegExp(".*" + now + "-04" + ".*"),
          role:"analysta"
        }),
        May: await User.count({
          created_at: new RegExp(".*" + now + "-05" + ".*"),
          role:"analysta"
        }),
        June: await User.count({
          created_at: new RegExp(".*" + now + "-06" + ".*"),
          role:"analysta"
        }),
        July: await User.count({
          created_at: new RegExp(".*" + now + "-07" + ".*"),
          role:"analysta"
        }),
        August: await User.count({
          created_at: new RegExp(".*" + now + "-08" + ".*"),
          role:"analysta"
        }),
        September: await User.count({
          created_at: new RegExp(".*" + now + "-09" + ".*"),
          role:"analysta"
        }),
      },
    ];
    const data = { months};
    if (data) {
      res.status(200).json(data);
    } else res.status(500).json({ err });
  } catch (err) {
    next(err);
  }
});

router.get("/api/markiting", async (req, res, next) => {
  const now = new Date().getFullYear();
  try {
   
    var months = [
      {
        January: await User.count({
          created_at: new RegExp(".*" + now + "-01" + ".*"),
          role:"markiting"
        }),
        February: await User.count({
          created_at: new RegExp(".*" + now + "-02" + ".*"),
          role:"markiting"
        }),
        March: await User.count({
          created_at: new RegExp(".*" + now + "-03" + ".*"),
          role:"markiting"
        }),
        April: await User.count({
          created_at: new RegExp(".*" + now + "-04" + ".*"),
          role:"markiting"
        }),
        May: await User.count({
          created_at: new RegExp(".*" + now + "-05" + ".*"),
          role:"markiting"
        }),
        June: await User.count({
          created_at: new RegExp(".*" + now + "-06" + ".*"),
          role:"markiting"
        }),
        July: await User.count({
          created_at: new RegExp(".*" + now + "-07" + ".*"),
          role:"markiting"
        }),
        August: await User.count({
          created_at: new RegExp(".*" + now + "-08" + ".*"),
          role:"markiting"
        }),
        September: await User.count({
          created_at: new RegExp(".*" + now + "-09" + ".*"),
          role:"markiting"
        }),
      },
    ];
    const data = { months};
    if (data) {
      res.status(200).json(data);
    } else res.status(500).json({ err });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
// let { filter } = req.user.id;
// const vacations = await Vacation.aggregate([{ $match: filter }]);
// const vacations = await Vacation.find({ filter });
// res.status(200).send({ msg: vacations });
// $lookup : opérateur qui éxecute join in mongo
// populate(), qui vous permet de référencer des documents dans d'autres collections.
