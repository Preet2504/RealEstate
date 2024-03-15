import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './app.css'; // Import your CSS file

function App() {
    const [sqft, setSqft] = useState('1000');
    const [bhk, setBhk] = useState('2');
    const [bathrooms, setBathrooms] = useState('2');
    const [location, setLocation] = useState('');
    const [locations, setLocations] = useState([]);
    const [estimatedPrice, setEstimatedPrice] = useState('');

    useEffect(() => {
        fetchLocations();
    }, []);

    const fetchLocations = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/get_location_names');
            setLocations(response.data.locations);
        } catch (error) {
            console.error('Failed to fetch locations:', error);
        }
    };

    const onClickedEstimatePrice = async () => {
        console.log('Estimate price button clicked');
        try {
            const formData = new FormData();
            formData.append('total_sqft', parseFloat(sqft));
            formData.append('location', location);
            formData.append('bhk', parseInt(bhk));
            formData.append('bath', parseInt(bathrooms));
    
            const response = await axios.post('http://127.0.0.1:5000/predict_home_price', formData);
            setEstimatedPrice(response.data.estimated_price.toString() + ' Lakh');
        } catch (error) {
            console.error('Failed to estimate price:', error);
        }
    };

    return (
        <div>
            <div className="img"></div>
            <form className="form">
                <h2>Area (Square Feet)</h2>
                <input
                    className="area"
                    type="text"
                    id="uiSqft"
                    name="Squareft"
                    value={sqft}
                    onChange={(e) => setSqft(e.target.value)}
                />
                <h2>BHK</h2>
                <div className="switch-field">
                    {[1, 2, 3, 4, 5].map((value) => (
                        <React.Fragment key={value}>
                            <input
                                type="radio"
                                id={`radio-bhk-${value}`}
                                name="uiBHK"
                                value={value}
                                checked={parseInt(bhk) === value}
                                onChange={() => setBhk(value.toString())}
                            />
                            <label htmlFor={`radio-bhk-${value}`}>{value}</label>
                        </React.Fragment>
                    ))}
                </div>
            </form>
            <form className="form">
                <h2>Bath</h2>
                <div className="switch-field">
                    {[1, 2, 3, 4, 5].map((value) => (
                        <React.Fragment key={value}>
                            <input
                                type="radio"
                                id={`radio-bath-${value}`}
                                name="uiBathrooms"
                                value={value}
                                checked={parseInt(bathrooms) === value}
                                onChange={() => setBathrooms(value.toString())}
                            />
                            <label htmlFor={`radio-bath-${value}`}>{value}</label>
                        </React.Fragment>
                    ))}
                </div>
                <h2>Location</h2>
                <div>
                    <select
                        className="location"
                        id="uiLocations"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    >
                        <option value="" disabled selected>
                            Choose a Location
                        </option>
                        {locations.map((loc, index) => (
                            <option key={index} value={loc}>
                                {loc}
                            </option>
                        ))}
                    </select>
                </div>
                <button className="submit" onClick={onClickedEstimatePrice} type="button">
                    Estimate Price
                </button>
                <div id="uiEstimatedPrice" className="result">
                    <h2>{estimatedPrice}</h2>
                </div>
            </form>
        </div>
    );
}

export default App;
