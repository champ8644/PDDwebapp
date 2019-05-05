function ttEpo(x) {
  x = x || {};
  x.hr = x.hr || 0;
  x.min = x.min || 0;
  x.sec = x.sec || 0;
  return x.hr * 3600 + x.min * 60 + x.sec;
}
function epotT(x) {
  return {
    hr: Math.floor(x / 3600) % 24,
    min: Math.floor(x / 60) % 60,
    sec: x % 60
  };
}
function epotStr(x) {
  let y = epotT(x);
  return y.hr + ':' + ('00' + y.min).slice(-2);
}
function ttStr(x) {
  x = x || {};
  x.hr = x.hr || 0;
  x.min = x.min || 0;
  x.sec = x.sec || 0;
  return ('00' + x.hr).slice(-2) + ':' + ('00' + x.min).slice(-2);
}

function isNumber(x) {
  return /^\d*\.?\d*$/.test(x);
}
function isFraction(x) {
  return /^\d*[¼½¾]$/.test(x);
}
const isDispTimeWithColon_Digit = [
  /^:$/,
  /^((\d:)|(:\d))$/,
  /^((([01]\d|[2][0-3]):)|(\d:[0-5])|(:[0-5]\d))$/,
  /^((\d:[0-5]\d)|(([01]\d|[2][0-3]):[0-5]))$/,
  /^(([01]\d|2[0-3]):([0-5]\d))$/
];
const isDispTimeNoColon_Digit = [
  /^$/,
  /^\d$/,
  /^(\d[0-5])$/,
  /^((\d[0-5]\d)|(([01]\d|[2][0-3])[0-5]))$/,
  /^(([01]\d|2[0-3])[0-5]\d)$/
];
const test3DigitNoColon = [/^((\d[0-5]\d))$/, /^((([01]\d|[2][0-3])[0-5]))$/];

function isValidDisplayTime(x) {
  for (let i = 0; i <= 4; i++)
    if (isDispTimeWithColon_Digit[i].test(x)) {
      console.log('WithColon:', i);
      return true;
    }
  for (let i = 0; i <= 2; i++)
    if (isDispTimeNoColon_Digit[i].test(x)) {
      console.log('withoutColon:', i);
      return true;
    }
  return false;
}

module.exports = {
  ttEpo,
  ttStr,
  epotT,
  isNumber,
  isFraction,
  epotStr,
  isValidDisplayTime,
  isDispTimeWithColon_Digit,
  isDispTimeNoColon_Digit,
  test3DigitNoColon
};
