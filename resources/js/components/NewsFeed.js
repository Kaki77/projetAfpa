import {useEffect,useState} from 'react'
import LittleCard from './LittleCard'
import apiClient from '../axios'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

function NewsFeed(props) {

    const [data, setData] = useState([])
    dayjs.extend(relativeTime)

    useEffect(() => {
        props.loading(true)
        let controller = new AbortController()
        props.sessionCheck(fetch,controller)
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
            props.loading(false)
        })
    }

    function showCard(post,index) {
        if(post.sharer.id != post.author.id) {
            return(
                <div className='border border-black my-8'>
                    <div className='grid'>
                        <p className='my-4 text-center col-start-1'>{post.sharer.name} has shared :</p>
                        <p className='my-4 text-center col-start-2'>{dayjs(post.share_date).fromNow()}</p>
                    </div>
                    <LittleCard post={post} key={index} userID={props.userID} user={data.name} />
                </div>
            )
        }
        else {
            return <div className='my-8'><LittleCard post={post} key={index} userID={props.userID} user={data.name} /></div>
        }
    }

    return (
        <>
            {data ?
                <>
                <div className='text-4xl text-center my-8'>Last Posts</div>
                {data.map((post,index)=>showCard(post,index))}
                </>
                : 'There is no posts from people you follow'
            }
        </>
    )
}

export default NewsFeed