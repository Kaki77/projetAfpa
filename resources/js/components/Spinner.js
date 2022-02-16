function Spinner() {
    return (
        <>
            <div className="fixed w-screen h-screen z-10 flex bg-black bg-opacity-40">
                <div className=" justify-content-center h-64 w-64 border-[20px] rounded-full bg-transparent border-slate border-t-blue-500 animate-spin border-box m-auto">
                </div>
            </div>
        </>
    )
}
export default Spinner
