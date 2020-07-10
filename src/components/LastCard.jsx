import React from 'react'
import Card from './Card'

function LastCard({prevEpisode, episodes}) {
    
    const lastEpisodeId = prevEpisode.slice(prevEpisode.lastIndexOf('/') + 1)
    
    const match = episodes.find(each => each.id == lastEpisodeId)
    
    return (
        match && <Card detail={match} styles={{width: '90%'}}/>
    )
}

export default LastCard
