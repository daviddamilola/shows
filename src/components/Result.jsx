import React from 'react';
import Sort from './Sort';
import Filters from './Filters';
import useSearch from '../context/search';
import Spinner from './Spinner';
import Rating from './Rating';
import Genre from './GenreCard';
import LastCard from './LastCard';
import Card from './Card';
import dompurify from 'dompurify';
import Prompt from './Prompt';


function Result() {
    const { state: {searchResult,filteredResult, isLoading} } = useSearch();
    
    const sanitizer = dompurify.sanitize;

    const [result, setResult] = React.useState(null);
    const [episodes, setEpisodes] = React.useState(null)

    React.useEffect(() => {
        if(searchResult.rating){
            setResult(searchResult);
            setEpisodes(filteredResult)
        }
    }, [searchResult, filteredResult])


    return (
        <div className='container row row__spread mt-2 '>
            <aside className="col-3 outlined rounded px1 side-box">
                {isLoading && <Spinner />}
                {!isLoading && result && 
                <div className='mt-2'>
                    <Rating rating= {result?.rating} />
                    <ul className="row genre mb-1">
                        {result?.genres.map((eachGenre, i) => {
                            return (
                                <Genre key={i} name={eachGenre} />
                            )
                        })}
                    </ul>
                    <h5>Previous Episode</h5>
                    <LastCard prevEpisode={result._links.previousepisode.href} episodes={episodes}/>
                </div>}
                
                {/* <Filters /> */}
            </aside>
            <div className="col-8 outlined rounded mb-4">
                {!result && !isLoading && <Prompt />}
                {isLoading && <Spinner />}
                    {!isLoading && result && <div>
                    <div className="col-12 main-box rounded flush-bottom" style={{
                        backgroundImage:`url(${result.image.original})`,
                        }}>
                            <div className="px2 py2 main-text white text-sm">
                                <h2 className='text__left white'>{result.name}</h2>
                                <span className='summary wrap text-light' dangerouslySetInnerHTML={{__html: sanitizer(result.summary)}} />
                                <p className='text-xs'>premiered: <span className='bg-green px1 py1 rounded'>{result.premiered}</span></p>
                            </div>
                    </div>

                    <div className="px2 my2 mt-1 ">
                        <div className="row row__spread mb-1">
                        <div className="col-3"><h3>Episodes</h3></div>
                        <div className="col-4"><Sort /></div>
                        </div>
                        <div className="row row__spread episodes-container">
                           {episodes.map((each, i) => <Card detail={each} key={i}/>) }
                        </div>
                    </div>
                    </div>
                    }
                </div>
            
        </div>
    )
}

export default Result
