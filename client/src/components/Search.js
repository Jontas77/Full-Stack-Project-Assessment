import React from 'react'

const Search = ({ search, handleSearch}) => {
    return (
        <div className="search-video text-center">
        <label>
          Search
          <input
            type="text"
            className="search"
            name="search"
            value={search}
            onChange={handleSearch}
          />
        </label>
      </div>
    );
};

export default Search;

