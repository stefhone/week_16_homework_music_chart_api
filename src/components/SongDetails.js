// if we pass something as props we want to deconstruct it.
// deconstruct song and selectedSongId and loaded as parameters of SongDetails component
const SongDetails = ({song, selectedSongId, loaded})=> {

    // validation needed here, part of the fetch. 
    // when page first loads the react app is looking for SongDetails component and will try to render it.
    // because we're passing the SongDetails component down props ('song') that are the result of a fetch which is asynchronous
    // react doesn't know how long it'll take to complete 
    // this fetch is looking for a 'song' object with data inside it.
    // it takes longer to load this song object than when the page is first loaded, so would result in an error because react wouldn't be able to render this as it won't be loaded in time.

    // if loaded is false then return Loading. if loaded is true then skip this section of code and continue to the next return code below to render it
    if(!loaded){
        return(
            <p>Loading...</p>
        )
    }

    return (
        <>
            <div className="container-song align-center">
                <h2>Number: {selectedSongId +1}</h2>
                <a href={song.feed.entry[selectedSongId]["link"][0]["attributes"]["href"]} target="_blank" rel="noreferrer">
                    <img src={song.feed.entry[selectedSongId]["im:image"][2]["label"]} alt={song.feed.entry[selectedSongId]["title"]["label"]}></img>
                </a>
                <h3>Artist: {song.feed.entry[selectedSongId]["im:artist"]["label"]}</h3>
                <h4>Song: {song.feed.entry[selectedSongId]["im:name"]["label"]}</h4>
            </div>
        </>
    )
}

export default SongDetails;