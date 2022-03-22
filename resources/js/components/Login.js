import { useState,useEffect,useContext } from 'react'
import { useNavigate,useSearchParams } from 'react-router-dom'
import apiClient from '../axios'
import Button from './Button'
import ControlledInput from './ControlledInput'
import Link from './Link'
import { Context } from './main'

function Login() {

    const [searchParams, setSearchParams] = useSearchParams()
    const navigate = useNavigate()
    const [mail, setMail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMail, setErrorMail] = useState([])
    const [errorPass, setErrorPass] = useState([])
    const {sessionCheck,loading,setUserID} = useContext(Context)

    useEffect(() => {
        sessionCheck()
        return () => {
            //
        }
    }, [])
    

    function login(event){
        loading(true)
        event.preventDefault()
        apiClient.post('login',{
            email:mail,
            password:password
        })
        .then(response=>{                    
            setMail('')
            setPassword('')
            setUserID(response.data.data.id)
            response.data.data.dark_mode ? document.documentElement.classList.add('dark') : document.documentElement.classList.remove('dark')
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
            loading(false)
        })  
    }

    return (
        <div className="text-center">
            <h1 className='text-2xl mb-5 px-5 title'>
                Chat with friends,
                <br/>
                Make new friends,
                <br/>
                Be aware of the latest news
                <br/>
                And much more !
            </h1>
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
