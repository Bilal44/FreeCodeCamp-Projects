async function start() {
  const jsonURL = await fetch('https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json');
  const jsonData = await jsonURL.json();

  const width = 960;
  const height = 600;
  
  const colour = d3.scaleOrdinal(d3.schemeCategory10);
  
  const svg = d3.select('svg')
    .attr('width', width)
    .attr('height', height)
    .style('margin-left', 425);
  
  const treemap = d3.treemap()
    .size([width, height])
    .padding(0.5)

  const root = d3.hierarchy(jsonData)
    .sum(d => d.value)
  
  treemap(root);
}

start();