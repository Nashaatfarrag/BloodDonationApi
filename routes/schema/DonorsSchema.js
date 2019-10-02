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
    tel: { type: String, required: true  },
    mail: String
  },
  imgUrl: String,
  basicInfo: {
    nationalId: { type : Number ,  required : true , index : true  },
    birthDate: Date,
    gender: String,
    Address: { type: String, default: "Tatay-Santa-Gharbyia" }
  },
  donationDates: [
    {
      when: Date,
      toWhom: String
    }
  ]
});

const Donor = mongoose.model("DonorTable", donorSchema);

module.exports = Donor;
