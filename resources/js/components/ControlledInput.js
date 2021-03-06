function ControlledInput(props){

    return(
        <div className='my-5'>
            {props.label ?
            <>
                <label htmlFor={props.title}>
                    {props.title}
                </label>
                <br/>
            </>
            : ''
            }
            <input 
                className={'my-3 border-2 border-solid px-2 py-1 rounded-full focus:outline-none focus:ring transition text-black ' + (typeof(props.errors[0]) == 'undefined' ? 'border-blue-500' : 'border-red-500')}
                type={props.type}
                name={props.title}
                placeholder={props.title}
                value={props.value}
                onChange={e=>props.setFunction(e.target.value)}
            />
            {props.errors.map((error,index)=>
                <p key={index} className='text-sm text-red-400 italic'>
                    {error}
                </p>
            )}
        </div>
    )
}

export default ControlledInput