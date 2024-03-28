const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const currentDate = new Date();
const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;



const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true 
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: String,
        default: formattedDate
    }
});


const Usermodal = mongoose.model("User", userSchema);

module.exports = Usermodal;
