import { useState } from 'react'
import ControlledInput from './ControlledInput'

function Example() {

    const [mail, setMail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <div className="login-container">
            <h1 className='title'>Log in</h1>
            <ControlledInput title="Mail" type="mail" value={mail} setFunction={setMail}/>
            <ControlledInput title="Password" type="password" value={password} setFunction={setPassword}/>
            <input type="submit" value="Log in" />
        </div>
    );
}

export default Example;
