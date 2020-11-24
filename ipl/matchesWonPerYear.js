const matchesWonPerYear = (matches) => {
  let result = {};
  for (let match of matches) {
    let season = match.season;
    let winner = match.winner;
    if(winner=="")
    continue
    if (result[season]) {
      result[season][winner] = result[season][winner] + 1 || 1;
    } else {
      result[season] = {};
      result[season][winner] = 1;
    }
  }
  return result
 
};
module.exports = matchesWonPerYear;
