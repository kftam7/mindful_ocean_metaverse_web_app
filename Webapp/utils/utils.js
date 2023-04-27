const getWalletAddress = () => {
  return sessionStorage.getItem("walletAddress");
};

const getAppleId = () => {
  return sessionStorage.getItem("appleId");
};

const getEmail = () => {
  return sessionStorage.getItem("email");
};

// 字段升序排序
const sortByFieldAsc = (data, field) => {
  return data.sort((a, b) => {
    const dateA = new Date(a[field]).getTime();
    const dateB = new Date(b[field]).getTime();
    return dateA - dateB;
  });
}

// 字段降序排序
const sortByFieldDesc = (data, field) => {
  return data.sort((a, b) => {
    const dateA = new Date(a[field]).getTime();
    const dateB = new Date(b[field]).getTime();
    return dateB - dateA;
  });
}

export {
  getWalletAddress,
  getAppleId,
  getEmail,
  sortByFieldAsc,
  sortByFieldDesc
};