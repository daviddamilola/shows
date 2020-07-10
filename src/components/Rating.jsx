import React from 'react'
import {ReactComponent as Star} from '../img/star.svg'

function Rating({rating}) {
    return (
        <div>
            <div className='row row__center'><Star/>
            <p className='mr-2 text-sm'>Rating: {rating.average}</p>
            </div>
        </div>
    )
}

export default Rating
