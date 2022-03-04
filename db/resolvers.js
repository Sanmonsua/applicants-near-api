const { GraphQLScalarType, Kind } = require("graphql");

const Applicant = require("./models/applicant");
const ApplicantsContract = require("../near/contract")

const dateScalar = new GraphQLScalarType({
  name: "Date",
  description: "Date custom scalar type",
  serialize(value) {
    return value.getTime();
  },
  parseValue(value) {
    return new Date(value);
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10));
    }
    return null;
  },
});

const resolvers = {
  Date: dateScalar,
  Query: {
    getApplicants: async () => {
      try {
        const applicants = await Applicant.find({});
        return applicants
      } catch (err) {
        console.log(err);
        return [];
      }
    },
    getApplicantDetails: async (_, { id }) => {
      const applicant = await Applicant.findById(id);

      if (!applicant) {
        throw new Error("Applicant not found");
      }

      const response = await ApplicantsContract.getApplicantReferences(applicant.id);
      const applicantWithReferences = {  id: applicant.id, ...applicant.toObject(), references: response };

      return applicantWithReferences;
    },
  },

  Mutation: {
    createApplicant: async (_, { input }) => {
      const applicant = new Applicant(input);

      const result = await applicant.save();

      return result;
    },
    updateApplicant: async (_, { id, input }) => {
      let applicant = await Applicant.findById(id);

      if (!applicant) {
        throw new Error("Applicant not found");
      }

      applicant = await Applicant.findOneAndUpdate({ _id: id }, input, {
        new: true,
      });

      return applicant;
    },
    createReference: async (_, { input: { applicantId, contactName, company, comment } }) => {
      const applicant = await Applicant.findById(applicantId);

      if (!applicant) {
        throw new Error("Applicant not found");
      }

      await ApplicantsContract.addReference(applicantId, contactName, company, comment);
      const response = await ApplicantsContract.getApplicantReferences(applicantId);

      return response;
    },
  },
};

module.exports = resolvers;
