import ControlledTextArea from "./ControlledTextArea"
import {useState,useRef} from 'react'
import apiClient from "../axios"
import {useNavigate} from 'react-router-dom'
import PaperAirplaneIconSolid from "../icons/solid/PaperAirplaneIconSolid"
import PhotographIconSolid from "../icons/solid/PhotographIconSolid"

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
            formData.append(`image[]`, fileInput.current.files[i]);
        }
        apiClient.post('api/post',formData,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response=>{
            setPost('')
            setFiles([])
            navigate(0)
        })
        .catch(error=>{
            error.response.data.message.content ? setErrorPost(error.response.data.message.content) : setErrorPost([])
        })
    }

    return (
        <div className="grid grid-rows-[auto_max-content_max-content] grid-cols-2 gap-2 justify-items-center">
            <input ref={fileInput} className="hidden" type='file' onChange={()=>setKey(-key)} multiple/>
            <ControlledTextArea className="col-span-2" name='post' placeholder='Type something...' cols='32' rows='4' errors={errorPost} value={post} setFunction={setPost}/>
            <div key={key}>
                {fileInput.current.files.length ?
                    <div className='row-start-2 col-span-full'>
                        {Array.from(fileInput.current.files).map((file,index)=><div key={index}>{file.name}</div>)}
                    </div>
                : ''
                }
            </div>
            <button className="text-center h-12 w-5/6 px-5 py-1 bg-teal-400 text-white rounded hover:bg-teal-600 transition col-start-1" onClick={()=>fileInput.current.click()}><PhotographIconSolid/></button>
            <button className="text-center h-12 w-5/6 px-5 py-1 bg-teal-400 text-white rounded hover:bg-teal-600 transition col-start-2" onClick={sendPost} type="submit"><PaperAirplaneIconSolid/></button>
        </div>
    )
}

export default PostArea
