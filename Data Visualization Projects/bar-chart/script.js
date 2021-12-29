
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

}