import { POIForm } from "./POIForm";
import { useState, useEffect } from 'react'

export const TripEdit = ({currentUser}) => {
    const [transientTrip, setTransientTrip] = useState({});
    const [transientPlaces, setTransientPlaces] = useState([]);
    return (
        <div className="trip-edit__container">
            <div className="trip-edit__title">

            </div>
            <POIForm currentUser={currentUser}
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