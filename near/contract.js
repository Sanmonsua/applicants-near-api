const nearAPI = require("near-api-js");
const connectNear = require("./config");

const loadContract = async () => {
  const near = await connectNear();
  const account = await near.account(process.env.ACCOUNT_ADDRESS);
  console.log(account)

  const contract = new nearAPI.Contract(account, process.env.CONTRACT_ADDRESS, {
    viewMethods: ["getApplicantReferences"],
    changeMethods: ["addReference"],
    sender: account,
  });

  console.log(contract)

  return contract;
};

const ApplicantsContract = {
  getApplicantReferences: async (applicantId) => {
    const contract = await loadContract();
    const response = await contract.getApplicantReferences({ applicantId });
    return response;
  },
  addReference: async (applicantId, contactName, company, comment) => {
    const contract = await loadContract();
    const response = await contract.addReference({
      args: { applicantId, contactName, company, comment },
    });
    return response;
  },
};

module.exports = ApplicantsContract;
