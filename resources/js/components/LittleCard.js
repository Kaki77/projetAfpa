import HeartIconOutline from '../icons/outline/HeartIconOutline'
import CommentIconSolid from '../icons/solid/CommentIconSolid'
import ShareIconSolid from '../icons/solid/ShareIconSolid'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import apiClient from '../axios'
import {useState} from 'react'

function LittleCard(props) {

    const [showComments, setShowComments] = useState(false)
    const [like, setLike] = useState(props.post.likers.find(e=>e.id == props.id) ? props.post.likers.find(e=>e.id == props.user) : false)
    const [likeCount, setLikeCount] = useState(props.post.likers.length)
    dayjs.extend(relativeTime)

    function postLike() {
        apiClient.post(`api/post/${props.post.id}/like`)
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

    return (
        <>
        <div className="border border-slate-500 grid grid-rows-[1fr_max-content_1fr] grid-cols-4 items-center justify-items-center my-8 pt-8">
            <img className="w-full h-full max-w-[100px] max-h-[100px] rounded-full" src='https://dummyimage.com/100x100.jpg' alt=''/>
            <div>
                {props.post.author.name} #{props.post.author.id}
            </div>
            <div></div>
            <div>
                Posted {dayjs(props.post.created_at).fromNow()}
            </div>
            <div className="col-start-2 col-end-5 py-8 w-full">
               {props.post.content}
            </div>
            <div className='text-center'>
                {dayjs(props.post.created_at).format('YYYY-MM-DD HH:mm:ss')}
            </div>
            <div className='relative h-5/6 w-full text-center' onClick={()=>props.post.comments.length > 0 ? setShowComments(!showComments) : ''}>
                <div className='relative h-1/2 w-1/2 left-1/4'>
                    <CommentIconSolid/>
                </div>
                <div>
                    {props.post.comments.length}
                </div>
            </div>
            <div className='relative h-5/6 w-full text-center'>
                <div className='relative h-1/2 w-1/2 left-1/4'>
                    <ShareIconSolid/>
                </div>
                <div>
                    {props.post.sharers.length}
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
        {
            showComments ?
                <LittleCard/>
            : ''
        }
        </>
    )
}

export default LittleCard
