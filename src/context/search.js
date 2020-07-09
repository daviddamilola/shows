import React, {createContext, useContext} from 'react';
import api from '../services/api';

const SearchContext = createContext()

export const constants = {
    search: 'SEARCH',
    updateFilter: 'UPDATE_FILTER',
    updateResult: 'UPDATE_RESULT',
    updateFilterResult: 'UPDATE_FILTERED_RESULT',
    removeFilter: 'REMOVE_FILTER',
    sort: 'SORT',
}

const initialState = {
    searchResult:{},
    currentSearchTerm: '',
    filters: [],
    sortBy: '',
    filteredResult: [],
    episodes: [],
}

const filterEpisodes = (filters, episodes) => {
    return []
}

const sortMovies = (filteredResult, sortBy) => {
    return []
}


const actions = {
    [constants.search]: (query) => ({
        type: constants.search,
        currentSearchTerm: query,
    }),
    [constants.updateResult]: (results) => ({
        type: constants.updateResult,
        searchResult: results
    }),
    [constants.updateFilter]: (filter) => ({
        type: constants.updateFilter,
        filters: filter,
    }),
    [constants.updateFilterResult]: (refinedResult) => ({
        type: constants.updateFilter,
        refinedResult,
    }),
    [constants.removeFilter]: (filter) => ({
        type: constants.removeFilter,
        filter
    }),
    [constants.sort]: (sortBy) => ({
        type: constants.sort,
        sortBy,
    })
}


const searchReducer = (state, action) => {
    switch (action.type) {
        case constants.search:
            return {
                currentSearchTerm: action.currentSearchTerm,
            }
        case constants.updateResult:
            const { _embedded: { episodes } } = action.searchResult;
            return {
                searchResult: action.searchResult,
                episodes,
            }
        case constants.updateFilter:
            const filters = [...state.filters, action.filter];
            return {
                filters,
                filteredResult: filterEpisodes(filters, state.episodes)
            }
        case constants.removeFilter:
            //filter state.filters and remove only the name matching action.filter
            const reducedFilters = state.filters.filter((each) => each !== action.filter)
            return {
                filteredResult: filterEpisodes(reducedFilters, state.episodes)
            }
        case constants.sort:
            const { sortBy } = action;
            return {
                sortBy,
                filteredResult: sortMovies(state.filteredResult, sortBy)
            }
        
        default:
            break;
    }
}

export function SearchProvider({children}) {

    const {state, dispatch} = React.useReducer(searchReducer, initialState);

    const searchMovie = (title) => {
        dispatch(actions[constants.search](title));
        loadSearch(title);
    }

    const filterMovies = (filter) => {
        return dispatch(actions[constants.updateFilter](filter))
    }

    const sort = (by) => {
        return dispatch(actions[constants.sort](by))
    }

    const loadSearch = async (query) => {
        const result = await api.get(`?q=${query}&embed=episodes`)
        return dispatch(actions[constants.updateResult](result))
    }

    return (
        <SearchContext.Provider value={{
            state,
            searchMovie,
            filterMovies,
            sort,
        }}>
            {children}
        </SearchContext.Provider>
    )
}

export default function useSearch(){
    const context = useContext(SearchContext);
    return context;
}
