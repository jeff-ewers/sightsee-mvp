import { POIForm } from "./POIForm";
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import './TripEdit.css'

export const TripEdit = ({currentUser}) => {
    const location = useLocation();
    var trip = location.state?.trip;
    const [transientTrip, setTransientTrip] = useState({
        name: trip ? trip.name : "",
        desc: trip ? trip.desc : "",
        userId: currentUser.id,
    });
    const [transientPlaces, setTransientPlaces] = useState(trip ? trip.places : []);
    useEffect(() => {
        setTransientTrip(prevState => ({ ...prevState, userId: currentUser.id }));
     }, [currentUser]);
    //function to pass to POI form which adds activity entry for POI to state
    const addPlaceToTransientTrip = (place) => {
        setTransientPlaces(transientPlaces => [...transientPlaces, place])

    }
    document.body.style = 'background: #004F32;';

    return (
        <div className="trip-edit__container">
            <div className="trip-edit__title">

            </div>
            <POIForm currentUser={currentUser}
                    addPlaceToTransientTrip={addPlaceToTransientTrip}
            //functions/state
            />
            <div className="trip-edit__poi-list">
            {
                transientPlaces?.length ? transientPlaces.map(place => {
                    return (
                        
                        <section key={place.id} className="place">
                            <h2>{place.name}</h2>
                            <h3>{place.desc}</h3>
                        </section>
                        
                    )
                }) : null
            }
            </div>
            <div className="trip-edit__save-form">

            </div>
        </div>
    );
}