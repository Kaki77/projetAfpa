function FriendCard() {
  return (
    <div className="border border-slate-500 grid grid-rows-1 grid-cols-2 justify-items-center text-center items-center">
        <div id="info" className="relative">
            <img className="mx-auto w-full h-full max-w-[100px] max-h-[100px] rounded-full" src='https://dummyimage.com/100x100.jpg' alt=''/>
            <div>
                Pseudo ID
            </div>
            <div>
                Member since 10 months
            </div>
        </div>
        <div>
            Ut ea sit Lorem eiusmod Lorem ex aute officia. Laborum reprehenderit dolore tempor dolore dolor enim ullamco et anim. Sunt labore non sint mollit sunt aliquip dolore tempor et adipisicing consectetur nulla.
        </div>
    </div>
  )
}

export default FriendCard