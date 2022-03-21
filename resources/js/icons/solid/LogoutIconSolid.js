import {LogoutIcon} from '@heroicons/react/solid'

function LogoutIconSolid(props) {
  return (
    <LogoutIcon className="h-4/6 w-4/6" onClick={props.logout}/>
  )
}

export default LogoutIconSolid