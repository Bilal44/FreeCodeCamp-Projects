function populateScatterGraph(url){
    // Chart area
    var margin = { top: 60, left: 60, bottom: 60, right: 90 } 
    var height = 480, width = 780;
    
    // Time parser for race times
    var timeParser = d3.timeParse("%M:%S");
    
    // X and Y axis scaling
    var x = d3.scaleLinear().range([0, width]);
    var y = d3.scaleTime().range([0, height]);
    
    // X and Y axis labels
    var xAxis = d3.axisBottom(x)
        .tickFormat(d3.format("d"));

    var yAxis = d3.axisLeft(y)
        .ticks(d3.timeSecond.every(10))
        .tickFormat(d3.timeFormat("%M:%S"));
      
    // Set up Scatterplot graph essential elements and configurations
    var svg = d3.select("svg")
        .attr("height", height + margin.top + margin.bottom)
        .attr("width", width + margin.left + margin.right);
        
    svg.append("rect")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .attr("x", 0)
            .attr("y", 0)
            .attr("fill", "white")
            .attr("fill-opacity", 0.8);

    svg = svg.append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");    
        
    // Populate the scatterplot graph from remote json data file
    d3.json(url)
        .then((data) => {
            var fastest = d3.min(data.map((item) => { return timeParser(item.Time); }));
            var slowest = d3.max(data.map((item) => { return timeParser(item.Time); }));
            
             x.domain([d3.min(data, (d) => { return d.Year; }), d3.max(data, (d) => { return d.Year; })]);
             y.domain([slowest, fastest]);
    
             svg.append("g")
                 .attr("id", "x-axis")
                 .attr("transform", "translate(0," + height + ")")
                 .call(xAxis)
               .append("text")
                 .attr("transform", "translate(" + width + ",-30)")
                 .attr("dy", "1.8em")
                 .attr("text-anchor", "end")
                 .text("Race time for 13.8km");
            
             svg.append("g")
                 .attr("id", "y-axis")
                 .call(yAxis)
               .append("text")
                 .attr("transform", "rotate(-90)")
                 .attr("dy", "-0.8em")
                 .attr("text-anchor", "end")
                 .text("Position");
            
            // Add inidividual data entities (cyclist) as a circle on the chart
             var cyclist = svg.selectAll(".cyclist")
                 .data(data)
               .enter().append("g")
                 .attr("class", "cyclist")
                 .attr("x", (d) => { return x(d.Year); })
                 .attr("y", (d) => { return y(timeParser(d.Time)); })
            
             cyclist.append("circle")
                 .attr("class", "dot")
                 .attr("cx", (d) => { return x(d.Year); })
                 .attr("cy", (d) => { return y(timeParser(d.Time)); })
                 .attr("data-xvalue", (d) => { return d.Year; })
                 .attr("data-yvalue", (d) => { return timeParser(d.Time); })
                 .attr("r", 5)
                 .attr("fill", (d) => { return d.Doping; })
            
             // Add the cyclist's name next to their circle on the chart
             cyclist.append("text")
                 .attr("x", (d) => { return x(d.Year) + 5; })
                 .attr("y", (d) => { return y(timeParser(d.Time)) + 7; })
                 .text((d) => { return d.Name; }); 
    });
}

var draw = () => {
    populateScatterGraph("https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json");
}

draw.call();