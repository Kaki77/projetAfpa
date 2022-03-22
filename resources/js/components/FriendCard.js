import {Link as LinkRouter} from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import UserCircleIconSolid from '../icons/solid/UserCircleIconSolid'
import advancedFormat from 'dayjs/plugin/advancedFormat'

function FriendCard(props) {
    dayjs.extend(relativeTime)
    dayjs.extend(advancedFormat)
    return (
        <LinkRouter to={"../profile/"+props.user.id}>
            <div className="border border-slate-500 rounded-lg grid grid-rows-3 grid-cols-2 justify-items-center items-baseline text-center items-center my-8 py-8">
                <div className="row-start-1 row-end-3">
                    {props.user.avatar ? 
                        <img className="mx-auto w-full h-full max-w-[100px] max-h-[100px] rounded-full" src={props.user.avatar} alt=''/>
                        : <UserCircleIconSolid className="max-h-[100px] w-full"/>
                    }
                </div>
                <div className='row-start-3 row-end-4'>
                    {props.user.name} #{props.user.id}
                </div>
                <div>
                    {props.user.description ? props.user.description : <span className='italic'>No description</span>}
                </div>
                <div>
                    Registered on {dayjs(props.user.created_at).format('MMMM Do[,] YYYY')}
                </div>
                <div>
                    <span className='font-bold'>{props.user.followers?.length}</span> Followers - <span className='font-bold'>{props.user.follow?.length}</span> Follow
                </div>
            </div>
        </LinkRouter>
    )
}

export default FriendCard