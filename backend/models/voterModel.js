const mongoose = require("mongoose");

const VoterSchema = new mongoose.Schema(
  {
    voterID:{type:String,required:true},
    name: { type: String, required: true },
    age:{type:String,required:true},
    gender:{type:String,required:true},
    password:{type:String,required:false},
    phno:{type:String,required:true},
    isVoted:{type:Boolean,required:true},
  },
  {collection:"VoterDetails"}
);
const VoterModel = mongoose.model("Voter", VoterSchema);
module.exports = VoterModel;