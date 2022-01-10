const request = require("request-promise");
var crypto = require("crypto");

/**
 * 翻译器
 */
const Translator = class {
  constructor(config) {
    this.config = config;
  }
  /**
   * md5加密
   */
  md5(str) {
    const crypto_md5 = crypto.createHash("md5");
    crypto_md5.update(str);
    return crypto_md5.digest("hex");
  }

  /**
   * 生成[0,n]区间的随机整数
   * 比如生成[0,100]的闭区间随机整数，getRandomN(100)
   */
  getRandomN(roundTo) {
    return Math.round(Math.random() * roundTo);
  }

  /**
   * 参数处理
   * {a:'111',b:'222'} => a=111&b=222
   */
  generateUrlParams(_params) {
    const paramsData = [];
    for (const key in _params) {
      if (_params.hasOwnProperty(key)) {
        paramsData.push(key + "=" + _params[key]);
      }
    }
    const result = paramsData.join("&");
    return result;
  }
  
  /**
   * 进行翻译
   * 有道翻译api
   * https://ai.youdao.com/DOCSIRMA/html/%E8%87%AA%E7%84%B6%E8%AF%AD%E8%A8%80%E7%BF%BB%E8%AF%91/API%E6%96%87%E6%A1%A3/%E6%96%87%E6%9C%AC%E7%BF%BB%E8%AF%91%E6%9C%8D%E5%8A%A1/%E6%96%87%E6%9C%AC%E7%BF%BB%E8%AF%91%E6%9C%8D%E5%8A%A1-API%E6%96%87%E6%A1%A3.html
   */
   async translate(word) {
    const youdaoHost = "http://openapi.youdao.com/api";
    // 在get请求中，中文需要进行uri编码
    const encodeURIWord = encodeURI(word);
    const salt = this.getRandomN(1000);
    const sign = this.md5(this.config.appKey + word + salt + this.config.secretKey);
    const paramsJson = {
      q: encodeURIWord,
      from: this.config.from,
      to: this.config.to,
      appKey: this.config.appKey,
      salt,
      sign,
    };
    // let url = `http://openapi.youdao.com/api?q=${encodeURI(q)}&from=${from}&to=${to}&appKey=${appKey}&salt=${salt}&sign=${sign}`;
    const url = youdaoHost + "?" + this.generateUrlParams(paramsJson);
    const result = await request.get({ url });
    return result;
   }

}
module.exports = Translator;
