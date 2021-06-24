import React from 'react'
import { Bottom } from '../Bottom.js'
import './signbody.css'
import { SignCard } from './SignCard.js'

export const SignBody = () => {
    return (
        <div>
            <div className="container">
                <div className="row">
                    <SignCard />
                </div>
            </div>
            <div className="center">
                <Bottom />
            </div>
        </div>
    )
}
