import { useParams } from "react-router-dom"
import { Map } from "../map/Map"

export const TripEdit = ({currentUser}) => {
    const { tripId } = useParams()
    return (
        <div>
            <h2>edit me</h2>
        </div>
    )
}