import {Link as L} from 'react-router-dom'

function Link(props) {
  return (
    <L className='block text-xs text-blue-600 dark:text-cyan-400 underline' to={props.href ? props.href : '#'}>{props.children}</L>
  )
}

export default Link