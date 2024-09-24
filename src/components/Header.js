import React from 'react'

const Header = ({page}) =>{
    return(
        <div className='header'>
            <h1 className='title'>{page}</h1>
        </div>
    )
}

export default Header;