import { useState,useRef} from "react"
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
    const avatarInput = useRef({file:''})


    return (
        <div className="text-center">
            <h1 className="text-4xl">Settings</h1>
            <hr className='my-8 w-full'/>
            <div>
                <h2 className="text-xl">Change my Avatar</h2>
                <input className="my-5 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:text-white file:font-semibold file:bg-teal-400 hover:file:bg-teal-600 file:transition" type="file" ref={avatarInput} accept="image/*"/>
            </div>
            <hr className='my-8 w-full'/>
            <div>
                <h2 className="text-xl">Change my Description</h2>
                <ControlledTextArea placeholder="Type my description..." value={description} setFunction={setDescription} rows="6" cols="30" errors={errorDescription}/>
                <br/>
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