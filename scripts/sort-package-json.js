/* eslint-disable */
const packageJson = require('../package.json');
const fs = require('fs');

function sortJSON(object) {
  if (object instanceof Array) {
    for (let i = 0; i < object.length; i++) {
      object[i] = sortJSON(object[i]);
    }

    return object;
  } else if (typeof object != 'object') {
    return object;
  }

  let keys = Object.keys(object);
  keys = keys.sort();

  let newObject = {};
  for (let i = 0; i < keys.length; i++) {
    newObject[keys[i]] = sortJSON(object[keys[i]]);
  }

  return newObject;
}

const sortedPackageJson = sortJSON(packageJson);
fs.writeFile(
  'package.json',
  JSON.stringify(sortedPackageJson, null, 2),
  { encoding: 'utf8' },
  (error) => {
    if (error) {
      console.error(error);
    } else {
      console.log('package.json is sorted!');
    }
  },
);
