import { useState } from "react"
import ControlledTextArea from "./ControlledTextArea"
import ControlledInput from "./ControlledInput"
import Button from "./Button"

function SettingsFeed() {

    const [description, setDescription] = useState('')
    const [oldPassword, setOldPassword] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errorDescription, setErrorDescription] = useState([])
    const [errorOldPassword, setErrorOldPassword] = useState([])
    const [errorPassword, setErrorPassword] = useState([])
    const [errorConfirmPassword, setErrorConfirmPassword] = useState([])

    return (
        <div className="text-center">
            <h1 className="text-4xl">Settings</h1>
            <hr className='my-8 w-full'/>
            <div>
                <h2 className="text-xl">Change my Avatar</h2>
            </div>
            <hr className='my-8 w-full'/>
            <div>
                <h2 className="text-xl">Change my Description</h2>
                <ControlledTextArea placeholder="Type my description..." value={description} setFunction={setDescription} rows="6" cols="30" errors={errorDescription}/>
                <Button>Change</Button>
            </div>
            <hr className='my-8 w-full'/>
            <div>
                <h2 className="text-xl">Change my password</h2>
                <ControlledInput label={true} title="Old Password" type="password" value={oldPassword} setFunction={setOldPassword} errors={errorOldPassword}/>
                <ControlledInput label={true} title="New Password" type="password" value={password} setFunction={setPassword} errors={errorPassword}/>
                <ControlledInput label={true} title="Confirm New Password" type="password" value={confirmPassword} setFunction={setConfirmPassword} errors={errorConfirmPassword}/>
                <Button>Change</Button>
            </div>
        </div>
    )
}
export default SettingsFeed