const mongoose = require("mongoose");
let dataBaseURI =
  "mongodb+srv://brad123:brad123@cluster0.otwbz.gcp.mongodb.net/Blood?retryWrites=true&w=majority";
mongoose
  .connect(process.env.MONGODB_URI || dataBaseURI, {
    useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => console.log("connected to db successfully"))
  .catch((err) => console.log(err.errmsg));

const donorSchema = new mongoose.Schema({
  name: String,
  bloodType: String,
  contactInfo: {
    tel: { type: String, required: true },
    mail: String,
  },
  imgUrl: String,
  basicInfo: {
    nationalId: { type: Number, required: true },
    birthDate: Date,
    gender: String,
    Address: { type: String, default: "Tatay-Santa-Gharbyia" },
  },
  donationDates: [
    {
      when: Date,
      toWhom: String,
    },
  ],
});

const Donor = mongoose.model("DonorTable", donorSchema);

module.exports = Donor;
