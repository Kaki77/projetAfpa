import ChevronLeftIconSolid from '../icons/solid/ChevronLeftIconSolid'
import {useLocation} from 'react-router-dom'

function Header() {

    const location = useLocation()

    return (
        <div className="bg-teal-500 w-full h-[70px] sticky top-0 z-50 mb-5">
            {location.pathname.match('app/post/*') || location.pathname.match('/register') ? <ChevronLeftIconSolid/> : ''}
        </div>
    )
}
export default Header