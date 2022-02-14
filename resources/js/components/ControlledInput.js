import React from 'react'

function ControlledInput(props){

    return(
        <div>
            <label htmlFor={props.title}>
                {props.title}
                <br/>
                <input 
                type={props.type}
                name={props.tile}
                placeholder={props.title}
                value={props.value}
                onChange={e=>props.setFunction(e.target.value)}
                />
            </label>
        </div>
    )
}

export default ControlledInput