const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/BloodDonation', { useNewUrlParser: true })
    .then(() => console.log('connected to db successfully'))
    .catch((err) => console.log(err))


const donorSchema = new mongoose.Schema(
    {
        name: {
            first: String,
            last: String
        },
        bloodType: String,
        contactInfo: {
            mobile: Number,
        },
        nationalId: Number,
        donation: {
            available: Boolean,
            donationTimes: Number,
            lastDonation: Date
        }
    }
);

const Donor = mongoose.model('DonorTable', donorSchema)

module.exports = Donor;