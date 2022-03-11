import LogoutIconSolid from "../icons/solid/LogoutIconSolid"
import FriendsSolid from "../icons/solid/FriendsIconSolid"
import UserCircleSolid from "../icons/solid/UserCircleIconSolid"
import HomeIconSolid from "../icons/solid/HomeIconSolid"
import CogIconSolid from "../icons/solid/CogIconSolid"
import {Link as LinkRouter} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import apiClient from "../axios"

function Navbar(props) {

  const navigate=useNavigate()
  function logout(){
    apiClient.post('api/logout')
    .then(response=>{
        props.setUserID('')
        console.log(response.data.data)
        navigate('/',{replace:true})
    })
  }

  return (
    <div className="flex flex-row h-[70px] bg-teal-500 sticky top-0 mb-5 z-10">
        <button className="relative h-full w-full bg-red-500"><LinkRouter to="/app"><HomeIconSolid/></LinkRouter></button>
        <button className="relative h-full w-full bg-blue-500"><LinkRouter to="/app/friends"><FriendsSolid/></LinkRouter></button>
        <button className="relative h-full w-full bg-green-500"><LinkRouter to={"/app/profile/"+props.userID}><UserCircleSolid/></LinkRouter></button>
        <button className="relative h-full w-full bg-white"><LinkRouter to="#"><CogIconSolid/></LinkRouter></button>
        <button className="relative h-full w-full bg-yellow-500"><LogoutIconSolid logout={logout}/></button>
    </div>
  )
}

export default Navbar