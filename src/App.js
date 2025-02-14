import React, { useState, useEffect } from "react";
import { Container } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import MovieList from "./components/MovieList";
import Pagination from "./components/Pagination";
import NavBar from "./components/NavBar";
import { fetchMovies, selectAllMovies } from "./Redux/moviesSlice";

const App = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage, setMoviesPerPage] = useState(8);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const dispatch = useDispatch();
  const movies = useSelector(selectAllMovies);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);



  // Constants used to divide movies into pages
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;

  // Filter movies by selected categories
  const filteredMovies = movies?.filter((movie) =>
    selectedCategories?.length === 0
      ? true
      : selectedCategories?.includes(movie.category)
  );

  // Slice the filtered movies by current page
  const currentMovies = filteredMovies?.slice(
    indexOfFirstMovie,
    indexOfLastMovie
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <NavBar
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        movies={movies}
      />
      <Container sx={{ py: 4 }}>
        <MovieList
          movies={currentMovies}
        />
        <Pagination
          moviesPerPage={moviesPerPage}
          totalMovies={filteredMovies?.length}
          paginate={paginate}
          currentPage={currentPage}
          setMoviesPerPage={setMoviesPerPage}
        />
      </Container>
    </>
  );
};

export default App;
