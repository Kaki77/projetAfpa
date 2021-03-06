import { useState,useRef,useEffect,useContext} from "react"
import ControlledTextArea from "./ControlledTextArea"
import ControlledInput from "./ControlledInput"
import Button from "./Button"
import apiClient from "../axios"
import { Context } from "./main"

function SettingsFeed() {

    const [description, setDescription] = useState('')
    const [oldPassword, setOldPassword] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errorAvatar, setErrorAvatar] = useState([])
    const [errorDescription, setErrorDescription] = useState([])
    const [errorOldPassword, setErrorOldPassword] = useState([])
    const [errorPassword, setErrorPassword] = useState([])
    const [errorConfirmPassword, setErrorConfirmPassword] = useState([])
    const avatarInput = useRef({file:''})
    const {sessionCheck,loading,setFlash} = useContext(Context)

    useEffect(() => {
      sessionCheck()
      return () => {
        //
      }
    }, [])
    
    function changeAvatar() {
        loading(true)
        let formData = new FormData()
        formData.append("avatar", avatarInput.current.files[0]);
        apiClient.post("api/user/editAvatar",formData,{
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        })
        .then(response=>{
            console.log(response.data)
            loading(false)
            setFlash(response.data.message)
        })
        .catch(error=>{
            setErrorAvatar(error.response.data.message.avatar)
            loading(false)
        })
    }


    function changeDescription() {
        loading(true)
        apiClient.post("api/user/editDescription",{
            description : description,
        })
        .then(response=>{
            console.log(response.data)
            setDescription('')
            loading(false)
            setFlash(response.data.message)
        })
        .catch(error=>{
            error.response.data.message.description ? setErrorDescription(error.response.data.message.description) : setErrorDescription([])
            loading(false)
        })
    }

    function changePassword() {
        loading(true)
        apiClient.post("api/user/editPassword",{
            old_password : oldPassword,
            password : password,
            confirm_password : confirmPassword,
        })
        .then(response=>{
            console.log(response.data);
            setOldPassword('')
            setPassword('')
            setConfirmPassword('')
            loading(false)
            setFlash(response.data.message)
        })
        .catch(error=>{
            if(error.response.status == '400') {
                error.response.data.message.old_password ? setErrorOldPassword(error.response.data.message.old_password) : setErrorOldPassword([])
                error.response.data.message.password ? setErrorPassword(error.response.data.message.password) : setErrorPassword([])
                error.response.data.message.confirm_password ? setErrorConfirmPassword(error.response.data.message.confirm_password) : setErrorConfirmPassword([])
            }
            else if(error.response.status == '401') {
                setErrorOldPassword([error.response.data.message])
            }
            loading(false)
        })
    }

    return (
        <div className="text-center">
            <h1 className="text-4xl title">Settings</h1>
            <hr className='my-8 w-full'/>
            <div>
                <h2 className="text-xl title">Change my Avatar</h2>
                <input className="w-4/5 my-5 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:text-white file:font-semibold file:bg-blue-500 hover:file:bg-teal-600 file:transition" type="file" ref={avatarInput} accept="image/*"/>
                {errorAvatar.map((element,index)=>
                    <p key={index} className='text-sm text-red-400 italic'>
                        {element}
                    </p>
                )}
                <br/>
                <Button onClick={changeAvatar}>Change</Button>
            </div>
            <hr className='my-8 w-full'/>
            <div>
                <h2 className="text-xl title">Change my Description</h2>
                <ControlledTextArea placeholder="Type my description..." value={description} setFunction={setDescription} rows="6" cols="30" errors={errorDescription}/>
                <br/>
                <Button onClick={changeDescription}>Change</Button>
            </div>
            <hr className='my-8 w-full'/>
            <div>
                <h2 className="text-xl title">Change my password</h2>
                <ControlledInput label={true} title="Old Password" type="password" value={oldPassword} setFunction={setOldPassword} errors={errorOldPassword}/>
                <ControlledInput label={true} title="New Password" type="password" value={password} setFunction={setPassword} errors={errorPassword}/>
                <ControlledInput label={true} title="Confirm New Password" type="password" value={confirmPassword} setFunction={setConfirmPassword} errors={errorConfirmPassword}/>
                <Button onClick={changePassword}>Change</Button>
            </div>
        </div>
    )
}
export default SettingsFeed