const request = require("request-promise");
var crypto = require("crypto");

/**
 * 翻译器
 */
function Translator() {
  this.config = {
    from: "zh_CHS", // zh-CHS(中文) || ja(日语) || EN(英文) || fr(法语) ...
    to: "EN",
    appKey: "445b65d7607c4f71", // https://ai.youdao.com 在有道云上进行注册
    secretKey: "4mWeH4uty1I3krjuChKqil6PgVCat0s8"
  };
}

/**
 * md5加密
 */
Translator.prototype.md5 = function md5(str) {
  var crypto_md5 = crypto.createHash("md5");
  crypto_md5.update(str);
  return crypto_md5.digest("hex");
};

/**
 * 生成[0,n]区间的随机整数
 * 比如生成[0,100]的闭区间随机整数，getRandomN(100)
 */
Translator.prototype.getRandomN = function getRandomN(roundTo) {
  return Math.round(Math.random() * roundTo);
};

/**
 * {a:'111',b:'222'} => a=111&b=222
 */
Translator.prototype.generateUrlParams = function generateUrlParams(_params) {
  const paramsData = [];
  for (const key in _params) {
    if (_params.hasOwnProperty(key)) {
      paramsData.push(key + "=" + _params[key]);
    }
  }
  const result = paramsData.join("&");
  return result;
};

/**
 * 进行翻译
 * 有道翻译api
 * https://ai.youdao.com/DOCSIRMA/html/%E8%87%AA%E7%84%B6%E8%AF%AD%E8%A8%80%E7%BF%BB%E8%AF%91/API%E6%96%87%E6%A1%A3/%E6%96%87%E6%9C%AC%E7%BF%BB%E8%AF%91%E6%9C%8D%E5%8A%A1/%E6%96%87%E6%9C%AC%E7%BF%BB%E8%AF%91%E6%9C%8D%E5%8A%A1-API%E6%96%87%E6%A1%A3.html
 */
Translator.prototype.translate = async function (word) {
  let youdaoHost = "http://openapi.youdao.com/api";
  // 在get请求中，中文需要进行uri编码
  let encodeURIWord = encodeURI(word);
  let salt = this.getRandomN(1000);
  let sign = this.md5(this.config.appKey + word + salt + this.config.secretKey);
  let paramsJson = {
    q: encodeURIWord,
    from: this.config.from,
    to: this.config.to,
    appKey: this.config.appKey,
    salt: salt,
    sign: sign,
  };
  // let url = `http://openapi.youdao.com/api?q=${encodeURI(q)}&from=${from}&to=${to}&appKey=${appKey}&salt=${salt}&sign=${sign}`;
  let url = youdaoHost + "?" + this.generateUrlParams(paramsJson);
  let result = await request.get({ url: url });
  return result;
};

module.exports = Translator;
