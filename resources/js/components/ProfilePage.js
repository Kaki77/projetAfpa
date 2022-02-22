import LittleCard from "./LittleCard"

function ProfilePage() {
  return (
    <>
        <div id="header" className="grid grid-rows-5-maxContent justify-content-center items-center text-center">
            <img className="mx-auto w-full h-full max-w-[100px] max-h-[100px] rounded-full" src='https://dummyimage.com/100x100.jpg' alt=''/>
            <div>
                Pseudo ID
            </div>
            <div>
                Member since 10 months
            </div>
            <div>
                Registered on 10th of April 2021
            </div>
            <div>
                Excepteur quis velit adipisicing ullamco non et ea est consectetur labore. Excepteur id veniam cupidatat voluptate non ex culpa sunt ipsum magna aliquip aute. Reprehenderit velit nostrud ea nisi laboris.
            </div>
        </div>  
        <div id="content">
            <LittleCard/>
        </div>
    </>
  )
}

export default ProfilePage