import murmurhash from 'murmurhash';

export const hash = obj => murmurhash(JSON.stringify(obj)).toString();

const randomDigitString = length => {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += Math.floor(Math.random() * 10);
  }
  return result;
};

export const fauxHash = () => randomDigitString(9);
