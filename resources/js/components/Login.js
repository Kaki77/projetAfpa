import { useState,useEffect } from 'react'
import { useNavigate,useSearchParams } from 'react-router-dom'
import apiClient from '../axios'
import Button from './Button'
import ControlledInput from './ControlledInput'
import Link from './Link'

function Login(props) {

    const [searchParams, setSearchParams] = useSearchParams()
    const navigate = useNavigate()
    const [mail, setMail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMail, setErrorMail] = useState([])
    const [errorPass, setErrorPass] = useState([])

    useEffect(() => {
        props.sessionCheck()
        return () => {
            //
        }
    }, [])
    

    function login(event){
        props.loading(true)
        event.preventDefault()
        apiClient.post('login',{
            email:mail,
            password:password
        })
        .then(response=>{                    
            setMail('')
            setPassword('')
            props.login(response.data.data)
            searchParams.get('next') ? navigate(searchParams.get('next'),{replace : true}) : navigate('/app',{replace : true})
        })
        .catch(error=>{
            if(error.response.status=='400'){
                error.response.data.message.email ? setErrorMail(error.response.data.message.email) : setErrorMail([])
                error.response.data.message.password ? setErrorPass(error.response.data.message.password) : setErrorPass([])
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
        <div className="text-center">
            <h1 className='text-4xl mb-5'>Log in</h1>
            <ControlledInput label={true} title="Mail" type="mail" value={mail} setFunction={setMail} errors={errorMail}/>
            <ControlledInput label={true} title="Password" type="password" value={password} setFunction={setPassword} errors={errorPass}/>
            <Button className="w-24 mb-5" onClick={login}>Log in</Button>
            <br/>
            <Link href="/register">Don't have an account ? Register now !</Link>
            <Link href="/reset-password-mail">Forgot your password ? Click here</Link>
        </div>
    );
}

export default Login;
