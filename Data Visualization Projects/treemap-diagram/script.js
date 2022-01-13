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

  const tooltip = document.getElementById('tooltip');
  
  const tile = cell.append('rect')
    .attr('class', 'tile')
    .attr('data-name', d => d.data.name)
    .attr('data-category', d => d.data.category)
    .attr('data-value', d => d.data.value)
    .attr('width', d => d.x1 - d.x0)
    .attr('height', d => d.y1 - d.y0)
    .attr('fill', d => colours(d.data.category))
    .on('mousemove', (event, d) => {
      const { name, category, value } = d.data;
      tooltip.style.display= 'block';
      tooltip.style.left = (event.pageX + 20) + 'px';
      tooltip.style.top = (event.pageY) + 'px';
      tooltip.setAttribute('data-value', value);

      tooltip.innerHTML = `<p>${name}</p>
      <p><strong>Genre:</strong> ${category}</p>
      <p><strong>Sales:</strong> ${value}</p>`;})
      .on('mouseout', () => {
        tooltip.style.display= 'none';
    });

  cell.append('text')
    .selectAll('tspan')
    .data(d => d.data.name.split(/(?=[A-Z][^A-Z])/g))
    .enter().append('tspan')
    .attr('style', 'font-size: 10px')
    .attr('x', 1)
    .attr('y', (d, i) => 10 + i * 9)
    .text(d => d)

  const categories = root.leaves().map(n => n.data.category).filter((item, idx, arr) => arr.indexOf(item) === idx);

  // Insert treemap category legend
  const rectSize = 21;
  const legendWidth = 200;
  const legendHeight = (rectSize + 2) * categories.length;
  
  const legend = d3.select('body')
    .append('svg')
    .attr('id', 'legend')
    .attr('width', legendWidth)
    .attr('height', legendHeight)
    .style('margin-left', 417)
   
  legend.selectAll('rect')
    .data(categories)
    .enter()
    .append('rect')
    .attr('class', 'legend-item')
    .attr('fill', d => colours(d))
    .attr('x', rectSize / 2)
    .attr('y', (_, i) => i * (rectSize + 1) + 10)
    .attr('width', rectSize)
    .attr('height', rectSize)
   
   legend.append('g')
      .selectAll('text')
      .data(categories)
      .enter()
      .append('text')
      .attr('fill', 'black')
      .attr('x', rectSize * 2)
      .attr('y', (_, i) => i * (rectSize + 1) + 25)
      .text(d => d)
}

start();