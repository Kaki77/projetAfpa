import dayjs from 'dayjs'

function Reply(props) {
    return (
        <div className="relative border border-slate-500 grid grid-rows-[1fr_max-content] grid-cols-3 items-center justify-items-center my-8 pt-8 before:block before:absolute before:top-[-2.01rem] before:w-[3px] before:h-8 before:bg-black">
            <img className="w-full h-full max-w-[100px] max-h-[100px] rounded-full" src='https://dummyimage.com/100x100.jpg' alt=''/>
            <div>
                {props.post.author?.name} #{props.post.author?.id}
            </div>
            <div>
                {dayjs(props.post.created_at).fromNow()}
            </div>
            <div className="col-span-full py-8 w-full px-5">
               {props.post.content}
               <br/>
               <br/>
                {props.post.images ?
                    props.post.images.map((image,index)=>
                        <img key={index} className="mx-auto w-full h-full max-h-[100px]" src={image.url} alt=''/>
                    )
                    : ''
                }
            </div>
        </div>
    )
}
export default Reply