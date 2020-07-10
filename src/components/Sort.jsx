import React from 'react';
import useSearch from '../context/search';

function Sort() {

    const { sort } = useSearch();

    const handleSort = ({target: {value}}) => {
        console.log(value)
        sort(value)
    }

    return (
        <div className='row row__center ml-1'>
            <label className='col-3' htmlFor="sort_values">Sort By:</label>
            <select name="sort_values" onChange={handleSort} id="sort_values" className='col-9 py2 rounded outlined'>
                <option value="time">Time</option>
                <option value="date">Date</option>
                <option value="duration">Duration</option>
                <option value="air date">Air Date</option>
                <option value="season">Season</option>
                <option value="Ascending">Ascending Alphabets</option>
                <option value="Descending">Descending Alphabets</option>
                <option value="epiAsc">Ascending Episodes</option>
                <option value="epiDsc">Descending Episodes</option>
            </select>
        </div>
    )
}

export default Sort
