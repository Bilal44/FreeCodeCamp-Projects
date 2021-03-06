function populateScatterGraph(url){
    // Chart area
    var margin = { top: 50, left: 420, bottom: 50, right: 420 } 
    var height = 720, width = 1080;
    
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

    // Colouring scheme for chart data points depending on the cyclist's doping allegation status
    function dopingColour(value) {
        return value !== "" ? "orange" : "lightgreen";
    }

    // Tooltip functions
    var tooltip = d3.select("body").append("div")
                    .attr("id", "tooltip");

    function showToolTip(event, d) {
        tooltip.style("display", "block");
        tooltip.attr('data-year', d.Year);
        tooltip.style("top", (event.pageY + 20) + "px");
        tooltip.style("left", (event.pageX) + "px");

        tooltip.html("<span><b>" + d.Name + ": " + d.Nationality + "<br/>" + 
        "Year: " + d.Year + " | Time: " + d.Time + "<br/><br/>" + 
        "Doping: " + d.Doping + "</b></span>");
    }
    
    function hideToolTip() {
        tooltip.style("display", "none");
    }

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
            var fastest = d3.min(data.map((item) => { return timeParser(item.Time) }));
            var slowest = d3.max(data.map((item) => { return timeParser(item.Time); }));
            fastest.setSeconds(fastest.getSeconds() - 5);
            slowest.setSeconds(slowest.getSeconds() + 5)
            
             x.domain([d3.min(data, (d) => { return d.Year - 0.5; }), d3.max(data, (d) => { return d.Year + 0.5; })]);
             y.domain([slowest, fastest]);
    
             svg.append("g")
                 .attr("id", "x-axis")
                 .attr("transform", "translate(0," + height + ")")
                 .call(xAxis);
             svg.append("text")
                 .attr("transform", "translate(" +  (width - 130) + "," + (height + 40) + ")")
                 .style("font-size", 20)
                 .text("Year of Race");
            
             svg.append("g")
                 .attr("id", "y-axis")
                 .call(yAxis);
             svg.append("text")
                 .attr("transform", "rotate(-90)")
                 .attr("x", -160)
                 .attr("y", -44)
                 .style("font-size", 20)
                 .text("Time in Minutes");
            
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
                 .attr("r", 7.5)
                 .attr("fill", (d) => { return dopingColour(d.Doping); })
                 .on("mouseover", showToolTip)
                 .on("mouseout", hideToolTip);

                             
             // Add legend for interpreting the chart
             var legend =  svg.append("g").attr("id", "legend");
             var isDoped = legend.append("g")
             .attr("transform", "translate(" + (width - 200) + "," + (height - 100) + ")")
             .append("text") 
               .attr("x", 10)
               .attr("y", 5)
               .attr("fill", "orange")
               .text("??? ")
               .append("tspan")
               .attr("fill", "black")
               .text("Doping allegations");
        
            var isNotDoped = legend.append("g")
             .attr("transform", "translate(" + (width - 200) + "," + (height - 80) + ")")
             .append("text")
               .attr("x", 10)
               .attr("y", 5)
               .attr("fill", "lightgreen")
               .text("??? ")
               .append("tspan")
               .attr("fill", "black")
               .text("No doping allegations");    
    });
}

var draw = () => {
    populateScatterGraph("https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json");
}

draw.call();