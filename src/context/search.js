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
    isLoading: false,
}

const filterEpisodes = (filters, episodes) => {
    return []
}

const sortMovies = (filteredResult, sortBy) => {
    switch (sortBy) {
        case 'time':
            return filteredResult.sort((first, second) => {
                const firstTime = new Date(first.airtime);
                const secondTime = new Date(second.airtime);
                return firstTime> secondTime ? -1 : 1;
            })

        case 'date':
            return filteredResult.sort((first, second) => {
                const firstDate = new Date(first.airstamp);
                const secondDate = new Date(second.airstamp);
                return firstDate> secondDate ? -1 : 1;
            })
        case 'duration':
            return filteredResult.sort((first, second) => {
                const firstDate = parseFloat(first.runtime);
                const secondDate = parseFloat(second.runtime);
                return firstDate> secondDate ? -1 : 1;
            })
        case 'Ascending':
            return filteredResult.sort((first, second) => {
				return first.name > second.name ? 1 : -1;
			})
        case 'Descending':
            return filteredResult.sort((first, second) => {
				return first.name < second.name ? 1 : -1;
			})
        case 'epiAsc':

            break;
        case 'epiDsc':

            break;   
        default:
            break;
    }
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


function searchReducer(state, action){
    switch (action.type) {
        case constants.search:
            return {
                ...state,
                currentSearchTerm: action.currentSearchTerm,
                isLoading: true,
                
            }
        case constants.updateResult:
            const { _embedded: { episodes } } = action.searchResult;
            return {
                ...state,
                searchResult: action.searchResult,
                episodes,
                filteredResult: episodes,
                isLoading: false,
                
            }
        case constants.updateFilter:
            const filters = [...state.filters, action.filter];
            return {
                ...state,
                filters,
                filteredResult: filterEpisodes(filters, state.episodes)
            }
        case constants.removeFilter:
            //filter state.filters and remove only the name matching action.filter
            const reducedFilters = state.filters.filter((each) => each !== action.filter)
            return {
                ...state,
                filteredResult: filterEpisodes(reducedFilters, state.episodes)
            }
        case constants.sort:
            const { sortBy } = action;
            return {
                ...state,
                sortBy,
                filteredResult: sortMovies(state.filteredResult, sortBy)
            }
        
        default:
            return state;
    }
}

export function SearchProvider({children}) {

    const [state, dispatch] = React.useReducer(searchReducer, initialState);


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
        try {
            const response = await api.get(`/singlesearch/shows/?q=${query}&embed=episodes`)
            const {data} = response;
            return dispatch(actions[constants.updateResult](data))
        } catch (error) {
            if(error.response) alert(error.response?.mesage)
            alert(error.toString())
        }
    }
    const loadSingleEpisode = async (id) => {
        try{
            const response = await api.get(`/episodes/${id}`)
            const {data} = response;
            return data;
        } catch(error) {

        }
    }

    const getOptions = async (query) => {
        try {
            console.log('called')
            const {data} = await api.get(`/search/shows?q=${query}`);
            console.log('data is', data)
            return data;
        } catch (error) {
            
        }
    }

    return (
        <SearchContext.Provider value={{
            state,
            searchMovie,
            filterMovies,
            sort,
            loadSingleEpisode,
            getOptions,
        }}>
            {children}
        </SearchContext.Provider>
    )
}

export default function useSearch(){
    const context = useContext(SearchContext);
    return context;
}
