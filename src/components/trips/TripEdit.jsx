import { POIForm } from "./POIForm";
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './TripEdit.css';

export const TripEdit = ({currentUser}) => {
    const location = useLocation();
    var trip = location.state?.trip;
    const [transientTrip, setTransientTrip] = useState({
        name: trip ? trip.name : "",
        desc: trip ? trip.desc : "",
        userId: currentUser.id,
    });
    const [transientPlaces, setTransientPlaces] = useState(trip ? trip.places : []);
    const [isSaveEnabled, setIsSaveEnabled] = useState(false); // State to manage save button enable/disable

    useEffect(() => {
        setTransientTrip(prevState => ({ ...prevState, userId: currentUser.id }));
    }, [currentUser]);

    // Function to handle form submission
    const handleSaveTrip = (event) => {
        event.preventDefault(); // Prevent default form submission
        // TODO: add logic to save the trip
        console.log("Trip saved:", transientTrip);
    };

    // Function to handle input changes and enable/disable save button
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setTransientTrip(prevState => ({ ...prevState, [name]: value }));
        setIsSaveEnabled(transientTrip.name && transientTrip.desc); // Enable save button if both name and desc are filled
    };

    // Function to pass to POI form which adds activity entry for POI to state
    const addPlaceToTransientTrip = (place) => {
        setTransientPlaces(transientPlaces => [...transientPlaces, place]);
    };

    document.body.style = 'background: #004F32;';

    return (
        <div className="trip-edit__container">
            <div className="trip-edit__title">
                <h2>{trip ? `Edit ${trip.name}` : `Edit new trip`}</h2>
            </div>
            <POIForm currentUser={currentUser}
                    addPlaceToTransientTrip={addPlaceToTransientTrip}
            />
            <div className="trip-edit__poi-list">
                {transientPlaces?.length ? transientPlaces.map(place => (
                    <section key={place.id} className="place">
                        <h2>{place.name}</h2>
                        <h3>{place.desc}</h3>
                    </section>
                )) : null}
            </div>
            <div className="trip-edit__save-form">
                
                <form onSubmit={handleSaveTrip}>
                    <h2>Save Trip</h2>
                    <div className="form-group">
                        <label>Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={transientTrip.name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Description:</label>
                        <textarea
                            name="desc"
                            value={transientTrip.desc}
                            onChange={handleInputChange}
                        />
                    </div>
                    <button className='btn-primary' type="submit" disabled={!isSaveEnabled}>Save</button>
                </form>
            </div>
        </div>
    );
};
