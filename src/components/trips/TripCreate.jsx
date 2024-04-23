import { POIForm } from "./POIForm";

export const TripCreate = ({currentUser}) => {
    return (
        <div className="trip-edit__container">
            <div className="trip-edit__title">

            </div>
            <POIForm currentUser={currentUser}
            //functions/state
            />
        </div>
    );
}