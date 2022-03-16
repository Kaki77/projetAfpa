import {useEffect,useState} from 'react'
import {useParams} from 'react-router-dom'
import apiClient from '../axios'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import LittleCard from './LittleCard'
import PostArea from './PostArea'

function ProfileFeed(props) {

    const [data, setData] = useState([])
    let {id} = useParams()
    dayjs.extend(relativeTime)
    dayjs.extend(advancedFormat)
    
    useEffect(() => {
        props.loading(true)
        let controller = new AbortController()
        props.sessionCheck(fetch,controller)
        return () => {
            controller.abort()
        }
    }, [id])

    function fetch(controller) {
        apiClient.get('api/user/'+id,{
            signal:controller.signal,
        })
        .then(response=>{
            setData(response.data.data)
            console.log(response.data);
            props.loading(false)
        })
    }

    function showCard(post,index) {
        if(post.author?.id != props.userID) {
            return(
                <div className='border border-black my-8'>
                    <div className='grid'>
                        <p className='my-4 text-center col-start-1'>{data.name} has shared :</p>
                        <p className='my-4 text-center col-start-2'>{dayjs(post.share_date).fromNow()}</p>
                    </div>
                    <LittleCard post={post} key={index} userID={props.userID} user={data.name} />
                </div>
            )
        }
        else {
            return <LittleCard post={post} key={index} userID={props.userID} user={data.name} />
        }
    }

    return (
        <>
        {!props.loadState ?
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
            {props.userID == id ? <PostArea url={'api/post'}/> : ''}
            <div>
                {data.profileFeed ? 
                data.profileFeed.map((post,index)=>showCard(post,index)) 
                : ' This user doesn\'t post something'}
            </div>
            </>
        :''
        }
        </>
    )
}

export default ProfileFeed