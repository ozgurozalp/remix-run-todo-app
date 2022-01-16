import Movies from '~/type/MovieType';

type PropsType = {
	movies: Movies[];
	removeMovie: Function;
	changeStatus: Function;
	todosRef: any;
};
export default function MovieList({ movies, removeMovie, changeStatus, todosRef }: PropsType) {
	const handleClick = (id: number) => {
		removeMovie(id);
	};
	const changeWatchStatus = (id: number) => {
		changeStatus(id);
	};

	return (
		<ul className="todos" ref={todosRef}>
			{movies.map(({ id, isWatched, movieName }: Movies) => (
				<li key={id}>
					<input
						id={id.toString()}
						type="checkbox"
						onChange={() => changeWatchStatus(id)}
						checked={isWatched}
					/>
					<label htmlFor={id.toString()}>
						<span className="check" />
						{movieName}
					</label>
					<i onClick={() => handleClick(id)} className="far fa-trash-alt delete" />
				</li>
			))}
		</ul>
	);
}
