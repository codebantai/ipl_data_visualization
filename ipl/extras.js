const extras = (matches, deliveries) => {
  let int=parseInt;
  let id_of_2016 = [];
  let result = {};
  for (let match of matches) {
    let season = match.season;
    let id = match.id;
    if (season == 2016) id_of_2016.push(id);
  }

  for (let delivery of deliveries) {
    let id = delivery.match_id;
    let extraRuns = delivery.extra_runs;
    let bowlingTeam = delivery.bowling_team;
    if (id_of_2016.includes(id)) {
      if (result[bowlingTeam]) {
        result[bowlingTeam] += int(extraRuns);
      } else {
        result[bowlingTeam] = int(extraRuns);
      }
    }
  }
  return result;


};

module.exports = extras;
