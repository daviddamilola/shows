import React from 'react'
import { Link } from 'react-router-dom'

function Card({detail, styles}) {
 
    const { id,name,summary, image } = detail
    const paragraphs = summary?.split('<p>')?.splice(1)?.map(each => each.replace('</p>', ""))
    

   

    return (
        <div className='card outlined rounded mb-1' style={{...styles}}>
            <div className="card-title"></div>
            <img className='lastImage' src={image?.original} alt={name}/>
            <div className="card-body">
                <Link to={`/${id}`}>
                    <h5>{name}</h5>
                    <div className="row">
                    <p className='bold'>summary:</p>
                    <p className='truncate'>{paragraphs?paragraphs[0]: 'no summary provided'}</p>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Card
