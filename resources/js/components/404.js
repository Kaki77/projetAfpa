import { useNavigate } from 'react-router-dom'
import  Button  from './Button'

function Error404() {
    const navigate = useNavigate()
    return (
        <div className="mx-auto text-4xl text-center">
            404 Error : Not Found
            <Button onClick={()=>navigate('/',{replace : true})}>Return to Home</Button>
        </div>
    )
}
export default Error404