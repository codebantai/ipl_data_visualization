

function fetchAndVisualizeData() {
    fetch("./data.json")
      .then(r => r.json())
      .then(visualizeData);
  }
  
  fetchAndVisualizeData();
  
  function visualizeData(data) {
    visualizeMatchesPlayedPerYear(data.matchesPlayedPerYear);
    visualizeMatchesWonPerYear(data.matchesWonPerYear);
    return;
  }
  
  function visualizeMatchesPlayedPerYear(matchesPlayedPerYear) {
    const seriesData = [];
    for (let year in matchesPlayedPerYear) {
      seriesData.push([year, matchesPlayedPerYear[year]]);
    }
  
    Highcharts.chart("matches-played-per-year", {
      chart: {
        type: "column"
      },
      title: {
        text: "Matches Played Per Year"
      },
      subtitle: {
        text:
          'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
      },
      xAxis: {
        type: "category"
      },
      yAxis: {
        min: 0,
        title: {
          text: "Matches"
        }
      },
      series: [
        {
          name: "Years",
          data: seriesData
        }
      ]
    });
  }
  function visualizeMatchesWonPerYear(matchesWonPerYear){
  
    let categories=[]
    let series=[]
    let teams=[]
    let team_wins=[]
    for(let year in matchesWonPerYear){
        // console.log(year)
        for(let team in matchesWonPerYear[year]){
          if(!teams.includes(team) )
          teams.push(team) 
        }
        categories.push(year)
    }
    console.log(categories)
      for(let team of teams){
        let temp=[]
        
          for(let year of categories){
            
            
            if(matchesWonPerYear[year][team]){
                temp.push(matchesWonPerYear[year][team])
            }
            else
            temp.push(0)
          }
          team_wins.push(temp)        
      }
      for(let team in teams){
        let temp_Obj={}
        temp_Obj["name"]=teams[team]
        temp_Obj["data"]=team_wins[team]
        series.push(temp_Obj)
      }
      console.log(series)
    // console.log(team_wins,teams)
    Highcharts.chart('container', {
      chart: {
          type: 'column'
      },
      title: {
          text: 'The number of matches won by each team over all the years of IPL.'
      },
      subtitle: {
          text: 'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
      },
      xAxis: {
          categories: categories,
          crosshair: true
      },
      yAxis: {
          min: 0,
          title: {
              text: 'matches'
          }
      },
      tooltip: {
          headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
          pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
              '<td style="padding:0"><b>{point.y:.1f} </b></td></tr>',
          footerFormat: '</table>',
          shared: true,
          useHTML: true
      },
      plotOptions: {
          column: {
              pointPadding: 0.2,
              borderWidth: 0
          }
      },
      series: series
  });
  }