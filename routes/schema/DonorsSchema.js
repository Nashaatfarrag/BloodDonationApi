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
  imgUrl: String,
  basicInfo: {
    nationalId: { type: Number , required: true , unique : true },
    birthDate: Date,
    gender: String,
    Address: { type :String , default : "Tatay-Santa-Gharbyia"}
  },
  donation: {
    available: Boolean,
    donationTimes: Number,
    lastDonation: Date
  }
});

const Donor = mongoose.model("DonorTable", donorSchema);

module.exports = Donor;
