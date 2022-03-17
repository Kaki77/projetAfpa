import {useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import ControlledInput from './ControlledInput'
import apiClient from '../axios'
import Button from './Button'

function ResetPasswordMail(props) {
    
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
        apiClient.post('/mail-reset-password',{
            mail:mail,
        })
        .then(response=>{
            console.log(response.data)
            props.setFlash(response.data.message)
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
            <Button className="text-xl mb-5" onClick={sendResetPasswordMail}>Reset Password</Button>
        </div>
    )
}
export default ResetPasswordMail