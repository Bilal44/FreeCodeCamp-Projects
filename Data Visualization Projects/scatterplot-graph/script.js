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
}

var draw = () => {
    populateScatterGraph("https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json");
}

draw.call();