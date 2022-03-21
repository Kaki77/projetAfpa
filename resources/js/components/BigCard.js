import HeartIconOutline from '../icons/outline/HeartIconOutline'
import CommentIconSolid from '../icons/solid/CommentIconSolid'
import ShareIconOutline from '../icons/outline/ShareIconOutline'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import apiClient from '../axios'
import {useState,useEffect} from 'react'
import {useParams,Link} from 'react-router-dom'
import LittleCard from './LittleCard'
import PostArea from './PostArea'
import ImageContainer from './ImageContainer'

function BigCard(props) {

    const [data, setData] = useState([])
    const [like, setLike] = useState([])
    const [likeCount, setLikeCount] = useState('')
    const [share, setShare] = useState([])
    const [shareCount, setShareCount] = useState('')
    dayjs.extend(relativeTime)
    let {id} = useParams()

    useEffect(() => {
        props.loading(true)
        let controller = new AbortController()
        props.sessionCheck(fetch,controller)
        return () => {
            controller.abort()
        }
    }, [])
    
    function fetch(controller) {
        apiClient.get(`api/post/${id}`,{
            signal: controller.signal,
        })
        .then(response=>{
            setData(response.data.data)
            setLike(response.data.data.likers.find(e=>e.id==props.userID) ? true : false)
            setLikeCount(response.data.data.likers.length)
            setShare(response.data.data.sharers.find(e=>e.id==props.userID) ? true : false)
            setShareCount(response.data.data.sharers.length)
            console.log(response.data)
            props.loading(false)
        })
    }

    function postLike() {
        apiClient.post(`api/post/${id}/like`)
        .then(response=>{
            if(response.data.data == 'true') {
                setLike(true)
                setLikeCount(likeCount+1)
            }
            else {
                setLike(false)
                setLikeCount(likeCount-1)
            }
        })
    }

    function postShare() {
        apiClient.post(`api/post/${id}/share`)
        .then(response=>{
            if(response.data.data == 'true') {
                setShare(true)
                setShareCount(shareCount+1)
            }
            else {
                setShare(false)
                setShareCount(shareCount-1)
            }
        })
        .catch(error=>{
            props.setFlash(error.response.data.message)
        })
    }

    return (
        <>
        {!props.loadState ?
        <>
            <div className="border border-slate-500 grid grid-rows-[1fr_max-content_max-content_max-content_max-content_max-content_1fr] grid-cols-3 items-center justify-items-center my-8 pt-8">
                <img className="w-full h-full max-w-[100px] max-h-[100px] rounded-full" src='https://dummyimage.com/100x100.jpg' alt=''/>
                <div>
                    <Link className="text-xl underline" to={`/app/profile/${data.id}`}>{data.author?.name} #{data.author?.id}</Link>
                </div>
                <div></div>
                <hr className='col-span-full my-4 w-11/12'/>
                <div className="col-span-full py-5 w-full px-8">
                    <div>
                        {data.content}
                    </div>
                    <br/>
                    <br/>
                        {data.images ?
                            <ImageContainer images={data.images} containerId={data.id}/> :''
                        }
                </div>
                <hr className='col-span-full my-4 w-11/12'/>
                <div className='text-center'>
                    {dayjs(data.created_at).format('HH:mm:ss')}
                </div>
                <div></div>
                <div className='text-center'>
                    {dayjs(data.created_at).format('YYYY-MM-DD')}
                </div>
                <hr className='col-span-full my-4 w-11/12'/>
                <div className='relative h-5/6 w-full text-center'>
                    <div className='relative h-1/2 w-1/2 left-1/4'>
                        <CommentIconSolid/>
                    </div>
                    <div>
                        {data.comments?.length}
                    </div>
                </div>
                <div className='relative h-5/6 w-full text-center'>
                    <div className='relative h-1/2 w-1/2 left-1/4'>
                        <ShareIconOutline state={share} share={postShare}/>
                    </div>
                    <div>
                        {shareCount}
                    </div>
                </div>
                <div className='relative h-5/6 w-full text-center'>
                    <div className='relative h-1/2 w-1/2 left-1/4'>
                        <HeartIconOutline state={like} like={postLike}/>
                    </div>
                    <div>
                        {likeCount}
                    </div>
                </div>
            </div>
            <PostArea url={`api/post/${data.id}/comment`} title={'Answer to this post'} />
            {data.comments?.length ?
            <>
                {data.comments?.map((comment,index)=>
                    <div className='defautl:my-8 last:mt-8 last:pb-8'><LittleCard key={index} post={comment} showReplies={true} userID={props.userID} /></div>
                )}
            </>
            : ''
            }
        </>
        : ''
        }
        </>
    )
}

export default BigCard
