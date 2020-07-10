import React from 'react'
import {ReactComponent as Empty} from '../img/empty.svg'
import '../css/prompt.css'

function EmptyResult() {
    return (
       <div className="col col__centerempty empty">
           <h5 className="text__center text-s-sm">
                Nothing Found Here, Search For Something Different
           </h5>
           <Empty />
       </div>
    )
}

export default EmptyResult
