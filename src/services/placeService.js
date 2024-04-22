export const getTripPlaces = (tripId) => {
    return fetch(`http://localhost:8088/activities?tripId=${tripId}&_expand=trip&_expand=place`).then(res => res.json());
}