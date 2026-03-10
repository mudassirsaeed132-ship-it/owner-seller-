// PATH: src/mocks/db/fixtures/auth.js
export const AUTH_FIXTURE = {
  defaultVerificationCode: "7789BM6X",
  users: [
    {
      id: "seller_1",
      firstName: "Benjamin",
      lastName: "Franklyn",
      email: "benjamin@realestate.com",
      phone: "+92 300 0000000",
      role: "seller",
      isSellerVerified: true,
      profileDescription: "Experienced property seller",
      website: "",
      avatarFileName: "Benjamin Franklyn.svg",
    },
  ],
};

export default AUTH_FIXTURE;