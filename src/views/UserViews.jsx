import { Outlet } from "react-router-dom"
import { Routes, Route } from "react-router-dom"
import { NavBar } from "../components/nav/NavBar.jsx"
import { Trips } from "../components/trips/Trips.jsx"
import { TripEdit } from "../components/trips/TripEdit.jsx"
import { Home } from "../components/home/Home.jsx"
import { TripCreate } from "../components/trips/TripCreate.jsx"

export const UserViews = ({currentUser}) => {
    return (
        <Routes> 
        <Route path="/" element={
            <>
            <NavBar />
            <Outlet />
            </>
        }>
        <Route index element={<Home currentUser={currentUser}/>}/>
        <Route path="trips/*">
          <Route index element={<Trips currentUser={currentUser} />} />
          <Route path=":tripId" element={<TripEdit currentUser={currentUser} />} />
          <Route path="new" element={<TripCreate currentUser={currentUser} />} />
        </Route>
        </Route>
        </Routes>
    )
    }