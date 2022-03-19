function Button(props) {
    return (
        <button className={"text-xl px-5 py-1 bg-teal-400 text-white rounded hover:bg-teal-600 transition"+(props.className ? ' '+props.className : '')} type={props.type ? props.type : 'button'} onClick={props.onClick}>{props.children}</button>
    )
}
export default Button