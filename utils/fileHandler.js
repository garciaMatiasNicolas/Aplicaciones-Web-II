const fs = require('fs').promises;
const path = require('path');

const readData = async (fileName) => {
  const filePath = path.join(__dirname, '..', 'data', fileName);
  const data = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(data);
};

const writeData = async (fileName, data) => {
  const filePath = path.join(__dirname, '..', 'data', fileName);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
};

module.exports = {
  readData,
  writeData
};
