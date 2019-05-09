import React from 'react'
import CanvasJSReact from '../assets/js/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


function PieChartComponent({ options }) {
    console.log('Ram',options)
    const { count_since_sevendays, count_since_yesterday, total_count, count_prior_sevendays, fetched,owner,name } = options
    const _options = {
        animationEnabled: true,
        title: {
            text: `Open Issues in ${owner}`
        },
        subtitles: [{
            text: `Total ${total_count}`,
            verticalAlign: "center",
            fontSize: 20,
            dockInsidePlotArea: true
        }],
        data: [{
            type: "doughnut",
            showInLegend: true,
            indexLabel: "{name}: {y}",
            yValueFormatString: "##",
            dataPoints: [
                { name: "Since past sevendays", y: count_since_sevendays},
                { name: "Since yesterday", y: count_since_yesterday },
                { name: "Prior to past sevendays", y: count_prior_sevendays },
            ]
        }]
    }
    return (
        <>
            {
                fetched &&
                <div>
                    <CanvasJSChart options={_options} />
                </div>
            }
        </>
    )
}

export default PieChartComponent
