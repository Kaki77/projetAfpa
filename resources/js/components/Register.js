import {useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import apiClient from '../axios'
import ControlledInput from "./ControlledInput"

function Register(props) {

    const navigate = useNavigate()
    const [Name, setName] = useState('')
    const [Mail, setMail] = useState('')
    const [Password, setPassword] = useState('')
    const [ConfirmPassword, setConfirmPassword] = useState('')
    const [errorName, setErrorName] = useState([])
    const [errorMail, setErrorMail] = useState([])
    const [errorPass, setErrorPass] = useState([])
    const [errorConfirmPass, setErrorConfirmPass] = useState([])

    useEffect(() => {
        props.sessionCheck()
        return () => {
            //
        }
    }, [])
    

    function register(event){
        props.loading(true)
        event.preventDefault()
        apiClient.post('register',{
            name:Name,
            email:Mail,
            password:Password,
            confirm_password:ConfirmPassword
        })
        .then(response=>{
            setName('')                    
            setMail('')
            setPassword('')
            setConfirmPassword('')
            navigate('/')
        })
        .catch(error=>{
            if(error.response.status=='400'){
                error.response.data.message.name ? setErrorName(error.response.data.message.name) : setErrorName([])
                error.response.data.message.email ? setErrorMail(error.response.data.message.email) : setErrorMail([])
                error.response.data.message.password ? setErrorPass(error.response.data.message.password) : setErrorPass([])
                error.response.data.message.confirm_password ? setErrorConfirmPass(error.response.data.message.confirm_password) : setErrorConfirmPass([])
            } 
            else if(error.response.status=='401'){
                setErrorMail([error.response.data.message])
            }
        })
        .finally(()=>{
            props.loading(false)
        })
    }


    return (
        <form className="mx-auto my-0 text-center">
            <h1 className='text-4xl mb-5'>Register</h1>
            <ControlledInput title="Name" type="text" value={Name} setFunction={setName} errors={errorName}/>
            <ControlledInput title="Mail" type="text" value={Mail} setFunction={setMail} errors={errorMail}/>
            <ControlledInput title="Password" type="password" value={Password} setFunction={setPassword} errors={errorPass}/>
            <ControlledInput title="Confirm Password" type="password" value={ConfirmPassword} setFunction={setConfirmPassword} errors={errorConfirmPass}/>
            <button className="text-xl px-5 mb-5 py-1 bg-teal-400 text-white rounded hover:bg-teal-600 transition" type="submit" onClick={register}>Register now !</button>
        </form>
    )
}

export default Register