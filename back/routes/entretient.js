const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { get } = require("mongoose");
const entretient = require("../models/entretient");
const Vacation = require("../models/Vacation");
const SECRET_KEY = "AZyWmZ1456@TOOP";

router.post("/api/addEntretient", async (req, res, next) => {
  const { interview, interv, date_entretient, type } = req.body;
  try {
      const newentretient = new entretient({
        interview,
        interv,
        date_entretient,
        type,
        status: "attente",
      });
      await newentretient.save();

      res.send(newentretient).status(200)

  } catch (err) {
    next(err);
  }
});


router.get("/api/getEntretient", async (req, res, next) => {
  try {
    const results = await entretient.find();
    res.send(results);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


router.post("/api/getEntretientByInterv", async (req, res, next) => {
  try {
    const year = new Date().getDate("YYYY-MM-DD")
    const mounth = new Date().getMonth
    const day = new Date().getDay
    const results = await entretient.find({interv :{$elemMatch:{email:req.body.email}}, date_entretient : new RegExp(".*" + year+ ".*")});
    res.send(results);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});



router.get("/api/deleteEntretient/:id", async (req, res) => {
  const { id } = req.params;
  const entre = await entretient.findByIdAndDelete(id);

  if (entre) {
    res.status(201).json({ msg: "compte supprimer" });
  } else {
    res.status(404).json({ msg: "patient not found" });
  }
});

router.put("/api/updateEntretien/:id", async function (req, res) {
  const userId = req.params.id;
  const  newUser = req.body;
      const entre = await entretient.findByIdAndUpdate(userId,newUser);
      res.send(entre).status(200);


});

module.exports = router;
