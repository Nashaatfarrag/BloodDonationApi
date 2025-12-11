const mongoose = require("mongoose");

// Connection options
const mongooseOptions = {
  serverSelectionTimeoutMS: 30000,
  socketTimeoutMS: 45000,
  connectTimeoutMS: 10000,
  retryWrites: true,
};

// Only connect if MONGODB_URI is provided
if (process.env.MONGODB_URI) {
  mongoose
    .connect(process.env.MONGODB_URI, mongooseOptions)
    .then(() => console.log("connected to db successfully"))
    .catch((err) => console.error("MongoDB connection error:", err.message));
} else {
  console.warn("WARNING: MONGODB_URI environment variable not set. Database operations will fail.");
}

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
