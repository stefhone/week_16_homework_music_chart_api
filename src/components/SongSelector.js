// if we pass something as props we want to deconstruct it.
// deconstruct onSelectedSongDecrement and onSelectedSongIncrement as parameters of SongSelector component
const SongSelector = ({onSelectedSongDecrement, onSelectedSongIncrement})=> {

    return (
        <>
            <div className="container-button align-center">
                {/* button elements with onClick event which fires onSelectedSongDecrement & onSelectedSongIncrement props */}
                <button onClick={onSelectedSongDecrement}>Previous Song</button>
                <button onClick={onSelectedSongIncrement}>Next Song</button>
            </div>
        </>
    )
}

export default SongSelector;