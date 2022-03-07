import {HeartIcon} from '@heroicons/react/outline'

function HeartIconOutline(props) {
  return (
    <HeartIcon className={`absolute h-full w-full top-0 bottom-0 transition ${props.state ? ' fill-red-500' : 'fill-transparent'}`} onClick={()=>props.like()} />
  )
}

export default HeartIconOutline