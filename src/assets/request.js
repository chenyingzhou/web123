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
//内部代发
function transferInner(data) {
  return instance.post('/pay/transferInner', data)
}
//短信确认
function confirm(data) {
  return instance.post('/pay/confirm', data)
}
function getList(data) {
  return instance.post('/pay/acctList', data)
}

export {
  login,
  getPass,
  accountPay,
  applyCode,
  verifyCode,
  transfer,
  transferInner,
  confirm,
  getList
}
