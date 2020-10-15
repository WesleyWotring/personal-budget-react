import React, { useEffect } from 'react';
import Chart from 'chart.js';
import axios from 'axios';
import * as d3 from 'd3';
import { entries } from 'd3-collection';




function HomePage() {
 //chart js implemented 

 //<script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.20.0/axios.min.js" integrity="sha512-quHCp3WbBNkwLfYUMd+KwBAgpVukJu5MncuQaWXgCrfgcxCJAq/fo+oqrRKOj+UKEmyMCG3tb8RB63W+EmrOBg==" crossorigin="anonymous"></script>

         var dataSource = {
            datasets: [
                {
                    data:[],
                    backgroundColor:[
                        '#ffcd56',
                        '#ff6384',
                        '#36a2eb',
                        '#8e2be2',
                        '#ffc0cb',
                        '#adff2f',
                        '#ffa500',
                    ],
                }
            ],
            labels: []
        }
        
     
        function getDonutBudget(){
            axios.get('/budget') //access a system level resource 
            axios.get('http://localhost:3001/budget') // a remote server resource 
            .then(function (res){
                console.log(res);
                for (var i = 0; i < res.data.length; i++){
                    dataDonut[res.data[i].title] = res.data[i].budget;
                }
                createDonut();
            });
        }
        getDonutBudget();
        var dataDonut = {};
    
        function createDonut(){        
            // set the dimensions and margins of the graph
            var width = 350
            var height = 350
            var margin = 40
    
            // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
            var radius = Math.min(width, height) / 2 - margin
    
            // append the svg object to the div called 'my_dataviz'
            var svg = d3.select("#my_dataviz")
            .append("svg")
                .attr("width", width)
                .attr("height", height)
            .append("g")
                .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
    
           
            // set the color scale
            var color = d3.scaleOrdinal()
            .domain(Object.keys(dataDonut))
            .range(d3.schemeDark2);
    
            // Compute the position of each group on the pie:
            var pie = d3.pie()
            .sort(null) // Do not sort group by size
            .value(function(d) {return d.value; })
            var data_ready = pie(entries(dataDonut))
    
            // The arc generator
            var arc = d3.arc()
            .innerRadius(radius * 0.5)         // This is the size of the donut hole
            .outerRadius(radius * 0.8)
    
            // Another arc that won't be drawn. Just for labels positioning
            var outerArc = d3.arc()
            .innerRadius(radius * 0.9)
            .outerRadius(radius * 0.9)
    
            // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
            svg
            .selectAll('allSlices')
            .data(data_ready)
            .enter()
            .append('path')
            .attr('d', arc)
            .attr('fill', function(d){ return(color(d.data.key)) })
            .attr("stroke", "white")
            .style("stroke-width", "2px")
            .style("opacity", 0.7)
    
            // Add the polylines between chart and labels:
            svg
            .selectAll('allPolylines')
            .data(data_ready)
            .enter()
            .append('polyline')
                .attr("stroke", "black")
                .style("fill", "none")
                .attr("stroke-width", 1)
                .attr('points', function(d) {
                var posA = arc.centroid(d) // line insertion in the slice
                var posB = outerArc.centroid(d) // line break: we use the other arc generator that has been built only for that
                var posC = outerArc.centroid(d); // Label position = almost the same as posB
                var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2 // we need the angle to see if the X position will be at the extreme right or extreme left
                posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left
                return [posA, posB, posC]
                })
    
            // Add the polylines between chart and labels:
            svg
            .selectAll('allLabels')
            .data(data_ready)
            .enter()
            .append('text')
                .text( function(d) { console.log(d.data.key) ; return d.data.key } )
                .attr('transform', function(d) {
                    var pos = outerArc.centroid(d);
                    var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
                    pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
                    return 'translate(' + pos + ')';
                })
                .style('text-anchor', function(d) {
                    var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
                    return (midangle < Math.PI ? 'start' : 'end')
                })
    
        }
    


        //regular chart
      function createChart(){
        var ctx = document.getElementById("myChart");
        var myPieChart = new Chart(ctx, {
            type: 'pie',
            data: dataSource
        });
    }
    function getBudget(){
        axios.get('http://localhost:3001/budget')
        .then(function (res){
            console.log(res);
            for (var i = 0; i < res.data.length; i++){
                dataSource.datasets[0].data[i] = res.data[i].budget;
                dataSource.labels[i] = res.data[i].title;
            }
            createChart();
        });
    }
    getBudget();
   

      
  return (
    <main className="container center">

        <section className="page-area">

            <div className="text-box">
                <h2>Stay on track</h2>
                <p>
                    Do you know where you are spending your money? If you really stop to track it down,
                    you would get surprised! Proper budget management depends on real data... and this
                    app will help you with that!
                </p>
            </div>
    
            <div className="text-box">
                <h2>Alerts</h2>
                <p>
                    What if your clothing budget ended? You will get an alert. The goal is to never go over the budget.
                </p>
            </div>
    
            <div className="text-box">
                <h2>Results</h2>
                <p>
                    People who stick to a financial plan, budgeting every expense, get out of debt faster!
                    Also, they to live happier lives... since they expend without guilt or fear... 
                    because they know it is all good and accounted for.
                </p>
            </div>
    
            <div className="text-box">
                <h2>Free</h2>
                <p>
                    This app is free!!! And you are the only one holding your data!
                </p>
            </div>
    
            <div className="text-box">
                <h2>Stay on track</h2>
                <p>
                    Do you know where you are spending your money? If you really stop to track it down,
                    you would get surprised! Proper budget management depends on real data... and this
                    app will help you with that!
                </p>
            </div>
    
            <div className="text-box">
                <h2>Alerts</h2>
                <p>
                    What if your clothing budget ended? You will get an alert. The goal is to never go over the budget.
                </p>
            </div>
                    <div id="my_dataviz">
            </div>
            
            <div className="text-box">
                <h2>Chart</h2>
                <p>
                    <canvas id="myChart" width = "350" height="350"></canvas>
                </p>
            </div>

        </section>
         
    </main>
  
  );
}

export default HomePage;
