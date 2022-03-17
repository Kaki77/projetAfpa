import Button from "./Button"

function Flash(props) {

    return (
        <div className='fixed top-0 left-0 w-full h-full pt-[100px] z-50 overflow-auto bg-black/50' onClick={()=>props.setFlash('')}>
            <div className="m-auto p-5 border border-slate-200 w-4/5 bg-white text-center">
                <p className="text-xl">{props.children}</p>
                <Button className="w-24 my-8" onClick={()=>props.setFlash('')}>OK</Button>
            </div>
        </div>
    )
}
export default Flash