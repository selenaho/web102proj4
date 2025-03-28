import { use, useState } from 'react'
import './App.css'

function App() {
      
    const makeQuery = () => {
        let key = "live_0GcP0uXfE7BXn3nparH6XxfShQ22ZHbdCodhkKQV8Y7BBsmHE8cRPjd0WnKUxVkT";
        let query = `https://api.thecatapi.com/v1/images/search?limit=10&size=med&has_breeds=true&order=RANDOM&api_key=${key}`;
        callAPI(query).catch(console.error);
    }

    const [currentImage, setCurrentImage] = useState(null);
    const [currentName, setCurrentName] = useState("");
    const [currentTemperament, setCurrentTemperament] = useState("");
    const [currentDescription, setCurrentDescription] = useState("");

    const [banList, setBanList] = useState([]);
    const updateBanList = (name) => {
        if(banList.includes(name)) {
            //name is already banned so unban it
            setBanList(banList.filter(item => item !== name));
        }
        else {
            //name isn't banned so ban it
            setBanList([...banList, name]);
        }
    }

    const callAPI = async (query) => {
        const response = await fetch(query);
        const json = await response.json();
        if (json == null) {
            alert("Oops! Something went wrong with that query, let's try again!")
        }
        else {
            let currIndex = 0;
            while (currIndex < json.length && banList.includes(json[currIndex].breeds[0].name)) {
                currIndex++;
            }
            if (currIndex < json.length) {
                setCurrentName(json[currIndex].breeds[0].name);
                setCurrentImage(json[currIndex].url);
                setCurrentDescription(json[currIndex].breeds[0].description);
                setCurrentTemperament(json[currIndex].breeds[0].temperament);
            } else {
                alert("No available breeds found that are not in the ban list.");
            }
            //console.log(currentImage);
            //reset();
        }
        
        console.log(json);
    }

    return (
        <div className='container'>
            <div className='main'>
                <h1>Cats!</h1>
                <p>made using thecatapi</p>
                {currentImage ? (
                    <img
                    src={currentImage}
                    alt="Image returned"
                    />
                ) : (
                    <div> </div>
                )}
                <br></br>
                {currentName ? (
                    <button type='submit' onClick={()=> updateBanList(currentName)}>{currentName}</button>
                ) : (
                    <div> </div>
                )}
                <br></br>
                {currentTemperament ? (
                    <h5>{currentTemperament}</h5>
                ) : (
                    <div> </div>
                )}
                {currentDescription ? (
                    <p>{currentDescription}</p>
                ) : (
                    <div> </div>
                )}
                <button type='submit' onClick={makeQuery}>Next</button>
            </div>
            <div className='side'>
                <h3>Currently Banned:</h3>
                {banList.map((ban) => (
                    <button type='submit' onClick={() => updateBanList(ban)}>{ban}</button>
                ))}
            </div>
        </div>
    )
}

export default App
