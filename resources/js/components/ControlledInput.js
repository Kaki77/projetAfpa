import React from 'react'

function ControlledInput(props){

    function updateBorder(element){
        if(element.classList.contains('border-red-500'))
        {
            element.classList.remove('border-red-500')
            element.classList.add('border-blue-500')
        }
    }

    return(
        <div className='my-5'>
            <label htmlFor={props.title}>
                {props.title}
                <br/>
                <input 
                className={'my-3 border-2 border-solid px-2 py-1 rounded focus:outline-none focus:ring transition ' + (typeof(props.errors[0]) == 'undefined' ? 'border-blue-500' : 'border-red-500')}
                type={props.type}
                name={props.tile}
                placeholder={props.title}
                value={props.value}
                onChange={e=>props.setFunction(e.target.value)}
                onClick={event=>updateBorder(event.target)}
                />
            </label>
            {props.errors.map(e=>
                <p className='text-sm text-red-400 italic'>
                    {e}
                </p>
            )}
        </div>
    )
}

export default ControlledInput