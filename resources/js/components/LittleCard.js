function LittleCard() {
    return (
        <div className="grid grid-rows-[1fr_max-content_1fr] grid-cols-4 items-center justify-items-center my-8">
            <img className="w-full h-full max-w-[100px] max-h-[100px] rounded-full" src='https://dummyimage.com/100x100.jpg' alt=''/>
            <div>
                Pseudo
            </div>
            <div>
                Id
            </div>
            <div>
                delta heure
            </div>
            <div className="col-start-2 col-end-5">
                Do non adipisicing eiusmod esse duis sit amet occaecat aute sint. Consequat non sit proident excepteur. Id occaecat nisi dolore Lorem veniam. Velit est Lorem nisi minim eu adipisicing nulla ex esse magna.
                Consequat labore sint officia anim Lorem aute ea ad pariatur quis nostrud. Cillum sit exercitation minim adipisicing aliqua id et consequat exercitation. Ad enim id reprehenderit exercitation eiusmod.
            </div>
            <div>
                DateTime
            </div>
            <div>
                Comment
            </div>
            <div>
                Share
            </div>
            <div>
                Like
            </div>
        </div>
    )
}

export default LittleCard
