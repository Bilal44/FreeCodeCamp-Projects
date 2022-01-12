async function start() {
  const jsonURL = await fetch('https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json');
  const jsonData = await jsonURL.json();  
}

start();