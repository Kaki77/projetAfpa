import {HeartIcon} from '@heroicons/react/outline'

function HeartIconOutline(props) {
  return (
    <HeartIcon className={`h-full w-full transition ${props.state ? 'fill-red-500' : 'fill-transparent'}`} onClick={()=>props.like ? props.like() : ''} />
  )
}

export default HeartIconOutline