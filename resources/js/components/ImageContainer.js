import {useReducer,useEffect} from 'react'

function ImageContainer(props) {
    const initial_state = {
        currentImage : 0,
    }

    const ACTIONS = {
        NEXT:'NEXT',
        PREVIOUS : 'PREVIOUS',
    }
    
    function reducer(state,{type,payload}) {
        switch(type) {
            case ACTIONS.NEXT :
                return {
                    ...state,
                    currentImage : (state.currentImage + 1 >= props.images.length ? 0 : state.currentImage + 1),
                }
            case ACTIONS.PREVIOUS :
                return {
                    ...state,
                    currentImage : (state.currentImage - 1 < 0 ? props.images.length -1 : state.currentImage - 1),
                }
            default :
                //
        }
    }

    const [{currentImage}, dispatch] = useReducer(reducer,initial_state)

    useEffect(() => {
        Array.from(document.querySelector(`#carousel${props.containerId}`).querySelectorAll('img')).forEach((element,index)=>{
            index == currentImage ? (element.classList.remove('hidden'),element.classList.add('block')) : (element.classList.remove('block'),element.classList.add('hidden'))
        })
        
        return () => {
            //
        }
    }, [currentImage])

    return (
        <div className="relative" id={'carousel'+props.containerId}>
            {props.images.map((image,index)=>
                <img key={index} src={image.url} className="w-full h-[250px]"/>
            )}

            {props.images.length > 1 ?
                <>
                    <div className='absolute px-5 left-1 top-1/2 z-10 bg-black/50 text-white text-xl' onClick={()=>dispatch({type : ACTIONS.PREVIOUS})}>
                        &lt;
                    </div>
                    <div className='absolute px-5 right-1 top-1/2 z-10 bg-black/50 text-white text-xl' onClick={()=>dispatch({type : ACTIONS.NEXT})}>
                        &gt;
                    </div>
                </> :''
            }
        </div>
    )
}
export default ImageContainer