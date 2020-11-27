const economical = (matches, deliveries) => {
    let result={}
    
    let int=parseInt;
    let years=[]
    
    for (let match of matches) {
      let season = match.season;
      if(!years.includes(season))years.push(season)
    }
    for(let year of  years){
        let tempResult={}
        let obj = {};
        // console.log(year)
        let idEachYear=[]
        for (let match of matches) {
            let id = match.id;
            let season = match.season;
            if (season == year) idEachYear.push(id);
            
        }
        // console.log idEachYear)
        for(let delivery of deliveries){
        let bowler=delivery.bowler;
        let totalRuns=delivery.total_runs;
        let id=delivery.match_id;
        if (idEachYear.includes(id)){
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
        tempResult[bowler]=parseFloat((obj[bowler][1]/(obj[bowler][0]/6)).toFixed(2))
    }
    

    result[year] = Object.fromEntries(Object.entries(tempResult).sort((a,b) => a[1]-b[1]).slice(0,10))
    }
    return result
}
module.exports = economical;