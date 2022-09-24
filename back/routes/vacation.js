const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/Administration");
const Vacation = require("../models/Vacation");
const SECRET_KEY = "AZyWmZ1456@TOOP";
const {
  vacationStatus,
  calculateVacationPeriod,
} = require("../utils/vacation");
const auth = require("../middleware/auth");
const { getUser, getVacations, createVacation } = require("../utils/query");

router.post("/api/vacation", auth.verifyToken, async (req, res, next) => {
  const { startingDate, endingDate, type_vacation, message } = req.body;

  const { id } = req.user;
  try {
    console.log(4);
    console.log(id);
    console.log(req.body);
    const days = calculateVacationPeriod({ startingDate, endingDate });
    console.log(days);
    const vacations = await getVacations(id);
    if (vacations.length > 0) {
      //check if maxdays exceeded
      // check if data
      const verify = vacationStatus(vacations) ?? {};
      console.log("testtttttttttttt11111111");
      if (verify?.status === "pending") {
        console.log("000000000000000000000");

        const newVacation = await createVacation({
          startingDate,
          endingDate,
          type_vacation,
          userId: id,
          days,
          message,
        });

        if (!newVacation) throw new Error("Vacation cannot be created");
      } else {
        throw new Error(
          "Vacation cannot be created because you have " +
            verify?.remainingDays +
            " days left"
        );
      }
    } else {
      //create vacation
      console.log("222222");

      const newVacation = await createVacation({
        startingDate,
        endingDate,
        type_vacation,
        userId: id,
        days,
        message,
      });
      if (!newVacation) throw new Error("Vacation cannot be created");
    }
    res.status(200).json("ok");
    // const newVacation = await Vacation.create(data);
    // if (newVacation) {
    //   res.status(201).json({ newVacation });
    //   vacation.
    // } else throw new Error("Vacation could not be created");
  } catch (err) {
    next(err);
  }
});

// router.post('/test', middleware, async(req, res, next)=>{
//   const variable
//   try {
//     logique
//   } catch (error) {
//     next(error)
//   }
// })

router.get("/api/listVacation", auth.verifyToken, async (req, res, next) => {
  try {
    const vacations = await Vacation.find().populate({
      path: "userId",
      select: "UserName LastName email userImage",
    });
    res.status(200).json({ vacations });
  } catch (err) {
    next(err);
  }
});

router.put("/api/UpdateEtatAdmin/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { newStatus } = req.body;
    await Vacation.updateOne({ _id: id }, { status: newStatus });
    res.status(200).send({ newStatus });
  } catch (err) {
    next(err);
  }
});
router.get(
  "/api/historiqueVaccation",
  auth.verifyToken,
  async (req, res, next) => {
    const { id } = req.user;

    try {
      const totaleVacation = await Vacation.find({ userId: id });
      const data = totaleVacation.filter(
        (word) => word.endingDate && word.startingDate && word.status
      );
      if (data) {
        res.status(200).json({ data });
      } else res.status(200).json({ err });
    } catch (err) {
      next(err);
    }
  }
);
router.put("/api/updateVacation/:id", async (req, res, next) => {
  const newVaccation = req.body;
  try {
    Vacation.findByIdAndUpdate({ userId: req.params.id, newVaccation });
  } catch (err) {
    next(err);
  }
});
router.post("/api/totaleVacation", auth.verifyToken, async (req, res, next) => {
  const { type_vacation, totale, role } = req.body;

  try {
    const resp = await User.find({ role: role });
    if (resp) {
      resp.forEach(async (element) => {
        let maxDays = totale;

        if (type_vacation === "normale") {
          await Vacation.updateOne({ userId: element._id }, maxDays);
          res.status(200).send("maxDays:" + totale);
        } else {
          await Vacation.updateOne(
            { userId: element._id },
            { maxDaysMalade: maxDays }
          );
          res.status(200).send("maxDaysMalade :" + totale);
        }
      });
    } else return res.status(201).send("use not found");
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
