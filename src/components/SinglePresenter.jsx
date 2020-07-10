import React from 'react';
import SingleInfo from './SingleInfo';


function SinglePresenter({detail}) {
    const { summary, image } = detail
    const paragraphs = summary?.split('<p>')?.splice(1)?.map(each => each.replace('</p>', ""))
    return (
        <>
                        <div className="col-5">
                            <img src={image?.original} className='col-12 rounded flush-left single-image' alt="" sizes="" srcSet=""/>
                        </div>
                        <div className="col-6">
                            {paragraphs?<SingleInfo paragraphs={paragraphs} />:'no summary provided'}
                        </div>
                        </>
    )
}

export default SinglePresenter
