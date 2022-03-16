import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import ControlledInput from './ControlledInput'
import apiClient from '../axios'

function ResetPasswordMail() {
    
    const navigate = useNavigate()
    const [mail, setMail] = useState('')
    const [errorMail, setErrorMail] = useState([])
    
    useEffect(() => {
        props.sessionCheck()
        return () => {
            //
        }
    }, [])

    function sendResetPasswordMail() {
        props.loading(true)
        apiClient.post('/password-reset',{
            email:mail,
        })
        .then(response=>{
            console.log(response.data)
            navigate('/',{replace : true})
        })
        .finally(()=>{
            props.loading(false)
        })
    }

    return (
        <div className="text-center">
            <h1 className='text-4xl mb-5'>Reset Password</h1>
            <ControlledInput label={true} title="Mail" type="mail" value={mail} setFunction={setMail} errors={errorMail}/>
            <button className="text-xl mb-5 py-1 px-5 bg-teal-400 text-white rounded hover:bg-teal-600 transition" onClick={sendResetPasswordMail}>Reset Password</button>
        </div>
    )
}
export default ResetPasswordMail