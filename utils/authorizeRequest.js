import randomstring from "randomstring";
import nodeBase64 from "nodejs-base64-converter";
import hmacSHA1 from 'crypto-js/hmac-sha1';
import base64 from 'crypto-js/enc-base64';

export const authorizeRequest = () => {
  const twitterAPIKEY = process.env.NEXT_PUBLIC_TWITTER_CONSUMER_KEY;
  const twitterSecret = process.env.NEXT_PUBLIC_TWITTER_CONSUMER_SECRET;
  const baseURL = "https://api.twitter.com/oauth/request_token";
  const encodedBaseURL = encodeURIComponent(baseURL);
  const urlQuery = {
    oauth_callback:
      "http://localhost:3000/2b2fdd8dce12993016a59607a51fe516979370efdc124e2e45300a0a43ca2e05",
  };
  const httpMethod = "POST";

  function toArray(object) {
    let array = [];
    Object.keys(object).forEach((key) => {
      array.push(`${key}=${object[key]}`);
    });
    return array;
  }

  function generateNonce() {
    return nodeBase64.encode(randomstring.generate(32));
  }

  function generateOAuth() {
    var oauth = {};
    oauth.oauth_consumer_key = twitterAPIKEY;
    oauth.oauth_nonce = generateNonce();
    // if (flag) {
    //     oauth.oauth_signature = getSignature();
    // }
    oauth.oauth_signature_method = "HMAC-SHA1";
    oauth.oauth_timestamp = Math.floor(Date.now() / 1000);
    oauth.oauth_version = "1.0";

    return oauth;
  }

  function generateParameter() {
    const parameter = Object.assign(generateOAuth(), urlQuery);

    return parameter;
  }

  function paramsToSingleString(params) {
    var encodedParams = {};
    var encodedParamsSorted = {};

    for (let key in params) {
      var encodedKey = encodeURIComponent(key);
      var encodedValue = encodeURIComponent(params[key]);

      encodedParams[encodedKey] = encodedValue;
    }

    Object.keys(encodedParams)
      .sort()
      .forEach((key) => {
        encodedParamsSorted[key] = encodedParams[key];
      });

    const singleString = toArray(encodedParamsSorted).join(
      "&"
    );

    return singleString;
  }

  function generateSignatureBaseString() {
    const paramString = paramsToSingleString(generateParameter());
    const encodedParamString = encodeURIComponent(paramString);
    const string = `${httpMethod}&${encodedBaseURL}&${encodedParamString}`;

    return string;
  }

  function getSigningKey() {
    const encodedTwitterSecret = encodeURIComponent(twitterSecret);
    const signingKey = `${encodedTwitterSecret}&`;

    return signingKey;
  }

  function getSignature() {
    const oauth_signature = base64.stringify(
        hmacSHA1(generateSignatureBaseString(), getSigningKey())
      );

    return oauth_signature;
  }

  function buildHeaderString() {
    var DST = `OAuth `;
    const headerObject = Object.assign(generateParameter(), {oauth_signature: getSignature()})

    for (let key in headerObject) {
        DST = DST.concat(encodeURIComponent(key));
        DST = DST.concat("=");
        DST = DST.concat("\"");
        DST = DST.concat(encodeURIComponent(headerObject[key]));
        DST = DST.concat("\"");
        DST = DST.concat(", ");
    }

    return DST.slice(0, -2);
  }

  return buildHeaderString();
};
