const mongoose = require("mongoose");

const { Schema } = mongoose;

mongoose.Promise = global.Promise;

const ReferencesSchema = new Schema(
  {
    contactName: {
      type: String,
      required: true,
      trim: true,
    },
    company: {
      type: String,
      required: true,
      trim: true,
    },
    comment: {
      type: String,
      required: true,
      trim: true,
    },
    signerAddress: {
      type: String,
      required: true,
      trim: true,
    },
    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Applicant",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Applicant || mongoose.model("Reference", ReferencesSchema);
