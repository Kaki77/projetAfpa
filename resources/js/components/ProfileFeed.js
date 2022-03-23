import {useLayoutEffect,useState,useContext} from 'react'
import {useParams} from 'react-router-dom'
import apiClient from '../axios'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import LittleCard from './LittleCard'
import PostArea from './PostArea'
import Button from './Button'
import UserCircleIconSolid from '../icons/solid/UserCircleIconSolid'
import { Context } from './main'

function ProfileFeed() {

    const [data, setData] = useState([])
    const [followCount, setFollowCount] = useState('')
    let {id} = useParams()
    dayjs.extend(relativeTime)
    dayjs.extend(advancedFormat)
    const {loading,sessionCheck,userID,setFlash,loadState} = useContext(Context)
    
    useLayoutEffect(() => {
        loading(true)
        let controller = new AbortController()
        sessionCheck(fetch,controller)
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
            setFollowCount(response.data.data.followers?.length)
            console.log(response.data);
            loading(false)
        })
    }

    function showCard(post,index) {
        if(post.author?.id != data.id) {
            return(
                <>
                    <hr className='w-full my-8 h-0 border border-blue-500'/>
                    <div className='p-5'>
                        <div className='grid italic'>
                            <p className='my-4 text-center col-start-1'>{data.name} has shared :</p>
                            <p className='my-4 text-center col-start-2'>{dayjs(post.share_date).fromNow()}</p>
                        </div>
                        <LittleCard className="border border-slate-500 rounded-lg" post={post} key={index} userID={userID} authorId={id} />
                    </div>
                </>
            )
        }
        else {
            return(
            <>
            <hr className='w-full my-8 h-0 border border-blue-500'/><div className='my-8'>
                <LittleCard post={post} key={index} userID={userID} authorId={id} /></div>
            </>
            )
        }
    }

    function follow() {
        apiClient.post(`api/user/${id}/follow`)
        .then(response=>{
            console.log(response.data)
            setFollowCount(response.data.data == 'true' ? followCount+1 : followCount-1)
            setFlash(response.data.message)
        })
    }

    return (
        <>
        {!loadState ?
            <>
            <div className="grid grid-rows-6-maxContent justify-center items-center text-center">
                {data.avatar ?
                    <img className="mx-auto w-full h-full max-w-[100px] max-h-[100px] rounded-full" src={data.avatar} alt=''/>
                    : <UserCircleIconSolid className="max-h-[100px] w-full"/>
                }
                <div className='font-bold text-xl title'>
                    {data.name} #{data.id}
                </div>
                <div>
                    {data.id != userID ? 
                        <>
                            <Button className="text-center w-1/2 my-3" onClick={follow}>
                                {data.user_is_following == 'true' ? 'Unfollow' : 'Follow'}
                            </Button>
                        </>
                        : ''
                    }
                </div>
                <div className='italic'>
                    {data.description ? <>&ldquo;{data.description}&rdquo;</> : ''}
                </div>
                <div>
                    Registered on {dayjs(data.created_at).format('MMMM Do[,] YYYY')}
                </div>
                <div>
                    <span className='font-bold'>{followCount}</span> Followers - <span className='font-bold'>{data.follow?.length}</span> Follow
                </div>
            </div>
            {userID == id ? <PostArea url={'api/post'}/> : ''}
            <div>
                {data.profileFeed ? 
                data.profileFeed.map((post,index)=>showCard(post,index)) 
                : <div className='text-center text-xl my-8'>No post available</div>}
            </div>
            </>
        :''
        }
        </>
    )
}

export default ProfileFeed