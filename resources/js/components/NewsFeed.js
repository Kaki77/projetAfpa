import {useLayoutEffect,useState,useContext} from 'react'
import LittleCard from './LittleCard'
import apiClient from '../axios'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Context } from './main'

function NewsFeed() {

    const [data, setData] = useState([])
    dayjs.extend(relativeTime)
    const {loading,sessionCheck,userID,loadState} = useContext(Context)

    useLayoutEffect(() => {
        loading(true)
        let controller = new AbortController()
        sessionCheck(fetch,controller)
        return () => {
            controller.abort()
        }
    }, [])

    function fetch(controller) {
        apiClient.get('api/post/newsFeed',{
            signal:controller.signal,
        })
        .then(response=>{
            setData(response.data.data)
            console.log(response.data);
            loading(false)
        })
    }

    function showCard(post,index) {
        if(post.sharer.id != post.author.id) {
            return(
                <>
                    <hr className='w-full my-8 h-0 border border-blue-500'/>
                    <div className='p-[10px]'>
                        <div className='grid'>
                            <p className='my-4 text-center col-start-1'>{post.sharer.name} has shared :</p>
                            <p className='my-4 text-center col-start-2'>{dayjs(post.share_date).fromNow()}</p>
                        </div>
                        <LittleCard className="border border-slate-500 rounded-lg" post={post} key={index} userID={userID} />
                    </div>
                </>
            )
        }
        else {
            return(
                <>
                    <hr className='w-full my-8 h-0 border border-blue-500'/>
                    <div className='my-8'><LittleCard post={post} key={index} userID={userID} /></div>
                </>
            )
        }
    }

    return (
        <>
        {!loadState ?
            <>
                {data ?
                    <>
                    <div className='text-4xl text-center my-8 title'>News Feed</div>
                    {data.map((post,index)=>showCard(post,index))}
                    </>
                    : 'There is no posts from people you follow'
                }
            </>:''
        }
        </>
    )
}

export default NewsFeed