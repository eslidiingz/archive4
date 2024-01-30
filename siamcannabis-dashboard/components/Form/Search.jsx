const Search = ({ name = "", onChangeFilter, placeholder }) => {
	return (
		<>
			<div className="relative search">
				<input
					name={name}
					className="form-control search input-search-set"
					onChange={(e) => onChangeFilter(e.target.value.trim(), name)}
					placeholder={placeholder}
				/>
				<i className="fas fa-search icon-search"></i>
			</div>
		</>
	);
};

export default Search;
