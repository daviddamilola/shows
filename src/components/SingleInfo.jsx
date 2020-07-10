import React from 'react'

function SingleInfo({paragraphs}) {
    return (
        <div>
            <h3 className='mb-1'>Summary</h3>
            {paragraphs.map((each,i) => {
                return(<>
                <p>
                    {each}
                </p><br />
                </>)
            })}
        </div>
    )
}

export default SingleInfo;
