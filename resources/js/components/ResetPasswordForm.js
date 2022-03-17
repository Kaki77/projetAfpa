import {useState,useEffect} from 'react'
import {useNavigate,useParams} from 'react-router-dom'
import apiClient from '../axios'
import Button from './Button'
import ControlledInput from './ControlledInput'

function PasswordResetForm(props) {

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errorPass, setErrorPass] = useState([])
    const [errorConfirmPass, setErrorConfirmPass] = useState([])
    const navigate = useNavigate()
    const {token} = useParams()

    useEffect(() => {
        props.sessionCheck()
        tokenCheck(token)
        return () => {
            //
        }
    }, [])

    function tokenCheck(token) {
        apiClient.post('/tokenCheck',{
            token : token,
        })
        .catch(error=>{
            props.setFlash('Your password reset request is invalid or expired')
            navigate('/')
        })
    }

    function resetPassword() {
        props.loading(true)
        apiClient.post('/password-reset',{
            token : token,
            password : password,
            confirm_password : confirmPassword,
        })
        .then(response=>{
            console.log(response.data)
            setPassword('')
            setConfirmPassword('')
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
        <div className='text-center'>
            <h1 className='text-4xl mb-5'>Reset Password</h1>
            <ControlledInput label={true} title="Password" type="password" value={password} setFunction={setPassword} errors={errorPass}/>
            <ControlledInput label={true} title="Confirm Password" type="password" value={confirmPassword} setFunction={setConfirmPassword} errors={errorConfirmPass}/>
            <Button className="text-xl mb-5" onClick={resetPassword}>Reset Password</Button>
        </div>
    )
}
export default PasswordResetForm