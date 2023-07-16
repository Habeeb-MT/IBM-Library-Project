import React from 'react'
import { Navbar } from '../Components/Navbar'
import { Box1 } from '../Components/Box1'
import "../css/style.scss"

export const BooksTable = () => {
    return (
        <div className='bookstable'>
            <Navbar />
            <Box1 />
        </div>
    )
}
