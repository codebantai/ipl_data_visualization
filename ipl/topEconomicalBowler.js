const economical = (matches, deliveries) => {
    let id_of_2015 = [];
    let obj = {};
    let result={}
    let int=parseInt;

    for (let match of matches) {
      let season = match.season;
      let id = match.id;
      if (season == 2015) id_of_2015.push(id);
    }
    for(let delivery of deliveries){
        let bowler=delivery.bowler;
        let totalRuns=delivery.total_runs;
        let id=delivery.match_id;
        if(id_of_2015.includes(id)){
            if(bowler in obj){
                obj[bowler][0]+=1
                obj[bowler][1]+=int(totalRuns);
            }
            else{
                obj[bowler]=[]
                obj[bowler][0]=1;
                obj[bowler][1]=int(totalRuns);
            }
        }

    }
    for(let bowler in obj){
        result[bowler]=parseFloat((obj[bowler][1]/(obj[bowler][0]/6)).toFixed(2))
    }
    

    return Object.fromEntries(Object.entries(result).sort((a,b) => a[1]-b[1]).slice(0,10))

}
module.exports = economical;