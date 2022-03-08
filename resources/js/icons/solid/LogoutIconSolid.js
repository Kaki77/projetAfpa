import {LogoutIcon} from '@heroicons/react/solid'

function LogoutIconSolid(props) {
  return (
    <LogoutIcon className="absolute h-full w-full top-0 bottom-0" onClick={props.logout}/>
  )
}

export default LogoutIconSolid