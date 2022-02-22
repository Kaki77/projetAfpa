import HeartIconOutline from '../icons/outline/HeartIconOutline'
import CommentIconSolid from '../icons/solid/CommentIconSolid'
import HeartIconSolid  from '../icons/solid/HeartIconSolid'
import ShareIconSolid from '../icons/solid/ShareIconSolid'
import {useState} from 'react'

function LittleCard() {

    const [showComments, setShowComments] = useState(false)
    const [like, setLike] = useState(false)

    return (
        <>
        <div className="border border-slate-500 grid grid-rows-[1fr_max-content_1fr] grid-cols-4 items-center justify-items-center my-8 pt-8">
            <img className="w-full h-full max-w-[100px] max-h-[100px] rounded-full" src='https://dummyimage.com/100x100.jpg' alt=''/>
            <div>
                Pseudo ID
            </div>
            <div></div>
            <div>
                10 months ago
            </div>
            <div className="col-start-2 col-end-5 py-8">
                Do non adipisicing eiusmod esse duis sit amet occaecat aute sint. Consequat non sit proident excepteur. Id occaecat nisi dolore Lorem veniam. Velit est Lorem nisi minim eu adipisicing nulla ex esse magna.
                Consequat labore sint officia anim Lorem aute ea ad pariatur quis nostrud. Cillum sit exercitation minim adipisicing aliqua id et consequat exercitation. Ad enim id reprehenderit exercitation eiusmod.
            </div>
            <div className='text-center'>
                April 12, 2021 at 10:56 AM
            </div>
            <div className='relative h-5/6 w-full text-center' onClick={()=>setShowComments(!showComments)}>
                <div className='relative h-1/2 w-1/2 left-1/4'>
                    <CommentIconSolid/>
                </div>
                <div>
                    33
                </div>
            </div>
            <div className='relative h-5/6 w-full text-center'>
                <div className='relative h-1/2 w-1/2 left-1/4'>
                    <ShareIconSolid/>
                </div>
                <div>
                    125
                </div>
            </div>
            <div className='relative h-5/6 w-full text-center'>
                <div className='relative h-1/2 w-1/2 left-1/4'>
                    <HeartIconOutline state={like} like={setLike}/>
                </div>
                <div>
                    500
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
