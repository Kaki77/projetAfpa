import {UserCircleIcon} from '@heroicons/react/solid'

function UserCircleIconSolid(props) {
  return (
    <UserCircleIcon className={"h-4/6" + (props.className ? ' '+props.className : '')}/>
  )

}
export default UserCircleIconSolid