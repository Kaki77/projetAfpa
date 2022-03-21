import {useLocation} from 'react-router-dom'
import { useState } from 'react'
import SunIconSolid from '../icons/solid/SunIconSolid'
import MoonIconSolid from '../icons/solid/MoonIconSolid'
import ChevronLeftIconSolid from '../icons/solid/ChevronLeftIconSolid'
import apiClient from '../axios'

function Header() {

    const location = useLocation()

    const [darkMode, setDarkMode] = useState(document.documentElement.classList.contains('dark'))

    function toggleDarkMode() {
        document.documentElement.classList.toggle('dark')
        setDarkMode(!darkMode)
        apiClient.post('/api/user/changeDarkMode')
        .then(response=>{
            console.log(response.data);
        })
    }

    return (
        <div className="bg-blue-500 w-full h-[70px] sticky top-0 z-50 mb-5 text-black flex justify-between">

            <div className='h-[70px] w-[70px] '>
                {location.pathname.match('app/post/*') || location.pathname.match('/register') ? <ChevronLeftIconSolid/> : ''}
            </div>
            
            <div className="h-[70px] w-[70px] rounded-full bg-white border-[10px] border-black">
                <div className="brand-logo text-center mx-auto my-[5px] text-4xl w-10 rounded-full bg-white">
                    J
                </div>
            </div>

            <div className='h-[70px] w-[70px]'>
                <button onClick={()=>toggleDarkMode()}>
                    {darkMode ? <SunIconSolid/> : <MoonIconSolid/>}
                </button>
            </div>

        </div>
    )
}
export default Header