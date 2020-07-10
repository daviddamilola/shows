import React, { useState } from 'react';
import useSearch from '../context/search';
import { useLocation, useHistory } from 'react-router-dom';

function Nav() {

    const { pathname } = useLocation();
    const history = useHistory();

    const { state: { currentSearchTerm }, searchMovie, getOptions } = useSearch();

    const [state, setState] = useState({
        search: currentSearchTerm
    });

    const [options, setOptions] = React.useState([])

    const handleSearch = (e) => {
        e.preventDefault();
        if (!state.search) return; //if search field is empty dont bother running empty queries
        searchMovie(state.search);
        if (pathname !== '/') history.push('/')
    };

    const handleChange = (e) => {
        setState({ [e.target.name]: e.target.value })
        const loadOptions = async () => {
            const optArray = await getOptions(state.search)
            setOptions(optArray)
        }
        loadOptions()
       
    };

 

    return (
        <div className='container mt-1 row no-wrap row__spread'>
            <div className='col-5 col-s-3'> <h2 className='text-s-sm'>Shows</h2> </div>
            <form onSubmit={handleSearch} className="row search self-left col-6">
                <input className='col-8 col-s-6 py1 px1 rounded flush-left' value={state.search} onChange={handleChange} placeholder='search for you favourite tv shows' list="shows" name="search" id="search" />
                <datalist id="shows">
                    {options && options.map(({ show: { name } }, i) => <option key={i} value={name} />)}

                </datalist>
                <button type='submit' className='px1 bg-black white col-3 col-s-4 rounded flush-right'> Search </button>
            </form>
        </div>
    )
}

export default Nav
