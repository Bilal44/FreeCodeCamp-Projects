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
}

start();