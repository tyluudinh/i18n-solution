const axios = require('axios');
const csvtojson = require('csvtojson');
const fs = require('fs/promises');
const { sheetLink, fileName, pathName } = require('./constant');

// Replace 'YOUR_GOOGLE_SHEET_LINK' with the link to your Google Sheet

// Function to download Google Sheet as CSV
async function downloadGoogleSheetAsCsv() {
  try {
    const response = await axios.get(`${sheetLink}/export?format=csv`);

    // Save the CSV content to a file
    await fs.writeFile(fileName, response.data);

    console.log('CSV file created successfully.');
  } catch (error) {
    console.error('Error downloading Google Sheet:', error.message);
  }
}

// Function to read data from CSV file and create JSON files using csvtojson
async function readCsvAndCreateJson() {
  try {
    // Read data from CSV file
    const csvData = await fs.readFile('data.csv', 'utf-8');

    // Convert CSV to JSON using csvtojson
    const jsonArray = await csvtojson().fromString(csvData);

    // Initialize data objects

    const data = {};

    const headers = Object.keys(jsonArray[0]).filter(key => key !== 'Code');

    headers.forEach(key => {
      data[key] = {};
    })

    // Assuming the first column is Code and the following columns are English, China, and Vietnam
    jsonArray.forEach((row) => {
      const code = row.Code;

      headers.forEach(key => {
        data[key][code] = row[key];
      })

    });

    Object.keys(data).forEach(async (key) => {
      const fileName = `${pathName}/${key}.json`
      const tranData = JSON.stringify(data[key], null, 2);
      await fs.writeFile(fileName, tranData);

      console.log(`JSON '${fileName}' created successfully.`);
    });

  } catch (error) {
    console.error('Error reading CSV file:', error.message);
  }
}

async function afterDone() {
  // Remove file
  await fs.unlink(fileName);
  console.log('CSV file removed successfully.');
}

// Execute the functions
downloadGoogleSheetAsCsv()
  .then(readCsvAndCreateJson)
  .then(afterDone)
  .catch((error) => console.error('Error:', error));
