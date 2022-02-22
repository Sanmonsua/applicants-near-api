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
    }
  );

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
    references: [
      ReferencesSchema,
    ],
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Applicant || mongoose.model("Applicant", ApplicantsSchema);
