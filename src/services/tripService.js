export const getUserTrips = (userId) => {
    return fetch(`http://localhost:8088/trips?userId=${userId}`).then(res => res.json());
}

export const getAllTrips = () => {
    return fetch(`http://localhost:8088/trips`).then(res => res.json());
}