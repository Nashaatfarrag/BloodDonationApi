const express = require("express");
var ObjectId = require("mongodb").ObjectID;
const router = express.Router();
const Donor = require("./schema/DonorsSchema");
router.use(express.json());

router.get("/", (req, res) => {
  // const sortBy = req.query.sortBy;
  async function getAllDonor() {
    const donors = await Donor.find();
    res.send(donors).status(200);
    //console.log(donors);
  }
  getAllDonor();
});

router.get("/:id", (req, res) => {
  Donor.findById(req.params.id, (error, post) => {
    if (error) console.error(error);

    res.send(post);
  });
  // let id = req.params.id;
  // async function getDonor() {
  //   let donor = await Donor.findOne({ "basicInfo.nationalId": parseInt(id) })
  //     .then(() => {
  //       res.send(donor).status(200);
  //     })
  //     .catch(err => {
  //       console.log(err.message);
  //     });
  // }
  // getDonor();
});

router.post("/", (req, res) => {
  // console.log(req.header);
  const createdDonor = {
    name: req.body.name,
    bloodType: req.body.bloodType,
    gender: req.body.gender,
    imgUrl: req.body.imgUrl,
    contactInfo: {
      tel: req.body.contactInfo.tel,
      mail: req.body.contactInfo.mail
    },
    basicInfo: {
      nationalId: req.body.basicInfo.nationalId,
      birthDate: req.body.basicInfo.birthDate
    }
    // donation: {
    //   available: req.body.donation.available,
    //   donationTimes: req.body.donation.donationTimes
    //   lastDonation: req.body.donation.lastDonation
    // }
  };
  // console.log(createdDonor);
  Donor.create(createdDonor)
    .then(res.send(createdDonor))
    .catch(err => console.log(err));
});

router.delete("/:id", (req, res) => {
  const idDeleted = req.params.id;
  //console.log(idDeleted);
  async function removeDocument(idDeleted) {
    try {
      const result = await Donor.findOneAndDelete(
        {
          _id: idDeleted
        },
        {
          returnOriginal: false
        }
      );
      return result.value;
    } catch (err) {
      console.log(err);
    }
  }
  removeDocument(idDeleted);
  res.sendStatus(200);
});

router.put("/:id", (req, res) => {
   Donor.findById(req.params.id, (err , donor) => {
    if (err)  console.log(err)
    donor.basicInfo.birthDate = req.body.birthDate;
    res.send(donor);
   });
  
  //console.log(volunteers);
  //startupDebugger("put method is used ... ");
  /*
  let editedDonor = {
    name: req.body.name,
    bloodType: req.body.bloodType,
    gender: req.body.gender,
    imgUrl: req.body.imgUrl,
    contactInfo: {
      tel: req.body.contactInfo.tel,
      mail: req.body.contactInfo.mail
    },
    basicInfo: {
      nationalId: req.body.basicInfo.nationalId,
      birthDate: req.body.basicInfo.birthDate
    }
    // donation: {
    //   available: req.body.donation.available,
    //   donationTimes: req.body.donation.donationTimes,
    //   lastDonation: req.body.donation.lastDonation
    // }
  };
  donor.basicInfo = editedDonor.basicInfo;
*/
  //res.send(donor);
});
/*
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

// Donor.create({
//   name: {
//     first: "mido",
//     last: "nashaat"
//   },
//   bloodType: "A+",

//   nationalId: 29603231601177
// });

module.exports = router;
