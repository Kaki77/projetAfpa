import {Link} from 'react-router-dom'

function Goto(props) {
  return (
    <Link className='block text-xs text-blue-600 underline' to={props.href ? props.href : '#'}>{props.children}</Link>
  )
}

export default Goto