import "mapbox-gl/dist/mapbox-gl.css"
import { useState, useMemo } from 'react'
import ReactMapGL from 'react-map-gl'
import { Marker } from "react-map-gl"
import mapboxgl from "mapbox-gl"

const TOKEN = import.meta.env.VITE_MAPBOX_TOKEN

export const Trips = ({currentUser}) => {
    const [newPlace, setNewPlace] = useState(null);
    const [viewport, setViewport] = useState({
      latitude: 36.1718,
      longitude: -86.785,
      width: "100vw",
      height: "100vh",
      pitch: 67,
      zoom: 12 
    })
    const handleDblClick = (e) => {
      setNewPlace({
        lat: e.lngLat.lat,
        lng: e.lngLat.lng
      });
    }
  
    const popup = useMemo(() => {
      return new mapboxgl.Popup().setText('Location found');
    }, [])
  
return (
    <div className="trips">
        <div style={{ width: "100vw", height: "40vh", zIndex: 10}}>
      <ReactMapGL 
      {...viewport}
      mapboxAccessToken={TOKEN}
      mapStyle="mapbox://styles/sightsee-admin/clv65kdd702s401pk1yu1dsi8/draft"
      onViewportChange={(viewport) => setViewport(viewport)}
      onDblClick={handleDblClick}
      >
        {newPlace ? (
          <Marker>
            latitude={newPlace?.lat}
            longitude={newPlace?.lng}
            popup={popup}
          </Marker>
       ) : null}
      </ReactMapGL>
      </div>

    </div>
)
}