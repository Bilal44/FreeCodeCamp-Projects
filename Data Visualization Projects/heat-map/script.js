// Chart area
var height = 500, width = 1000,
    margin = {
      left: 430, right: 20, top: 20, bottom: 70
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
var tooltip = d3.select('#tooltip');
var xScale = d3.time.scale().range([-6,width]);
var yScale = d3.scale.ordinal().domain(months).rangeBands([0,height]);
var colourScale = d3.scale.quantize().range(colour);

// Fetch data from remote JSON file
d3.json(url, function(data){
  data = data.monthlyVariance;
  
  // Extract and map JSON data
  data.map(function(d){
    d.month = months[d.month-1];
    d.year = d3.time.format("%Y").parse(d.year.toString());
  })
  
  // Heat map scaling configurations
  xScale.domain(d3.extent(data,function(data){
    return data.year;
  }));
  
  colourScale.domain(d3.extent(data,function(d){
    return d.variance;
  }));
  
  var barWidth = width / (data.length / 12)
  var barHeight = height / 12;
  
  var xAxis = d3.svg.axis().scale(xScale).orient("bottom");
  var yAxis = d3.svg.axis().scale(yScale).orient("left").ticks(12);
  
  // Add a g element and append pre-configured axes to plot a heat map from extracted JSON data
  group.append('g').attr({
    class: "xAxis",
    id: "x-axis",
    transform: "translate(0," + (height) + ")"
  }).call(xAxis);
  group.append('g').attr({
    class: "yAxis",
    id: "y-axis",
    transform: "translate(0,0)",
  }).call(yAxis);
  group.selectAll('g').data(data).enter().append('g').attr({
    transform: function(data){
      return "translate(" + xScale(data.year) + "," + yScale(data.month) +  ")";
    }
    }).append('rect').attr({
    class: "cell",
    "data-month": (d) => months.indexOf(d.month),
    "data-year": (d) => d.year.getFullYear(),
    "data-temp": (d) => d.variance,
    width: barWidth,
    height: yScale.rangeBand()
  }).style({
    fill: function(data){
     return colourScale(data.variance);
    }
  }).on("mouseover",function(d){
    tooltip.transition().duration(10)
        .attr("data-year", d.year.getFullYear())
        .style("opacity",0.8).style({
            left: d3.event.pageX + "px",
            top: d3.event.pageY + "px"
        });
    tooltip.html(d.month + ", " + d.year.getFullYear()+ "<br/>" + (8.66 + d.variance).toFixed(2) + "°C<br/>" + d.variance.toFixed(2) + "°C");
  }).on("mouseout",function(d){
    tooltip.transition().duration(100).style("opacity",0);
  });

//   // Add a legend for the color values.
//   const legend = d3.select("#legend")
//   .data(data.concat(colourScale(data.variance)), data.year);

// const legendEntries = legend.enter().append("g")
//       .attr("id", "legend");

//   legendEntries.append("rect")
//     .attr("x", (d,i)  => 400 * i)
//     .attr("y", 300)
//     .attr("width", 400)
//     .attr("height", 5)
//     .style("fill", (d, i) => colour[i]);

//   legendEntries.append("text")
//     .attr("class", "mono")
//     .text((d) => "≥ " + Math.round(d.variance+8.66))
//     .attr("x", (d, i) => 100 * i)
//     .attr("y", 300 + 4);
 });