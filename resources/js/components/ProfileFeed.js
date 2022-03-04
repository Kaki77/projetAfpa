import {useEffect,useState} from 'react'
import {useParams} from 'react-router-dom'
import apiClient from '../axios'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import LittleCard from './LittleCard'

function ProfileFeed(props) {

    const [data, setData] = useState([])
    let {id} = useParams()
    dayjs.extend(relativeTime)
    dayjs.extend(advancedFormat)

    useEffect(() => {
        props.loading(true)
        
        let controller = new AbortController()
        apiClient.get('api/user/'+id,{
            signal:controller.signal,
        })
        .then(response=>{
            setData(response.data.data)
            console.log(response.data);
            props.loading(false)
        })
        return () => {
            controller.abort()
        }
    }, [])

    return (
        <>
            <div className="grid grid-rows-5-maxContent justify-content-center items-center text-center">
                <img className="mx-auto w-full h-full max-w-[100px] max-h-[100px] rounded-full" src='https://dummyimage.com/100x100.jpg' alt=''/>
                <div>
                    {data.name} #{data.id}
                </div>
                <div>
                    Member since {dayjs(data.created_at).fromNow(true)}
                </div>
                <div>
                    Registered on {dayjs(data.created_at).format('MMMM Do[,] YYYY')}
                </div>
                <div>
                    {data.description}
                </div>
            </div>
            <div>
                {data.posts ? data.posts.map(element=><LittleCard post={element} />) : ' This user doesn\'t post something'}
            </div>
        </>
    )
}

export default ProfileFeed