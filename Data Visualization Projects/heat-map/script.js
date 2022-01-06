// Chart area
var height = 500, width = 1000,
    margin = {
      left: 120, right: 20, top: 20, bottom: 70
    },
    url = "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/global-temperature.json",
    months = ["January","February","March","April","May","June","July","August","September","October","November","December"],
    colour = ["#ef5350","#EC407A","#AB47BC","#7E57C2","#5C6BC0","#42A5F5","#26C6DA","#26A69A","#D4E157","#FFEE58","#FFA726"];

// Heat map canvas
var canvas = d3.select('svg').attr({
  height: height + margin.top + margin.bottom,
  width: width + margin.left + margin.right
});

var group = canvas.append('g').attr({
  transform: "translate(" + margin.left + "," + margin.top + ")"
});

// Define X and Y axis scaling
var tooltip = d3.select('.tooltip');
var xScale = d3.time.scale().range([0,width]);
var yScale = d3.scale.ordinal().domain(months).rangeBands([0,height]);
var colourScale = d3.scale.quantize().range(colour);