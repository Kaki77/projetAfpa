import {useEffect,useState} from 'react'
import LittleCard from './LittleCard'
import apiClient from '../axios'

function NewsFeed(props) {

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
        apiClient.get('api/post/newsFeed',{
            signal:controller.signal,
        })
        .then(response=>{
            setData(response.data.data)
            console.log(response.data);
            props.loading(false)
        })
    }

    return (
        <>
            {data ?
                <>
                <div>Last Posts</div>
                {data.map((post,index)=><div className='defautl:my-8 last:mt-8 last:pb-8'><LittleCard post={post} key={index} userID={props.userID}/></div>)}
                </>
                : 'There is no posts from people you follow'
            }
        </>
    )
}

export default NewsFeed