const  teamWinbyVenue=(matches)=>{
let result={}
for(let match of matches){
let venue=match.venue;
let winner=match.winner;

if(result[venue]){
if(result[venue][winner]){
result[venue][winner]+=1;
}
else{
    result[venue][winner]=1;
}
}
else{
    result[venue]={}
    result[venue][winner]=1;
}


}
return result

}

module.exports= teamWinbyVenue;