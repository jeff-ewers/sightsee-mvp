import { getTripActivities } from "./activitiesService";


export const saveTripAndPlaces = async (transientTrip, transientPlaces) => {
    const tripActivities = await getTripActivities(transientTrip?.id);
    // Save the trip
    const isNew = (transientTrip.id === null);
    const endpoint = isNew ?  'http://localhost:8088/trips' : `http://localhost:8088/trips/${transientTrip.id}`;
    const method = isNew ? 'POST' : 'PUT';
    const isNewActivity = (savedPlace, savedTrip) => {
        for (const activity of tripActivities) {
            if ( activity.placeId === savedPlace.id && activity.tripId === savedTrip.id ) {
                return false;
            }
        }
        return true;
    }
    fetch(endpoint, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(transientTrip),
    }) 
    .then(response => response.json())
    .then(savedTrip => {
        // Save new places and create activities
        const promises = transientPlaces.map(place => {
            if (!place.id) {
                // Place is new, save it
                return fetch('http://localhost:8088/places', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(place),
                })
                .then(response => response.json())
                .then(savedPlace => {
                    
                    //If the activity is new
                    if (isNewActivity(savedPlace, savedTrip)) {
                        // Create activity linking the trip and the place
                        return fetch('http://localhost:8088/activities', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                tripId: savedTrip.id,
                                placeId: savedPlace.id,
                        }),
                        })
                    }
                    }
                    
                    
                );
            } else {
                
                // Place already exists, just create activity
                if (isNewActivity(place, savedTrip)) {
                return fetch('http://localhost:8088/activities', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        tripId: savedTrip.id,
                        placeId: place.id,
                    }),
                });
            }
            }
        });

        return Promise.all(promises);
    })
    .then(() => {
        console.log("Trip and places saved successfully.");

    })
    .catch(error => {
        console.error("Error saving trip and places:", error);
    });
};
