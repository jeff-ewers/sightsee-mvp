import { useEffect, useState } from "react"
import { getTripsWithPlaces } from "../../services/tripService"
import { Link, useNavigate } from "react-router-dom"
import './TripsList.css'
import trashIcon from '../../assets/trash.png'
import { deleteTrip } from "../../services/tripService"

export const TripsList = ({currentUser}) => {
const [trips, setTrips] = useState([])
const navigate = useNavigate();
useEffect(() => {
    getTripsWithPlaces(currentUser.id).then(userTrips => {setTrips(userTrips)})
}, [currentUser.id, navigate])

document.body.style = 'background: #004F32;';

const removeTrip = (event, tripId) => {
    //prevent Link event on delete button
    event.preventDefault();
    //prevent event from reaching Link
    event.stopPropagation();
    deleteTrip(tripId).then(() => {
        //update component state after deletion
        setTrips(trips.filter(trip => trip.id !== tripId));
    });
    window.alert(`Trip deleted.`)
    window.location.reload();
}

return (

        <article className="trips-list">
        <Link key={0} to={`/trips/new`} 
        state={
            {currentUser: currentUser}
        }>
            <section className="trip">
                <h2>New Trip</h2>
                <h3>Create your experience</h3>
            </section>
        </Link>
            {
                trips?.length ? trips.map(trip => {
                    return (
                        <Link key={trip.id} to={`/trips/${trip.id}`}
                        // pass trip as state for useLocation()
                        state={
                            {trip: trip}
                            }>
                        <section key={trip.id} className="trip">
                            <h2>{trip.name}</h2>
                            <h3>{trip.desc}</h3>
                            <button className='btn-delete' onClick={(event) => removeTrip(event, trip.id)}>
                                <img src={trashIcon} alt='Delete'/>
                            </button>
                        </section>
                        </Link>
                    )
                }) : null
            }
        </article>

)



}