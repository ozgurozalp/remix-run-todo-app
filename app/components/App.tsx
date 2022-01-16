import { useState, useEffect, useRef } from 'react';

import AddMovieForm from '~/components/AddMovieForm';
import MovieList from '~/components/MovieList';
import CoverImage from '~/components/CoverImage';
import Movies from '~/type/MovieType';

const App = (): JSX.Element => {
	const [movies, setMovies] = useState<Movies[]>([]);
	const todosRef = useRef<HTMLElement>();

	const addMovie = (newMovie: Movies) => {
		setMovies(prevMovies => [...prevMovies, newMovie]);
		setTimeout(() => {
			todosRef?.current?.scrollTo(0, todosRef?.current?.scrollHeight);
		}, 0);
	};

	const removeMovie = (id: number) => {
		const copy = movies.filter(movie => movie.id !== id);
		setMovies(copy);
	};

	const changeStatus = (id: number) => {
		const copy = [...movies];
		const found = copy.find(movie => movie.id === id);
		if (found) {
			found.isWatched = !found.isWatched;
			setMovies(copy);
		}
	};

	useEffect(() => {
		const moviesFromStorage = localStorage.getItem('movies');
		if (moviesFromStorage) setMovies(JSON.parse(moviesFromStorage));
	}, []);

	useEffect(() => {
		localStorage.setItem('movies', JSON.stringify(movies));
	}, [movies]);

	return (
		<div className="todoList">
			<CoverImage />
			<div className="content">
				<AddMovieForm addMovie={addMovie} />
				<MovieList movies={movies} removeMovie={removeMovie} changeStatus={changeStatus} todosRef={todosRef} />
			</div>
		</div>
	);
};

export default App;
