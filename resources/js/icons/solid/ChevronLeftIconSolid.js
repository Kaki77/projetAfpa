import {ChevronLeftIcon} from '@heroicons/react/solid'
import {useNavigate} from 'react-router-dom'

function ChevronLeftIconSolid() {

    const navigate = useNavigate()

    return (
        <ChevronLeftIcon className='absolute h-full top-0 bottom-0 left-0' onClick={()=>navigate(-1)}/>
    )
}

export default ChevronLeftIconSolid