const fs = require("fs");
const csv = require("csvtojson");
const path=require("path")
const matchesPlayedPerYear = require("./ipl/matchesPlayedPerYear");
const matchesWonPerYear = require("./ipl/matchesWonPerYear");
const extras = require("./ipl/extras");
const economical=require("./ipl/topEconomicalBowler");
const teamWinbyVenue=require("./ipl/teamWinbyVenue");

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
          

          //number of matches won by each team over all the years of IPL
          let result2 = matchesWonPerYear(matches);
          
          //For the year 2016, plot the extra runs conceded by each team.
          let result3=extras(matches,deliveries);

          //Top economical bowlers of 2015
          let result4=economical(matches,deliveries);
          
          //matches won by each team per venue
          let result5=teamWinbyVenue(matches);

          saveJson(result,result2,result3,result4,result5);

          
        });
    });
}

function saveJson(result,result2,result3,result4,result5) {
  const jsonData = {
    matchesPlayedPerYear: result,
    matchesWonPerYear: result2,
    extraRunsIn2016: result3,
    economicalBowlersEachYear:result4,
    teamWinsperVenue:result5
  };
  const jsonString = JSON.stringify(jsonData);
  fs.writeFile(JSON_OUTPUT_FILE_PATH, jsonString, "utf8", (err) => {
    if (err) {
      console.error(err);
    }
  });
}

// function saveMatchesWonPerYear(result) {
//   const jsonData = {
    
//   };
//   // const jsonString = JSON.stringify(jsonData);
//   fs.readFile(JSON_OUTPUT_FILE_PATH, "utf8", (err, data) => {
//     if (err) {
//       console.error(err);
//     } else {
//       obj = JSON.parse(data);
//       obj = { ...obj, ...jsonData };
//       json = JSON.stringify(obj);
//       fs.writeFile(JSON_OUTPUT_FILE_PATH, json, "utf8", (err) => {
//         if (err) {
//           console.error(err);
//         }
//       });
//     }
//   });
// }





main();
