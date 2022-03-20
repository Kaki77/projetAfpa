import {useEffect,useState} from 'react'
import apiClient from '../axios'
import Button from './Button'
import ControlledInput from './ControlledInput'
import FriendCard from './FriendCard'

function FollowFeed(props) {

    const [data, setData] = useState([])
    const [search, setSearch] = useState('')
    const [errorSearch, setErrorSearch] = useState([])
    const [searchData, setSearchData] = useState([])

    useEffect(() => {
        props.loading(true)
        let controller = new AbortController()
        props.sessionCheck(fetch,controller)
        return () => {
            controller.abort()
        }
    }, [])

    function fetch(controller) {
        apiClient.get('api/user/followFeed',{
            signal:controller.signal,
        })
        .then(response=>{
            setData(response.data.data)
            console.log(response.data)
            props.loading(false)
        })
    }

    function searchUser() {
        props.loading(true)
        apiClient.get(`api/user/${search}/search`)
        .then(response=>{
            console.log(response.data)
            setSearchData(response.data.data)
            setErrorSearch([])
        })
        .catch(error=>{
            console.log(error.response);
            setErrorSearch([error.response.data.message])
        })
        .finally(()=>{
            props.loading(false)
        })
    }

    return (
        <>
        <div className='text-center'>
            <ControlledInput label={true} type="text" title="Search" value={search} setFunction={setSearch} errors={errorSearch} />
            <Button onClick={searchUser}>Search</Button>
            {searchData ? 
                searchData.map((user,index)=><FriendCard user={user} key={index} />)
                : ''
            }
        </div>
        <hr className='my-8 w-full'/>
        <div className='text-4xl text-center'>Your follows</div>
        {data.length ?
            <>
                {data.map((element,index)=><FriendCard user={element} key={index} />)}
            </>
            : <div className='text-xl text-center'>You follow nobody</div>
        }
        </>
    )
}

export default FollowFeed