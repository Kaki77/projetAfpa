import {Link as LinkRouter} from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

function FriendCard(props) {
    dayjs.extend(relativeTime)
    return (
        <LinkRouter to={"../profile/"+props.user.id}>
            <div className="border border-slate-500 grid grid-rows-1 grid-cols-2 justify-items-center text-center items-center my-8 pt-8">
                <div id="info" className="relative">
                    <img className="mx-auto w-full h-full max-w-[100px] max-h-[100px] rounded-full" src='https://dummyimage.com/100x100.jpg' alt=''/>
                    <div>
                        {props.user.name} #{props.user.id}
                    </div>
                    <div>
                        Member since {dayjs(props.user.created_at).fromNow(true)}
                    </div>
                </div>
                <div>
                    {props.user.description}
                </div>
            </div>
        </LinkRouter>
    )
}

export default FriendCard