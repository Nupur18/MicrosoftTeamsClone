import React from 'react'
import { Bottom } from '../../Components/Bottom/Bottom'
import './signbody.css'
import { SignCard } from './SignCard.js'

export const SignBody = () => {
    return (
        <div>
            <div className="container">
                <div className="row align-items-center">
                    <div className="col"></div>
                    <SignCard/>
                    <div className="col"></div>
                </div>
            </div>
            <div className="center my-5">
                <Bottom />
            </div>
        </div>
    )
}
