/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import {useParams} from 'react-router-dom';
import useSearch from '../context/search';
import Layout from '../hoc/Layout';
import SinglePresenter from './SinglePresenter';
import Card from './Card';
import { getRandomInt } from '../utils';
import '../css/single.css';

function SingleEpisode() {
    const {id} = useParams();
    const { loadSingleEpisode, state: { episodes }} = useSearch();
    const [single, setSingle] = React.useState(null);
    const [more, setMore] = React.useState([])

    React.useEffect(() => {
        if(!episodes || episodes.length < 1){
            const  loadEpisode = async () => {
            try{
                const response = await loadSingleEpisode(id)
                setSingle(response);
            } catch(error){

            }
        }
            loadEpisode();
        }
        // eslint-disable-next-line eqeqeq
        setSingle(episodes.find(each => each.id == id))
        setMore(episodes.slice(0,getRandomInt(3,episodes.length )))
    }, [id, episodes])
    
    

    return (
        <Layout>
            <div className='container mt-1'>
                <div className="col-12 outlined  rounded">
                    <div className="row row__spread">
                        {
                        single && <SinglePresenter detail={single} />
                        }
                    </div>
                </div>
                <div className="col-12 outlined mt-2 rounded">
                    <h3 className="px2">More Episodes</h3>
                    <div className="row row__spread px2">
                            {more.map((episode, i) => <Card key={i} detail={episode}/>)}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default SingleEpisode
