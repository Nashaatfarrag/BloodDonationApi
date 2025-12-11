const express = require("express");
const router = express.Router();
const Donor = require("./schema/DonorsSchema");
router.use(express.json());

router.get("/", async (req, res) => {
  try {
    const donors = await Donor.find();
    res.status(200).send(donors);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
});

router.get("/:tel", async (req, res) => {
  try {
    const donor = await Donor.findOne(
      { "contactInfo.tel": req.params.tel },
      "name contactInfo"
    );
    res.status(200).send(donor);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const createdDonor = {
      name: req.body.name,
      bloodType: req.body.bloodType,
      imgUrl: req.body.imgUrl,
      contactInfo: {
        tel: req.body.contactInfo.tel,
        mail: req.body.contactInfo.mail
      },
      basicInfo: {
        nationalId: req.body.contactInfo.tel,
        birthDate: req.body.basicInfo.birthDate,
        gender: req.body.basicInfo.gender
      }
    };
    const donor = await Donor.create(createdDonor);
    res.status(201).send(donor);
  } catch (err) {
    console.error(err);
    res.status(400).send({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const result = await Donor.findOneAndDelete(
      { _id: req.params.id },
      { returnDocument: "after" }
    );
    if (!result) {
      return res.status(404).send({ error: "Donor not found" });
    }
    res.status(200).send({ message: "Donor deleted", donor: result });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const donor = await Donor.findById(req.params.id);
    if (!donor) {
      return res.status(404).send({ error: "Donor not found" });
    }

    if (req.body.gender) {
      donor.basicInfo.gender = req.body.gender;
    }

    if (req.body.when === "remove") {
      if (donor.donationDates.length) donor.donationDates.pop();
    } else if (req.body.when) {
      donor.donationDates.push({
        when: req.body.when,
        toWhom: req.body.toWhom
      });
    }

    await donor.save();
    res.status(200).send(donor);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: err.message });
  }
});

// function validateVolunteer(volunteer) {
//   const schema = {
//     firstName: Joi.string()
//       .min(3)
//       .max(10)
//       .required(),
//     lastName: Joi.string()
//       .min(3)
//       .max(10)
//       .required(),
//     age: Joi.allow()
//   };
//   return Joi.validate(volunteer, schema);
// }

// Donor.create({
//   name: {
//     first: "mido",
//     last: "nashaat"
//   },
//   bloodType: "A+",

//   nationalId: 29603231601177
// });

module.exports = router;
