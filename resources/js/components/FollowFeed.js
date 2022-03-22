import {useLayoutEffect,useState,useContext} from 'react'
import apiClient from '../axios'
import Button from './Button'
import ControlledInput from './ControlledInput'
import FriendCard from './FriendCard'
import { Context } from './main'

function FollowFeed() {

    const [data, setData] = useState([])
    const [search, setSearch] = useState('')
    const [errorSearch, setErrorSearch] = useState([])
    const [searchData, setSearchData] = useState([])
    const {loading,sessionCheck,loadState} = useContext(Context)

    useLayoutEffect(() => {
        loading(true)
        let controller = new AbortController()
        sessionCheck(fetch,controller)
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
            loading(false)
        })
    }

    function searchUser() {
        loading(true)
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
            loading(false)
        })
    }

    return (
        <>
        {!loadState ?
            <>
                <div className='text-center'>
                    <h1 className='title text-4xl text-center'>Search</h1>
                    <ControlledInput type="text" title="Search" value={search} setFunction={setSearch} errors={errorSearch} />
                    <Button onClick={searchUser}>Search</Button>
                    {searchData ? 
                        searchData.map((user,index)=><><hr className='my-8 w-1/2 mx-auto'/><FriendCard user={user} key={index} /></>)
                        : ''
                    }
                </div>
                <hr className='my-8 w-full'/>
                <div className='text-4xl text-center title'>Your follows</div>
                {data.length ?
                    <>
                        {data.map((user,index)=><FriendCard user={user} key={index} />)}
                    </>
                    : <div className='text-xl text-center'>You follow nobody</div>
                }
            </> :''
        }
        </>
    )
}

export default FollowFeed