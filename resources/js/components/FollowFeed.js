import {useEffect,useState} from 'react'
import apiClient from '../axios'
import FriendCard from './FriendCard'

function FollowFeed(props) {

    const [data, setData] = useState([])

    useEffect(() => {
        props.loading(true)
        if(props.sessionCheck()) {
            let controller = new AbortController()
            apiClient.get('api/user/follow',{
                signal:controller.signal,
            })
            .then(response=>{
                setData(response.data.data)
                console.log(response.data)
                props.loading(false)
            })
            return () => {
                controller.abort()
            }
        }
    }, [])

    return (
        <>
        {data ?
            <>
            <div>Follow Feed</div>
            {data.map((element)=><FriendCard user={element}/>)}
            </>
            : 'You follow nobody'
        }
        </>
    )
}

export default FollowFeed