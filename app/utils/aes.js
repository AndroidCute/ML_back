'use strict';

const CryptoJS = require('crypto-js');
const SECRET = 'egg_shop_1501055229355_649';

function aesEncrypt(data) {
  return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET).toString();
}

function aesDecrypt(data) {
  const bytes = CryptoJS.AES.decrypt(data.toString(), SECRET);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}

module.exports = {
  aesEncrypt,
  aesDecrypt,
};
