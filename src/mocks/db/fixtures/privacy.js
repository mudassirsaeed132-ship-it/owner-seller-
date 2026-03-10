export const PRIVACY_FIXTURE = {
  profileVisibility: "public", // public | limited | private

  documentVisibility: {
    passport: "owner", // owner | bank | verified
    proofOfAddress: "bank",
    bankStatement: "verified",
    employmentContract: "owner",
  },

  dataSharingConsent: {
    banks: false,
    notaries: true,
    verifiedPartners: false,
  },

  notificationChannels: {
    email: true,
    sms: false,
    push: true,
  },

  notificationTypes: {
    security: true,
    documents: true,
    marketing: false,
  },
};
