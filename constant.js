const path = require('path');

const sheetLink = 'https://docs.google.com/spreadsheets/d/1zBTaZZAq1RxUhaWUVua1sirYGxSWZX8eBWpMWrkQ4qs';

const fileName = 'data.csv';

const pathName = path.join(__dirname, 'locales');

exports.pathName = pathName;
exports.fileName = fileName;
exports.sheetLink = sheetLink;