import React from 'react'
import './homebody.css'
import { Bottom } from '../Bottom.js'
import { TextCard } from './TextCard.js'
import { PicCard } from './PicCard.js'

const HomeBody = () => {
    return (
        <div>
            <div className="container">
                <div className="row">
                    <TextCard/>
                    <PicCard/>
                </div>
            </div>
            <div className="center">
                <Bottom />
            </div>
        </div>
    )
}
export default HomeBody;