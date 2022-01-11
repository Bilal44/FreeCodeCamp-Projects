async function start() {
  const eduResp = await fetch('https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json');
  const educations = await eduResp.json();

  const countiesResp = await fetch('https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json');
  const counties = await countiesResp.json();

  const tooltip = document.getElementById('tooltip');
  
  const width = 960;
  const height = 600;

  const path = d3.geoPath();
  
  const data = topojson.feature(counties, counties.objects.counties).features;
  
  const minEdu = d3.min(educations, edu => edu.bachelorsOrHigher);
  const maxEdu = d3.max(educations, edu => edu.bachelorsOrHigher);
  const step = (maxEdu - minEdu) / 8;
  
  const coloursScale = d3.scaleThreshold()
    .domain(d3.range(minEdu, maxEdu, step))
    .range(d3.schemeBlues[9]);
  
  const colours = [];
  
  for(let i=minEdu; i<=maxEdu; i+=step) {
    colours.push(i);
  }
  
  const svg = d3.select('svg')
    .attr('width', width)
    .attr('height', height);
  
  svg.append('g')
    .selectAll('path')
    .data(data)
    .enter()
    .append('path')
    .attr('class', 'county')
    .attr('fill', d => coloursScale(educations.find(edu => edu.fips === d.id).bachelorsOrHigher))
    .attr('d', path)
    .attr('data-fips', d => d.id)
    .attr('data-education', d => educations.find(edu => edu.fips === d.id).bachelorsOrHigher)
    .on('mouseover', (d, i) => {
      const { coordinates } = d.geometry;
      const [x, y] = coordinates[0][0];

      const education = educations.find(edu => edu.fips === d.id);

      tooltip.style.display='block';
      tooltip.style.left = x - 50 + 'px';
      tooltip.style.top = y - 50 + 'px';
      tooltip.setAttribute('data-education', education.bachelorsOrHigher);

      tooltip.innerHTML = `
        <p>${education.area_name} - ${education.state}</p>
        <p>${education.bachelorsOrHigher}%</p>
      `;
  }).on('mouseout', () => {
    tooltip.style.display='none';
  });

  // Graph legend
  const legendWidth = 200;
  const legendHeight = 30;

  const legendRectWidth = legendWidth / colours.length;
  const legend = d3.select('body')
    .append('svg')
    .attr('id', 'legend')
    .attr('class', 'legend')
    .attr('width', legendWidth)
    .attr('height', legendHeight)
   
  legend.selectAll('rect')
    .data(colours)
    .enter()
    .append('rect')
    .attr('x', (_, i) => i * legendRectWidth)
    .attr('y', 0)
    .attr('width', legendRectWidth)
    .attr('height', legendHeight)
    .attr('fill', c => coloursScale(c))
}

start();