const mongoose = require("mongoose");

const { Schema } = mongoose;

mongoose.Promise = global.Promise;

const ApplicantsSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: false,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Applicant || mongoose.model("Applicant", ApplicantsSchema);
