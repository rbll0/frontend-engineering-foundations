import { useEffect, useState } from "react"
import { useDebounce } from "react-use";

import Search from "./components/Search"
import Spinner from "./components/Spinner";
import MovieCard from "./components/MovieCard";
import { getTrendingMovies, updateSearchCount } from "./appwrite";

const API_BASE_URL = "https://api.themoviedb.org/3"
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
}

const App = () => {
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  const [movieList, setMovieList] = useState([])
  const [errorMessage, setErrorMessage] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  const [trendingMovies, setTrendingMovies] = useState([]);

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm])

  const fetchMovies = async (query = '') => {

    setIsLoading(true)
    setErrorMessage("")

    try {

      // await new Promise(resolve => setTimeout(resolve, 2000)) // Simula um atraso de 2 segundos para testar o spinner

      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}&language=pt-BR&region=BR`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc&language=pt-BR&region=BR`;

      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.Response === "False") {
        setErrorMessage(data.Error || "Nenhum filme encontrado.")
        setMovieList([])
        return;
      }

      setMovieList(data.results || [])

      if (query && data.results.length > 0) {
        await updateSearchCount(query, data.results[0]);
      }

    } catch (error) {
      console.error("Error fetching movies:", error)
      setErrorMessage("Ocorreu um erro ao buscar os filmes. Por favor, tente novamente mais tarde.")
    } finally {
      setIsLoading(false)
    }
  }

  const loadTrandingMovies = async () => {
    try {
      const movies = await getTrendingMovies();
      setTrendingMovies(movies);
    } catch (error) {
      console.error("Error fetching trending movies:", error)
    }
  }

  useEffect(() => {
    fetchMovies(debouncedSearchTerm)
  }, [debouncedSearchTerm])

  useEffect(() => {
    loadTrandingMovies();
  }, [])

  return (
    <main>

      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img src="hero.png" alt="Hero Banner" />
          <h1>Encontre <span className="text-gradient">Filmes</span> que você vai adorar sem complicações.</h1>

          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        {trendingMovies.length > 0 && (
          <section className="trending">
            <h2>Em alta</h2>

            <ul>
              {trendingMovies.map((movie, index) => (
                <li key={movie.$id}>
                  <p>{index + 1}</p>
                  <img src={movie.poster_url} alt={movie.title} />
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="all-movies">
          <h2>Todos os Filmes</h2>

          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
        </section>
      </div>



    </main>
  )
}

export default App
