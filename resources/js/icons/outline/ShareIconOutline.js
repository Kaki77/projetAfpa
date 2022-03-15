import {ShareIcon} from '@heroicons/react/outline'

function ShareIconOutline(props) {
  return (
    <ShareIcon className={`absolute h-full w-full top-0 bottom-0 transition ${props.state ? ' fill-black' : 'fill-transparent'}`} onClick={()=>props.share ? props.share() : ''} />
  )
}

export default ShareIconOutline