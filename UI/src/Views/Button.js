import React from 'react'
import './button.css'

export const Button = (props) => {
    return (
        <button type="button" className="btn btn-default">{props.title}</button>
    )
}
