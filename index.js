const fs = require("fs");
const csv = require("csvtojson");
const matchesPlayedPerYear = require("./ipl/matchesPlayedPerYear.js");
const matchesWonPerYear = require("./ipl/matchesWonPerYear.js");
const extraRuns = require("./ipl/extraRuns.js")
const MATCHES_FILE_PATH = "./csv_data/matches.csv";
const JSON_OUTPUT_FILE_PATH = "./public/data.json";
const DELIVERIES_FILE_PATH = "./csv_data/deliveries.csv";

function main() {
  csv()
    .fromFile(MATCHES_FILE_PATH)
    .then((matches) => {
      csv()
        .fromFile(DELIVERIES_FILE_PATH)
        .then((deliveries) => {
          //MATCHES PLAYED PER YEAR
          let result = matchesPlayedPerYear(matches);
          saveMatchesPlayedPerYear(result);

          //number of matches won by each team over all the years of IPL
          let result2 = matchesWonPerYear(matches);
          saveMatchesWonPerYear(result2);

          let result3=extraRuns(matches,deliveries);
          
        });
    });
}

function saveMatchesPlayedPerYear(result) {
  const jsonData = {
    matchesPlayedPerYear: result,
  };
  const jsonString = JSON.stringify(jsonData);
  fs.writeFile(JSON_OUTPUT_FILE_PATH, jsonString, "utf8", (err) => {
    if (err) {
      console.error(err);
    }
  });
}

function saveMatchesWonPerYear(result) {
  const jsonData = {
    matchesWonPerYear: result,
  };
  // const jsonString = JSON.stringify(jsonData);
  fs.readFile(JSON_OUTPUT_FILE_PATH, "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      obj = JSON.parse(data);
      obj = { ...obj, ...jsonData };
      json = JSON.stringify(obj);
      fs.writeFile(JSON_OUTPUT_FILE_PATH, json, "utf8", (err) => {
        if (err) {
          console.error(err);
        }
      });
    }
  });
}

main();
