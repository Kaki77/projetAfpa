function Link(props) {
  return (
    <a className='block text-xs text-blue-600 underline' href={props.href ? props.href : '#'}>{props.children}</a>
  )
}

export default Link