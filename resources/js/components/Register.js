import {useState,useEffect,useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import apiClient from '../axios'
import Button from './Button'
import ControlledInput from "./ControlledInput"
import { Context } from './main'

function Register() {

    const navigate = useNavigate()
    const [Name, setName] = useState('')
    const [Mail, setMail] = useState('')
    const [Password, setPassword] = useState('')
    const [ConfirmPassword, setConfirmPassword] = useState('')
    const [errorName, setErrorName] = useState([])
    const [errorMail, setErrorMail] = useState([])
    const [errorPass, setErrorPass] = useState([])
    const [errorConfirmPass, setErrorConfirmPass] = useState([])
    const {sessionCheck,setFlash,loading} = useContext(Context)

    useEffect(() => {
        sessionCheck()
        return () => {
            //
        }
    }, [])
    

    function register(event){
        loading(true)
        apiClient.post('register',{
            name:Name,
            email:Mail,
            password:Password,
            confirm_password:ConfirmPassword
        })
        .then(response=>{
            console.log(response.data);
            setName('')                    
            setMail('')
            setPassword('')
            setConfirmPassword('')
            setFlash('You have been registered with success. Now you can log in with your credentials.')
            navigate('/',{replace : true})
        })
        .catch(error=>{
            console.log(error.response);
            if(error.response.status =='400') {
                error.response.data.message.name ? setErrorName(error.response.data.message.name) : setErrorName([])
                error.response.data.message.email ? setErrorMail(error.response.data.message.email) : setErrorMail([])
                error.response.data.message.password ? setErrorPass(error.response.data.message.password) : setErrorPass([])
                error.response.data.message.confirm_password ? setErrorConfirmPass(error.response.data.message.confirm_password) : setErrorConfirmPass([])
            } 
            else if(error.response.status =='401') {
                setErrorMail([error.response.data.message])
            }
        })
        .finally(()=>{
            loading(false)
        })
    }


    return (
        <div className="mx-auto my-0 text-center">
            <h1 className='text-4xl mb-5'>Register</h1>
            <ControlledInput label={true} title="Name" type="text" value={Name} setFunction={setName} errors={errorName}/>
            <ControlledInput label={true} title="Mail" type="text" value={Mail} setFunction={setMail} errors={errorMail}/>
            <ControlledInput label={true} title="Password" type="password" value={Password} setFunction={setPassword} errors={errorPass}/>
            <ControlledInput label={true} title="Confirm Password" type="password" value={ConfirmPassword} setFunction={setConfirmPassword} errors={errorConfirmPass}/>
            <Button onClick={register}>Register now !</Button>
        </div>
    )
}

export default Register