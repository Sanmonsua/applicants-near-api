const { gql } = require('apollo-server-micro');

const typeDefs = gql`
  scalar Date 

  # Applicants
  type Applicant {
    id: ID
    email: String
    firstName: String
    lastName: String
    phone: String
    createdAt: Date
    updatedAt: Date
  }

  type ApplicantDetails {
    id: ID
    email: String
    firstName: String
    lastName: String
    phone: String
    createdAt: Date
    updatedAt: Date
    references: [Reference]
  }

  input ApplicantInput {
    email: String!
    firstName: String!
    lastName: String
    phone: String
  }

  #References
  type Reference {
    id: ID
    contactName: String
    company: String
    comment: String
    signerAddress: String
  }

  input ReferenceInput {
    contactName: String!
    company: String!
    comment: String!
    signerAddress: String!
    applicantId: ID
  }

  type Query {
    getApplicants: [Applicant]
    getApplicantDetails(id: ID!): ApplicantDetails
  }

  type Mutation {
    createApplicant(input: ApplicantInput!): Applicant
    updateApplicant(id: ID!, input: ApplicantInput!): Applicant
    createReference(input: ReferenceInput!): [Reference]
  }
`;

module.exports = typeDefs;
