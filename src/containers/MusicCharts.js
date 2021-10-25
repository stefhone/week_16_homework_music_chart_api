import { useEffect, useState } from "react";
import SongDetails from "../components/SongDetails";
import SongSelector from "../components/SongSelector";
import SongList from "../components/SongList";

const MusicCharts = () => {

    // song initially set as an empty object
    const [song, setSong] = useState({});
    // selectedSongId initially set as 0 - get the first top 20 song from the iTunes API. 
    // The API can take in a number and return song details. 
    // We want to be able to change 'selectedSongId' so we use 'setSelectedSongId' method to do this
    const [selectedSongId, setSelectedSongId]= useState(0);
    // loaded state initially set as false (boolean)
    // We want to be able to change 'loaded' so we use 'setLoaded' method to do this
    const [loaded, setLoaded] = useState(false);

    // if it's called, do a fetch for us.
    const getSong = () => {
        console.log('getting song information');
        // this is the endpoint for accessing/fetching the iTunes API
        // what you add on to the end point if you want to get a specific song is an id.
        // using back ticks and string interpolation to say whatever the selectedSongId is then add that onto the end of my query.
        fetch(`https://itunes.apple.com/gb/rss/topsongs/limit=20/json`)
        .then(response => response.json())
        .then(data => setSong(data))
        // once we're finished fetching the data fully then change 'loaded' to true (boolean)
        // general rule you have to put validation around fetches.
        .then(() => setLoaded(true));
    }

    // useEffect function gets executed after a re-render
    // useEffect watches for anytime selectedSongId changes state then run getSong() function 
    // the second argument, 'selectedSongId', is passed as an array
    // this is the point when we call the iTunes API
    useEffect (() => {
        getSong()
    }, [selectedSongId])

    // function that lets us increment the selected song by 1
    const incrementSelectedSong = () => {
        // setup validation to increment selectedSongId by 1 only if nextSongId is less than or equal to 20
        const nextSongId = selectedSongId + 1;

        if (nextSongId <= 19) {
            setSelectedSongId(nextSongId);
        }
    }

    // function that lets us decrement the selected song by 1
    const decrementSelectedSong = () => {
        // setup validation to decrement selectedSongId by 1 only if nextSongId is greater than or equal to 0
        const nextSongId = selectedSongId - 1;

        if (nextSongId >= 0) {
            setSelectedSongId(nextSongId);
        }
    }

    return (
        <>
            <div className="logo-apple-music align-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="83" height="20" viewBox="0 0 83 20" version="1.1" class="web-navigation__logo-vector" role="presentation"><path fill-rule="nonzero" stroke="none" stroke-width="1" d="M34.752 19.746V6.243h-.088l-5.433 13.503h-2.074L21.711 6.243h-.087v13.503h-2.548V1.399h3.235l5.833 14.621h.1L34.064 1.4h3.248v18.347h-2.56zm16.649 0h-2.586v-2.263h-.062c-.725 1.602-2.061 2.504-4.072 2.504-2.86 0-4.61-1.894-4.61-4.958V6.37h2.698v8.125c0 2.034.95 3.127 2.81 3.127 1.95 0 3.124-1.373 3.124-3.458V6.37H51.4v13.376zm7.394-13.618c3.06 0 5.046 1.73 5.134 4.196h-2.536c-.15-1.296-1.087-2.11-2.598-2.11-1.462 0-2.436.724-2.436 1.793 0 .839.6 1.41 2.023 1.741l2.136.496c2.686.636 3.71 1.704 3.71 3.636 0 2.442-2.236 4.12-5.333 4.12-3.285 0-5.26-1.64-5.509-4.183h2.673c.25 1.398 1.187 2.085 2.836 2.085 1.623 0 2.623-.687 2.623-1.78 0-.865-.487-1.373-1.924-1.704l-2.136-.508c-2.498-.585-3.735-1.806-3.735-3.75 0-2.391 2.049-4.032 5.072-4.032zM66.1 2.836c0-.878.7-1.577 1.561-1.577.862 0 1.55.7 1.55 1.577 0 .864-.688 1.576-1.55 1.576a1.573 1.573 0 0 1-1.56-1.576zm.212 3.534h2.698v13.376h-2.698V6.37zm14.089 4.603c-.275-1.424-1.324-2.556-3.085-2.556-2.086 0-3.46 1.767-3.46 4.64 0 2.938 1.386 4.642 3.485 4.642 1.66 0 2.748-.928 3.06-2.48H83C82.713 18.067 80.477 20 77.317 20c-3.76 0-6.208-2.62-6.208-6.942 0-4.247 2.448-6.93 6.183-6.93 3.385 0 5.446 2.213 5.683 4.845h-2.573zM10.824 3.189c-.698.834-1.805 1.496-2.913 1.398-.145-1.128.41-2.33 1.036-3.065C9.644.662 10.848.05 11.835 0c.121 1.178-.336 2.33-1.01 3.19zm.999 1.619c.624.049 2.425.244 3.578 1.98-.096.074-2.137 1.272-2.113 3.79.024 3.01 2.593 4.012 2.617 4.037-.024.074-.407 1.419-1.344 2.812-.817 1.224-1.657 2.422-3.002 2.447-1.297.024-1.73-.783-3.218-.783-1.489 0-1.97.758-3.194.807-1.297.048-2.28-1.297-3.097-2.52C.368 14.908-.904 10.408.825 7.375c.84-1.516 2.377-2.47 4.034-2.495 1.273-.023 2.45.857 3.218.857.769 0 2.137-1.027 3.746-.93z"></path></svg>
            </div>

            {/* passing props to the SongDetails component 'song' and 'loaded' and 'selectedSongId' */}
            <SongDetails 
             song={song}
             loaded={loaded}
             selectedSongId={selectedSongId}
            />

            {/* passing props to the SongSelector component 'onSelectedSongIncrement' and 'onSelectedSongDecrement'
            these props are declared as arrow function which call the increment and decrement functions we declared above */}
            <SongSelector 
             onSelectedSongDecrement = {() => decrementSelectedSong()} 
             onSelectedSongIncrement = {() => incrementSelectedSong()}
            />

            <hr></hr>

            <SongList 
             song={song}
             loaded={loaded}
             selectedSongId={selectedSongId}
            />
        </>
    )
} 

export default MusicCharts;


// In summary, 
// 1. Functions that have been passed down as props to SongSelector component are responsible for increasing and decreasing the song ID.
// 2. useEffect is watching for song ID being changed state, increase or decrease. Anytime song ID updates
// 3. Anytime song ID updates it calls getSong() method which does our fetch to the iTunes API