import {useState} from 'react'
import { Navigate, useNavigate,useParams } from 'react-router-dom'
import apiClient from '../axios'
import ControlledInput from './ControlledInput'

function PasswordResetForm() {

    const [mail, setMail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errorMail, setErrorMail] = useState([])
    const [errorPass, setErrorPass] = useState([])
    const [errorConfirmPass, setErrorConfirmPass] = useState([])
    const navigate = useNavigate()
    const {token} = useParams()

    useEffect(() => {
        props.sessionCheck()
        return () => {
            //
        }
    }, [])

    function resetPassword() {
        props.loading(true)
        apiClient.post('/password-reset',{
            token : token,
            password : password,
            confirm_password : confirmPassword,
        })
        .then(response=>{
            console.log(response.data)
            navigate('/',{replace : true})
        })
        .catch(error=>{
            error.response.data.message.email ? setErrorMail(error.response.data.message.email) : setErrorMail([])
            error.response.data.message.password ? setErrorPass(error.response.data.message.password) : setErrorPass([])
            error.response.data.message.confirm_password ? setErrorConfirmPass(error.response.data.message.confirm_password) : setErrorConfirmPass([])
        })
        .finally(()=>{
            props.loading(false)
        })
    }

    return (
        <div>
            <h1 className='text-4xl mb-5'>Reset Password</h1>
            <ControlledInput label={true} title="Mail" type="text" value={mail} setFunction={setMail} errors={errorMail}/>
            <ControlledInput label={true} title="Password" type="password" value={password} setFunction={setPassword} errors={errorPass}/>
            <ControlledInput label={true} title="Confirm Password" type="password" value={confirmPassword} setFunction={setConfirmPassword} errors={errorConfirmPass}/>
            <button className="text-xl px-5 mb-5 py-1 bg-teal-400 text-white rounded hover:bg-teal-600 transition" onClick={resetPassword}>Reset Password</button>
        </div>
    )
}
export default PasswordResetForm