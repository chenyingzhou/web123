import instance from "./axios";

function login(data) {
  return instance.post('user/login', data)
}

function getPass(data) {
  return instance.post('pay/randomKey', data)
}

function accountPay(data) {
  return instance.post('pay/acctApply', data)
}

function applyCode(data) {
  return instance.post('pay/verifycodeApply', data)
}

function verifyCode(data) {
  return instance.post('pay/verifycodeVerify', data)
}

function transfer(data) {
  return instance.post('pay/transfer', data)
}

export {
  login,
  getPass,
  accountPay,
  applyCode,
  verifyCode,
  transfer
}
