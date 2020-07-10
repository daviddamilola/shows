import React from 'react'
import {ReactComponent as NewSearch} from '../img/newSearch.svg';
import '../css/prompt.css';

function Prompt() {
    return (
        <div className='col col__center col-12 prompt'>
            <h4 className="text__center mb-1">
                Enter your favourite tv show in the search bar to search for tv shows.
            </h4>
            <NewSearch />
        </div>
    )
}

export default Prompt
