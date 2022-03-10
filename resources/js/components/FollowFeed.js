import {useEffect,useState} from 'react'
import apiClient from '../axios'
import FriendCard from './FriendCard'

function FollowFeed(props) {

    const [data, setData] = useState([])

    useEffect(() => {
        props.loading(true)
        let controller = new AbortController()
        props.sessionCheck(fetch,controller)
        return () => {
            controller.abort()
        }
    }, [])

    function fetch(controller) {
        apiClient.get('api/user/follow',{
            signal:controller.signal,
        })
        .then(response=>{
            setData(response.data.data)
            console.log(response.data)
            props.loading(false)
        })
    }

    return (
        <>
        {data ?
            <>
            <div>Follow Feed</div>
            {data.map((element)=><FriendCard user={element} key={element.id}/>)}
            </>
            : 'You follow nobody'
        }
        </>
    )
}

export default FollowFeed