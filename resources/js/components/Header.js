import ChevronLeftIconSolid from '../icons/solid/ChevronLeftIconSolid'
import {useLocation} from 'react-router-dom'

function Header() {

    const location = useLocation()

    return (
        <div className="bg-teal-500 w-full h-[70px] sticky top-0 z-50 mb-5">
            {location.pathname.match('app/post/*') || location.pathname.match('/register') ? <ChevronLeftIconSolid/> : ''}
            <div className="rounded-full mx-auto my-[10px] bg-black w-12">
                <div className="brand-logo text-center mx-auto my-[15px] text-4xl w-10 rounded-full bg-white">
                    J
                </div>
            </div>
        </div>
    )
}
export default Header