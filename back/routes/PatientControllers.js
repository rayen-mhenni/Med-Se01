const express = require("express");
const router = express.Router();
const Patient = require("../models/patient");
var crypto = require("crypto");
const nodemailer = require("nodemailer");
const auth = require("../middleware/auth");

const {
  signupValidator,
  signinValidator,
  validatorResult,
} = require("../middleware/validator");
router.post(
  "/api/signUpPatient",

  async (req, res) => {
    try {
      const {
        UserName,
        LastName,
        email,
        phone,
        Nationality,
        Date_of_birth,
        message,
        location,
        Type_Analyse,
        Gender,
        Contact_number,
      } = req.body;

      const patient = await Patient.findOne({ email });
      if (patient) {
        console.log(patient);
        return res.status(400).json({
          errorMessage: "Email already exists",
        });
      }
      const newPatient = new Patient({
        UserName,
        LastName,
        email,
        phone,
        Nationality,
        Date_of_birth,
        message,
        location,
        email_token: crypto.randomBytes(64).toString("hex"),
        isVerified: false,
        Type_Analyse,
        Gender,
        Contact_number,
      });
      console.log(Type_Analyse);
      await newPatient.save();

      res.json({
        successMessage:
          ` Thank you ` +
          newPatient.UserName +
          `  Your compte has been saved !`,
      });
      // var smtpConfig = {
      //   service: "smtp.gmail.com",
      //   port: 587,
      //   //secure: true,
      //   auth: {
      //     patient: "benhessine7@gmail.com",
      //     pass: "clubafricain",
      //   },
      // };

      // var transporter = nodemailer.createTransport(smtpConfig);

      // // replace hardcoded options with data passed (somedata)
      // var mailOptions = {
      //   from: `benhessine7@gmail.com`, // sender address
      //   to: newPatient.email, // list of receivers
      //   subject: "Hello ,verify your email ✔", // Subject line
      //   text: "this is some text", //, // plaintext body
      //   html: `<h2>${newPatient.UserName} Thanks for regestring on our site !</h2>
      // <h4> Please verify your email to continue ...</h4>
      // <a href="https://${req.headers.host}
      // /newPatient/verify-email?token=${newPatient.emailToken}
      // Verify Your Email"></a>
      // `, // You can choose to send an HTML body instead
      // };

      // transporter
      //   .sendMail(mailOptions)
      //   .then((data) => {
      //     console.log(data);
      //   })
      // .catch((err) => {
      //   console.log(err);
      // });
    } catch (err) {
      console.log("###777 error: ", err);
      res.status(500).json({
        errorMessage: "Server error",
      });
    }
  }
);

// router.post("/api/test-email", async function (req, res) {
//   var smtpConfig = {
//     service: "smtp.gmail.com",
//     port: 465,
//     secure: true,
//     auth: {
//       patient: "benhessine7@gmail.com",
//       pass: "clubafricain",
//     },
//   };
//   var mailOptions = {
//     from: `benhessine7@gmail.com`, // sender address
//     to: "ezzjhc@knowledgemd.com", // list of receivers
//     subject: "Hello ,verify your email ✔", // Subject line
//     text: "this is some text", //, // plaintext body
//     html: `<h2>TEST</h2>
//     `, // You can choose to send an HTML body instead
//   };
//   var transporter = nodemailer.createTransport(smtpConfig);
//   // verify connection configuration
//   transporter.verify(function (error, success) {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log("Server is ready to take our messages");
//     }
//   });
//   transporter
//     .sendMail(mailOptions)
//     .then((data) => {
//       console.log(data);
//       res.send("ok");
//     })
//     .catch((err) => {
//       console.log(err);
//       res.send("notok");
//     });
// });

router.get("api/verify-email", async (req, res) => {
  try {
    const user = await Patient.findOne({ emailToken: req.params.email });
    if (user) {
      user.emailToken = null;
      user.isVerified = true;
      await user.save();
    } else {
      res.status(400).send({ message: "Invalid link" });
    }
  } catch (error) {
    console.log(error);
  }
});

router.delete("/api/deletePatient/:id", async (req, res) => {
  const { id } = req.params;
  const patient = await Patient.findByIdAndDelete(id);

  if (patient) {
    res.status(201).json({ msg: "compte supprimer" });
  } else {
    res.status(404).json({ msg: "patient not found" });
  }
});
router.put("/api/updatepatient/:id", auth.verifyToken, async (req, res) => {
  var userId = req.params.id;
  const newPatient = req.body;
  try {
    const patient = await Patient.findByIdAndUpdate(userId, newPatient);
    res.send(patient).status(200);
  } catch (err) {
    res.send("invalid patient id").status(400);
  }
});
router.get("/api/getPatient", async (req, res) => {
  try {
    const patient = await Patient.find();
    res.send(patient);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get(
  "/api/getPatId/:id",
  (async = (req, res) => {
    Patient.findById({ _id: req.params.id })
      .then((patient) => {
        if (!patient) {
          return res.status(404).json({ message: "Patient not found!" });
        }
        res.status(200).send(patient);
      })
      .catch((err) => {
        res.status(404).json({ message: err });
      });
  })
);
router.get("/api/searchPatient/:key", async (req, res) => {
  let data
  console.log("sdddddddd" , req?.params?.key)
  if (req?.params?.key != "all" )
  { data= await Patient.find({
    $or: [{ UserName: { $regex: req.params.key } }],
  });

}
  else { data = await Patient.find();}
  res.send(data);
 
});
module.exports = router;
