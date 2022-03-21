import {ShareIcon} from '@heroicons/react/outline'

function ShareIconOutline(props) {
  return (
    <ShareIcon className={`h-full w-full transition ${props.state ? 'fill-black dark:fill-white' : 'fill-transparent'}`} onClick={()=>props.share ? props.share() : ''} />
  )
}

export default ShareIconOutline