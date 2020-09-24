import React, { useState } from 'react';

function Search() {

    const [filter, setFilter] = useState(new Set());
    const [submit, setSubmit] = useState('')

    const changeHandler = e => {
        setFilter(e.target.value) //value of user input
        // console.log(search)//just to see results
      }
    
      const submitSearch = e => {
        e.preventDefault();
        setSubmit(filter);
        setFilter('')//refreshes search once submitted
      }

    return (
        <div>
            {/* search */}
            <form onSubmit={submitSearch} className="search-form">
                <input
                    className="search-bar"
                    type="text"
                    value={filter}
                    placeholder="Search your HowTos"
                    //anytime input changes, this will run
                    onChange={changeHandler}
                />
                <button className="search-btn">Search</button>
            </form>
        </div>
    )
}

export default Search;