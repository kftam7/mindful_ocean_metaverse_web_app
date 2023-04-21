const getWalletAddress = () => {
  return sessionStorage.getItem("walletAddress");
};

const getAppleId = () => {
  return sessionStorage.getItem("appleId");
};

const getEmail = () => {
  return sessionStorage.getItem("email");
};

export {
  getWalletAddress,
  getAppleId,
  getEmail
};