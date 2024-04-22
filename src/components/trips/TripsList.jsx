import { useEffect, useState } from "react"
import { getTripsWithPlaces } from "../../services/tripService"
import { Link, useNavigate } from "react-router-dom"
import './TripsList.css'

export const TripsList = ({currentUser}) => {
const [trips, setTrips] = useState([])
useEffect(() => {
    getTripsWithPlaces(currentUser.id).then(userTrips => {setTrips(userTrips)})
}, [currentUser.id])

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
                        state={
                            //todo: trip needs ancillary data, pois, etc.
                            {trip: trip}
                            }>
                        <section key={trip.id} className="trip">
                            <h2>{trip.name}</h2>
                            <h3>{trip.desc}</h3>
                        </section>
                        </Link>
                    )
                }) : null
            }
        </article>

)



}