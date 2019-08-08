const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost/BloodDonation", {
    useNewUrlParser: true
  })
  .then(() => console.log("connected to db successfully"))
  .catch(err => console.log(err));

const donorSchema = new mongoose.Schema({
  name: String,
  bloodType: String,
  contactInfo: {
    tel: String,
    mail: String
  },
  basicInfo: { nationalId: Number, birthDate: Date },
  donation: {
    available: Boolean,
    donationTimes: Number,
    lastDonation: Date
  }
});

const Donor = mongoose.model("DonorTable", donorSchema);

module.exports = Donor;
