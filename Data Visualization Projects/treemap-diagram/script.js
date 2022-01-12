async function start() {
  const jsonURL = await fetch('https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json');
  const jsonData = await jsonURL.json();

  const width = 960;
  const height = 600;
  
  const colours = d3.scaleOrdinal(d3.schemeCategory10);
  
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
  
  const cell = svg.selectAll('g')
    .data(root.leaves())
    .enter().append('g')
    .attr('transform', d => `translate(${d.x0}, ${d.y0})`);
  
  const tile = cell.append('rect')
    .attr('class', 'tile')
    .attr('data-name', d => d.data.name)
    .attr('data-category', d => d.data.category)
    .attr('data-value', d => d.data.value)
    .attr('width', d => d.x1 - d.x0)
    .attr('height', d => d.y1 - d.y0)
    .attr('fill', d => colours(d.data.category))

  cell.append('text')
    .selectAll('tspan')
    .data(d => d.data.name.split(/(?=[A-Z][^A-Z])/g))
    .enter().append('tspan')
    .attr('style', 'font-size: 10px')
    .attr('x', 1)
    .attr('y', (d, i) => 10 + i * 9)
    .text(d => d)
}

start();