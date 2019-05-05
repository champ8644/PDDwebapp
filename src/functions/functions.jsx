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
function isDisplayTimeWithColon(x) {
  return /^([01]?\d|2[0-3])?:([0-5]?\d)?$/.test(x);
}
function isDisplayTimeWithoutColon(x) {
  return /^(\d|[01]\d([0-5]\d?)?|2[0-3]([0-5]\d?)?)$/.test(x);
}

module.exports = {
  ttEpo,
  ttStr,
  epotT,
  isNumber,
  isFraction,
  epotStr,
  isDisplayTimeWithColon,
  isDisplayTimeWithoutColon
};
