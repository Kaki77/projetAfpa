function ControlledTextArea(props) {
    return (
        <>
        <textarea
            className={'my-3 border-2 border-solid px-2 py-1 rounded focus:outline-none focus:ring transition ' + (typeof(props.errors[0]) == 'undefined' ? 'border-blue-500' : 'border-red-500') + (props.className ? ` ${props.className}` : '')}
            name={props.title}
            placeholder={props.placeholder}
            value={props.value}
            onChange={e=>props.setFunction(e.target.value)}
            rows={props.rows}
            cols={props.cols}
        >
        </textarea>
        {props.errors.map((element,index)=>
            <p key={index} className='text-sm text-red-400 italic'>
                {element}
            </p>
            )
        }
        </>
    )
}

export default ControlledTextArea
