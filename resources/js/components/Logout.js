import { useNavigate } from "react-router-dom"
import apiClient from "../axios"

function Logout(props) {

    const navigate=useNavigate()

    function logout(){
        apiClient.post('api/logout')
        .then(response=>{
            props.logout()
            navigate('/')
        })
    }

    return (
        <button onClick={logout}>Logout</button>
    )
}

export default Logout