const API_KEY = "3b45f9cc2e4aedf5c5acc1163b12b24c";
const BASE_PATH = "https://api.themoviedb.org/3";

export function getMovies() {
  return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY} `).then(
    (response) => response.json()
  );
}
