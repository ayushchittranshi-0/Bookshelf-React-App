export const emailValidation = (i) => {
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return reg.test(i);
};

export const usernameValidation = (i) => {
  let reg = /^[a-zA-Z0-9]+$/;
  return reg.test(i);
};

export const passwordValidation = (i) => {
  let reg = /^[A-Za-z]\w{7,14}$/;
  return reg.test(i);
};
