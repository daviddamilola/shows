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
            <label className='col-3 text-sm' htmlFor="sort_values">Sort By:</label>
            <select name="sort_values" onChange={handleSort} id="sort_values" className='col-9 py2 rounded outlined'>
                <option value="time">Time</option>
                <option value="date">Date</option>
                <option value="duration">Duration</option>
                <option value="Ascending">Ascending Alphabets</option>
                <option value="Descending">Descending Alphabets</option>
            </select>
        </div>
    )
}

export default Sort
