import { useState } from 'react'
import apiClient from '../axios'
import ControlledInput from './ControlledInput'
import Goto from './Goto'

function Login(props) {

    const [mail, setMail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMail, setErrorMail] = useState([])
    const [errorPass, setErrorPass] = useState([])

    function login(event){
        props.loading(true)
        event.preventDefault()
        apiClient.get('sanctum/csrf-cookie')
            .then(response=>{
                apiClient.post('login',{
                    email:mail,
                    password:password
                })
                .then(response=>{                    
                    setMail('')
                    setPassword('')
                    //login()
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
            })
    }

    return (
        <form className="mx-auto my-0 text-center">
            <h1 className='text-4xl mb-5'>Log in</h1>
            <ControlledInput title="Mail" type="mail" value={mail} setFunction={setMail} errors={errorMail}/>
            <ControlledInput title="Password" type="password" value={password} setFunction={setPassword} errors={errorPass}/>
            <button className="text-xl w-24 mb-5 py-1 bg-teal-400 text-white rounded hover:bg-teal-600 transition" type="submit" onClick={login}>Log in</button>
            <br/>
            <Goto href="/register">Don't have an account ? Register now !</Goto>
            <Goto href="#">Forgot your password ? Click here</Goto>
        </form>
    );
}

export default Login;
