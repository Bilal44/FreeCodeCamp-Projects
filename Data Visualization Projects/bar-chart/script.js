
 function PopulateChart(dataset){
    // Chart area
     var margin  = {top: 100, right: 350, bottom: 50, left: 350},
         width   = 1200,
         height  = 600
   
     // X and Y axis
     var minDate = dataset[0][0].substr(0,4);
         minDate = new Date(minDate);
     var maxDate = dataset[dataset.length - 1][0].substr(0,4);
         maxDate = new Date(maxDate);
    
    var xAxisScale = d3.time.scale()
        .domain([minDate, maxDate])
        .range([0, width]);

    var yAxisScale = d3.scale.linear()
        .domain([0, d3.max(dataset, function(d) {
            return d[1]; 
        })
    ])
    .range([height, 0]);
    
    // Display X and Y axis labels
     var xAxis = d3.svg.axis().scale(xAxisScale).orient("bottom"); 
     var yAxis = d3.svg.axis().scale(yAxisScale).orient("left");
     
     var tooltip = d3.select('body').append('div')
     .style({
       'position': 'absolute',
       'padding': '4px',
       'background': '#fff',
       'border': '1px solid #000',
       'color':'#000'
       });

// Mouseover and tooltips

function mouseoverHandler(d) {
  tooltip.transition().style('opacity', .8)

  tooltip.style({
           'left': (d3.event.pageX + 10) + 'px',
           'top': (d3.event.pageY + 15) + 'px'
           })
         .attr({
            'id': 'tooltip',
            'data-date' : d[0]
           })
         .html('<p> Date: ' + d[0] + '</p>'
                 + '<p> Billions: ' + d[1] + '</p>')
   
  d3.select(this)
     .style('opacity', .1);
}

function mouseoutHandler(d) {
   tooltip.transition().style('opacity', 0)  
   d3.select(this)
     .style('opacity', 1);
}

function mouseMoving (d) {
   tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");
   d3.select(this)
     .style('opacity', 0.7);
}
     
// Select svg component on index page to add chart visualisation 
 var svg= d3.select("svg")
         .attr("width", width + margin.left + margin.right)
         .attr("height", height + margin.top + margin.bottom)
         .append("g")
         .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
   
   // Add bars to chart area
   svg.selectAll("bar")
        .data(dataset)
        .enter()
        .append("rect")
        .style("fill", "lightblue")
        .attr({
              x: function(d, i) { return (i * (width / dataset.length)); },
              y: function(d) { return yAxisScale(d[1]); },
              width: (width / dataset.length),
              height: function(d) { return height - yAxisScale(d[1]); },
              class: "bar",
              "data-date": function(d) { return d[0]; },
              "data-gdp": function(d) { return d[1]; }
     })
         .on('mouseover', mouseoverHandler)
           .on("mousemove",mouseMoving)
           .on("mouseout", mouseoutHandler);
       
        // Append x axis data
        svg.append("g")
             .attr("id", "x-axis")
             .attr("transform", "translate(0, " + height + ")")
             .call(xAxis)
             .selectAll("text")
             .style("text-anchor", "end")
             .attr("dx", "-0.5em")
             .attr("dy", "-.55em")
             .attr("y", 30)
             .attr("transform", "rotate(-45)" )

         // Append y axis data
         svg.append("g")
             .attr("id", "y-axis")
             .call(yAxis)
             .append("text")
             .attr("transform", "rotate(-90)")
             .attr("y", -85)
             .attr("dy", "0.8em")
             .attr("text-anchor", "end")
             .text("Value (billions)");
     }

 // Fetch json chart data and call PopulateChart function to visualise the data
 d3.json("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json", function(data) {
  var dataset = data.data;
   PopulateChart(dataset);
  });