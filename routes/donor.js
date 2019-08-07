const express = require("express");
var ObjectId = require("mongodb").ObjectID;
const router = express.Router();
const Donor = require("./schema/DonorsSchema");
router.use(express.json());
//get all donors

router.get("/", (req, res) => {
  // const sortBy = req.query.sortBy;
  async function getAllDonor() {
    const donors = await Donor.find();
    res.send(donors).status(200);
    console.log(donors);
  }
  getAllDonor();
});

router.get("/:id", (req, res) => {
  async function getDonor() {
    const donor = await Donor.findById(id);
    res.send(donor).status(200);
  }
  getDonor();
});

router.post("/", (req, res) => {
  // console.log(req.header);
  const createdDonor = {
    name: {
      first: req.body.name.first,
      last: req.body.name.last
    },
    bloodType: req.body.bloodType,
    contactInfo: {
      mobile: req.body.contactInfo.mobile
    },
    nationalId: req.body.nationalId,
    donation: {
      available: req.body.donation.available,
      donationTimes: req.body.donation.donationTimes
      //lastDonation: req.body.donation.lastDonation
    }
  };
  // console.log(createdDonor);
  Donor.create(createdDonor);
  res.send(createdDonor);
});

router.delete("/:id", (req, res) => {
  const idDeleted = req.params.id;
  console.log(idDeleted);
  async function removeDocument(idDeleted) {
    try {
      const result = await Donor.findOneAndDelete(
        { _id: idDeleted },
        { returnOriginal: false }
      );
      return result.value;
    } catch (err) {
      console.log(err);
    }
  }
  removeDocument(idDeleted);
  res.sendStatus(200);
});

/*
router.put('/:id', (req, res) => {
    const volunteer = volunteers.find(c => c.id === parseInt(req.params.id));
    if (!volunteer) return res.status(404).send("there is no vounteer with such id");
    //console.log(volunteers);
    startupDebugger('put method is used ... ');
    let vounteeredited = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        joinDate: req.body.joinDate,
        position: req.body.position,
        skills: req.body.skills,
        committee: req.body.committee
    }
    volunteer.lastName = vounteeredited.lastName;

    res.send(volunteer);
});

function validateVolunteer(volunteer) {
    const schema = {
        firstName: Joi.string().min(3).max(10).required(),
        lastName: Joi.string().min(3).max(10).required(),
        age: Joi.allow(),
        joinDate: Joi.allow(),
        position: Joi.allow(),
        skills: Joi.allow(),
        committee: Joi.allow()
    }
    return Joi.validate(volunteer, schema);
}
*/

Donor.create({
  name: {
    first: "mido",
    last: "nashaat"
  },
  bloodType: "A+",

  nationalId: 29603231601177
});
module.exports = router;
