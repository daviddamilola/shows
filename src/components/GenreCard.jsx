import React from 'react'

function GenreCard({name}) {
    return (
        <li className=' outlined px1 py1 genre-item'>
            <p className='text-sm'>{name}</p>
        </li>
    )
}

export default GenreCard
