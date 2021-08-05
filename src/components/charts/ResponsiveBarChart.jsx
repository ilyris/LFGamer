import React, { useState, useEffect } from 'react'
import S from 'styled-components';
import Highcharts from  "highcharts/highstock";
import highchartsMore from "highcharts/highcharts-more.js"
import accessibility from "highcharts/modules/accessibility.js";
import HighchartsReact from "highcharts-react-official";

highchartsMore(Highcharts)
accessibility(Highcharts);

export function Responsivebarchart({data}) {

    var pieColors = (function () {
        var colors = [],
            base = 'rgb(0, 152, 142) 100%)',
            i;
    
        for (i = 0; i < 10; i += 1) {
            // Start out with a darkened base color (negative brighten), and end
            // up with a much brighter color
            colors.push(Highcharts.color(base).brighten((i - 3) / 7).get());
        }
        return colors;
    }());

    // calculate each champoions wins
    function groupBy(objArr, property) {
        return objArr = data.reduce((acc, obj) => {
            let key = obj[property];
            if(!acc[key]) {
                acc[key] = []
            }
            acc[key].push(obj)
            return acc
        }, {})
    }
    const groupedChampions = groupBy(data, 'champion');
    // const gameVictoryStatus = groupBy(groupedChampions, 'win'); // get wins / losses by gameVictoryStatus.length
    // const groupedLanesPlayed = groupBy(groupedChampions, 'lane')

    let gameStatusByChampion = Object.values(groupedChampions).map(  champions => {
        let newObj = {};
        let winCount = 0;
        champions.forEach(champion => {
            if(champion.win == true) {
                winCount++
                newObj = {
                        'name': champion.champion,
                        'y':winCount,
                        
                    
                }
            } else {
                newObj = {
                        'name': champion.champion,
                        'y':winCount,
                } 
            }          
        })
        return newObj
    } )


    // Calculate

   let options =   {  
    chart: {
        type: 'pie',
        height: '60%',
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        backgroundColor: '#222',
        width: 400,
    },

    title: {
        text: 'Last  10 Matches',
        style: {
            color: '#FFF',
            fontWeight: 'bold'
        }
    },

    legend: {
        align: 'right',
        verticalAlign: 'middle',
        layout: 'vertical'
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
        point: {
            valueSuffix: '%'
        }
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                color: '#fff',
                style: {
                    stroke: 'none',
                    shadow: 'none',
                    fontSize: '14px'                    ,
                    fontWeight: '100'
                }

            },
            colors: pieColors,
            shadow: 'none',
            borderWidth: 'none',
            style: {
                color: '#FFF',
                fontWeight: 'bold'
            }
        },
        stroke: 'none',

    },

    series: [{
        name: 'Wins',
        data: gameStatusByChampion
    }],
}
    return (
        <ChartContainer>
            <HighchartsReact highcharts={Highcharts} options={options}/>
        </ChartContainer>
    )
}
const ChartContainer = S.div`

`;