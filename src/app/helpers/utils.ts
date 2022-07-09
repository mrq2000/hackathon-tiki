import fs = require('fs');
import { promisify } from 'util';

export const unlinkAsync = promisify(fs.unlink);

export const getDomain = (host: string): string => {
  return host.split('.')[0];
};

export const getAllValuesEnum = (enumVar: any): any[] => {
  const keysAndValues = Object.values(enumVar);
  const values = [];

  keysAndValues.forEach((keyOrValue: any) => {
    if (isNaN(Number(keyOrValue))) {
      values.push(enumVar[keyOrValue] || keyOrValue);
    }
  });

  return values;
};

export const generateRandomNumber = (start: number, end: number, amount: number, exclude: number[] = []) => {
  if (end - start - exclude.length < amount || amount < 0) throw new Error('vo ly');
  let count = 0;
  const checkExists = {};
  const res = [];
  while (count < amount) {
    const randomNumber = Math.floor(Math.random() * (end - start) + start);
    if (!checkExists[`${randomNumber}random`] && !exclude.includes(randomNumber)) {
      count++;
      res.push(randomNumber);
      checkExists[`${randomNumber}random`] = true;
    }
  }
  return res;
};
