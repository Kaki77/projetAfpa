import HeartIconOutline from '../icons/outline/HeartIconOutline'
import CommentIconSolid from '../icons/solid/CommentIconSolid'
import ShareIconOutline from '../icons/outline/ShareIconOutline'
import Reply from './Reply'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import {useNavigate} from 'react-router-dom'
import {useState,useEffect} from 'react'
import apiClient from '../axios'
import PostArea from './PostArea'
import ImageContainer from './ImageContainer'

function LittleCard(props) {

    const [showPostArea, setShowPostArea] = useState(false)
    const [like, setLike] = useState([])
    const [likeCount, setLikeCount] = useState('')
    const [share, setShare] = useState([])
    const [shareCount, setShareCount] = useState('')
    const navigate = useNavigate()
    dayjs.extend(relativeTime)

    function commentLike() {
        apiClient.post(`api/comment/${props.post.id}/like`)
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

    useEffect(() => {
        setLike(props.post.likers.find(e=>e.id==props.userID) ? true : false)
        setLikeCount(props.post.likers.length)
        setShare(props.post.sharers.find(e=>e.id==props.userID) ? true : false)
        setShareCount(props.post.sharers.length)
        return () => {
            //
        }
    }, [])
    

    return (
        <>
        {props.showReplies ? <hr className='my-8 w-full'/> : ''}
        <div className="border border-slate-500 rounded-lg grid grid-rows-[1fr_max-content_max-content_max-content_1fr] grid-cols-3 items-center justify-items-center pt-8 ">
            <img className="w-full h-full max-w-[48px] max-h-[48px] rounded-full" src={props.post.author?.avatar ? props.post.author?.avatar : 'https://dummyimage.com/100x100.jpg'} alt=''/>
            <div>
                {props.post.author.name} #{props.post.author.id}
            </div>
            <div>
                {dayjs(props.post.created_at).fromNow()}
            </div>
            <hr className='col-span-full my-4 w-11/12'/>
            <div className="col-span-full py-5 w-full px-8">
                <div onClick={()=>navigate('/app/post/'+props.post.id)}>
                    {props.post.content}
                    <br/>
                    <br/>
                </div>
                {props.post.images.length ?
                    <ImageContainer images={props.post.images} containerId={props.post.sharer ? props.post.sharer?.id : props.post.id}/> :''
                }
            </div>
            <hr className='col-span-full my-4 w-11/12'/>
            <div className='relative h-5/6 w-full text-center' onClick={props.showReplies ? ()=>setShowPostArea(!showPostArea) : ()=>''}>
                <div className='relative h-1/2 w-1/2 left-1/4'>
                    <CommentIconSolid/>
                </div>
                <div>
                 {props.post.hasOwnProperty('comments') ? props.post.comments.length : props.post.replies.length }
                </div>
            </div>
            <div className='relative h-5/6 w-full text-center'>
                <div className='relative h-1/2 w-1/2 left-1/4'>
                    <ShareIconOutline state={share}/>
                </div>
                <div>
                    {shareCount}
                </div>
            </div>
            <div className='relative h-5/6 w-full text-center'>
                <div className='relative h-1/2 w-1/2 left-1/4'>
                    <HeartIconOutline state={like} like={props.showReplies ? commentLike : ''} />
                </div>
                <div>
                    {likeCount}
                </div>
            </div>
        </div>
        {showPostArea ?
                <div className='border border-black p-5 my-8 relative before:block before:absolute before:bottom-full before:left-2/4 before:w-[3px] before:h-8 before:bg-black'>
                    <PostArea url={`api/comment/${props.post.id}/reply`} />
                </div>
                :''
        }
        {props.showReplies ? 
        <div>
            {props.post.replies.map((reply,index)=>
                <Reply post={reply} key={index}/>
            )}
        </div>
        : ''
        }
        </>
    )
}

export default LittleCard