import ControlledTextArea from "./ControlledTextArea"
import {useState,useRef} from 'react'
import apiClient from "../axios"
import {useNavigate} from 'react-router-dom'
import PaperAirplaneIconSolid from "../icons/solid/PaperAirplaneIconSolid"
import PhotographIconSolid from "../icons/solid/PhotographIconSolid"
import Button from "./Button"

function PostArea(props) {

    const [post, setPost] = useState('')
    const [key, setKey] = useState(2)
    const [errorPost, setErrorPost] = useState([])
    const navigate = useNavigate()
    const fileInput = useRef({files:''})

    function sendPost() {
        let formData = new FormData()
        formData.append('content',post)
        for(let i =0; i< fileInput.current.files.length; i++) {
            formData.append(`image[]`, fileInput.current.files[i])
        }
        apiClient.post(props.url,formData,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response=>{
            setPost('')
            navigate(0)
        })
        .catch(error=>{
            console.log(error)
            const errors = error.response.data.message
            if(errors) {
                for(const [key,error] of Object.entries(errors)){
                    error.forEach(err=>{
                        setErrorPost((state)=>[...state,err])
                    })
                }            
            }
            else {
                setErrorPost([])
            }
        })
    }

    return (
        <div className="my-8 lg:px-14">
            {props.title ?
                <div className="w-full text-center">{props.title}</div>
                :'' 
            }
            <div className="grid grid-rows-[auto_max-content_max-content] grid-cols-2 gap-2 justify-items-center">
                <input ref={fileInput} className="hidden" type='file' onChange={()=>setKey(-key)} accept="image/*" multiple/>
                <div className="row-start-1 col-span-2">
                    <ControlledTextArea name='post' placeholder='Type something...' cols='32' rows='4' errors={errorPost} value={post} setFunction={setPost}/>
                </div>
                <div className='row-start-2 col-span-full grid grid-cols-2 w-full text-center' key={key}>
                    {fileInput.current.files.length ?
                        <>
                        {Array.from(fileInput.current.files).map((file,index)=><div key={index}>{file.name}</div>)}
                        </>
                    : ''
                    }
                </div>
                <Button className="text-center h-12 w-5/6" onClick={()=>fileInput.current.click()}><PhotographIconSolid/></Button>
                <Button className="text-center h-12 w-5/6" onClick={sendPost}><PaperAirplaneIconSolid/></Button>
            </div>
        </div>
    )
}

export default PostArea
