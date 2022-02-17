function Home(props) {

    return (
        <>
            <div className="flex flex-row h-1/10 bg-teal-500">
                <button className="h-full w-full bg-red-500">Home</button>
                <button className="h-full w-full bg-blue-500">Friends</button>
                <button className="h-full w-full bg-green-500">My Profile</button>
                <button className="h-full w-full bg-yellow-500">Logout</button>
            </div>
        </>
    )
}

export default Home