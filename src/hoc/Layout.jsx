import React from 'react'
import Nav from '../components/Nav'

function Layout({children}) {
    return (
        <>
            <Nav />
            {children}
        </>
    )
}

export default Layout
