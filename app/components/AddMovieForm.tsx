import { SetStateAction, useState } from 'react';
import type Movies from '~/type/MovieType';

type PropsType = {
	addMovie: Function;
};

export default function AddMovieForm({ addMovie }: PropsType): JSX.Element {
	const [movieName, setMovieName] = useState<string>('');
	const handleClick = () => {
		if (movieName.length > 0) {
			const movieData: Movies = {
				movieName,
				id: new Date().getTime(),
				isWatched: false,
			};
			addMovie(movieData);
			setMovieName('');
		}
	};
	const handleKeyPress = (e: { key: string }) => {
		if (e.key === 'Enter') {
			handleClick();
		}
	};
	const changeMovieName = (e: { target: { value: SetStateAction<string> } }) => {
		setMovieName(e.target.value);
	};
	return (
		<form className="add" onSubmit={e => e.preventDefault()}>
			<input
				autoComplete={'off'}
				autoFocus
				type="text"
				name="add"
				value={movieName}
				onChange={changeMovieName}
				onKeyPress={handleKeyPress}
				placeholder="Yeni bir film ekle..."
			/>
			<div className="input-buttons" onClick={handleClick}>
				<i className="fas fa-plus add" />
			</div>
		</form>
	);
}
