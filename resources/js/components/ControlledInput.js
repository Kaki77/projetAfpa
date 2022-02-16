function ControlledInput(props){

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
                />
            </label>
            {props.errors.map((element,index)=>
                <p key={index} className='text-sm text-red-400 italic'>
                    {element}
                </p>
                )
            }
        </div>
    )
}

export default ControlledInput