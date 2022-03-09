import {useEffect,useState} from 'react'
import LittleCard from './LittleCard'
import apiClient from '../axios'

function NewsFeed(props) {

    const [data, setData] = useState([])

    useEffect(() => {
        props.loading(true)
        if(props.sessionCheck()) {
            let controller = new AbortController()
            apiClient.get('api/post/newsFeed',{
                signal:controller.signal,
            })
            .then(response=>{
                setData(response.data.data)
                console.log(response.data);
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
                <div>Last Posts</div>
                {data.map(element=><LittleCard post={element}/>)}
                </>
                : 'There is no posts from people you follow'
            }
        </>
    )
}

export default NewsFeed