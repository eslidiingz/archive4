import React from "react";
import Select from "react-select";

const FilterSearch = ({ filterOptions = [], onSelectFilter, name = "select" }) => {
	return (
		<>
			<div className="filter_layout">
				<Select
					isMulti
					options={filterOptions}
					name={name}
					className="basic-multi-selec form-controlt "
					classNamePrefix="select"
					onChange={(e) => onSelectFilter(e, name)}
				/>
			</div>
		</>
	);
};

export default FilterSearch;
