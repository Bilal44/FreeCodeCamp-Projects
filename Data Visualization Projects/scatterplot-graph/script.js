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
}

var draw = () => {
    populateScatterGraph("https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json");
}

draw.call();