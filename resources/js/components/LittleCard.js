import HeartIconOutline from '../icons/outline/HeartIconOutline'
import CommentIconSolid from '../icons/solid/CommentIconSolid'
import ShareIconSolid from '../icons/solid/ShareIconSolid'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import {useNavigate} from 'react-router-dom'

function LittleCard(props) {

    const navigate = useNavigate()
    dayjs.extend(relativeTime)

    return (
        <>
        <div className="border border-slate-500 grid grid-rows-[1fr_max-content_1fr] grid-cols-3 items-center justify-items-center my-8 pt-8" onClick={()=>navigate('/app/post/'+props.post.id,{replace:true})}>
            <img className="w-full h-full max-w-[100px] max-h-[100px] rounded-full" src='https://dummyimage.com/100x100.jpg' alt=''/>
            <div>
                {props.post.author.name} #{props.post.author.id}
            </div>
            <div>
                {dayjs(props.post.created_at).fromNow()}
            </div>
            <div className="col-span-full py-8 w-full px-5">
               {props.post.content}
               <br/>
               <br/>
                {props.post.images ?
                    props.post.images.map(image=>
                        <img className="mx-auto w-full h-full max-h-[100px]" src={image.url} alt=''/>
                    )
                    : ''
                }
            </div>
            <div className='relative h-5/6 w-full text-center'>
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
                    <HeartIconOutline/>
                </div>
                <div>
                    {props.post.likers.length}
                </div>
            </div>
        </div>
        </>
    )
}

export default LittleCard