const input = document.querySelector("input");
const list_box = document.querySelector(".list-box");
const API_URL = "https://yts.mx/api/v2/list_movies.json?sort_by=year&limit=50";

input.addEventListener("keyup", async (e) => {
  if (e.key === "Enter") {
    const searchTerm = input.value.toLowerCase();
    const movies = await getMovies();
    const searchResults = filterMoviesByTitle(movies, searchTerm);
    renderSearchResults(searchResults);
  }
});

// returns promise of movie list
function getMovies() {
  return fetch(API_URL)
    .then(response => response.json())
    .then(result => result.data.movies)
    .catch((error) => {
      console.log({ error });
      // if api error return empty []
      return [];
    })
}

function filterMoviesByTitle(movies, searchTerm) {
  return movies.filter(movie => movie.title.toLowerCase().includes(searchTerm));
}

function renderSearchResults(movies = []) {
  list_box.innerHTML = "";
  if (movies.length === 0) {
    list_box.innerHTML += `<li><span><i>NO RESULTS FOUND!</i></span></li>`;
    return;
  }

  movies.forEach(movie => {
    list_box.innerHTML += `
      <li>
        <span>
          <img src='${movie.cover}'>
          <b><i>${movie.year}</i></b>
        </span>
        <span>${movie.title}</span>
      </li>`;
  })
}
