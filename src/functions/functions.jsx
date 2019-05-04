const ttEpo = x => {
  x = x || {};
  x.hr = x.hr || 0;
  x.min = x.min || 0;
  x.sec = x.sec || 0;
  return x.hr * 3600 + x.min * 60 + x.sec;
};
const epotT = x => {
  return {
    hr: Math.floor(x / 3600) % 24,
    min: Math.floor(x / 60) % 60,
    sec: x % 60
  };
};
const isNumber = x => {
  return /^\d*\.?\d*$/.test(x);
};
const isFraction = x => {
  return /^\d*[¼½¾]$/.test(x);
};

module.exports = { ttEpo, epotT, isNumber, isFraction };
