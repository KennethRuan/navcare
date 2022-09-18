import './MapContainer.css'
import { useRef, useState, useEffect } from 'react'
import routes from "./routes.json";

import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
  DirectionsRenderer,
  withGoogleMap
} from '@react-google-maps/api'

let google = window.google;

// define literals to avoid lots of rerendering
const libraries = ["places"]; 

const center = {
  lat: 43.6532,
  lng: -79.3832
}

export default function MapContainer (props) {
  let {isDisplaying} = props
  // const { isLoaded, loadError } = useLoadScript({
  //   googleMapsApiKey: 'AIzaSyAeufE-n5QFRUQU3TlBoKXxqNHmmCl-oEw',
  //   libraries
  // })

  const [map, setMap] = useState(/** @type google.maps.Map */ null)
  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [distance, setDistance] = useState('')
  const [duration, setDuration] = useState('')

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef()
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destiantionRef = useRef()
 
  const routesCopy = routes.map(route => { //get a json file and map it out into an array of objects 
    return {
      location: { lat: route.location.lat, lng: route.location.lng },
      stopover: true
    };
  });
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [waypoints, setwaypoints] = useState(null);
  
  // console.log(routesCopy);
  
  // useEffect(() => {
  //   // console.log(loadError);
  //   console.log("isloaded", isLoaded);
  //   // console.log(loadError);
  //   if(isLoaded){
  //   }
  // }, [isLoaded]);
  
  useEffect(() => {
    calculateRoute();
  }, []);

  useEffect(() => {
    console.log(map);
  }, [map]);

  // if(loadError) return "Error loading map";
  // if(!isLoaded) return "Loading Maps";

  async function calculateRoute () {

    if(routesCopy.length==1){
      setOrigin(routesCopy[0]); //change to home address of psw
      setDestination(routesCopy[0]);   
    }else{
      setOrigin(routesCopy[0]); 
      setDestination(routesCopy[routesCopy.length-1]); 
      setwaypoints(routesCopy.slice(0, -1));
    }
  
    // setDistance(results.routes[0].legs[0].distance.text)
    // setDuration(results.routes[0].legs[0].duration.text)
  }

  useEffect(() => {
    async function setup() {
      const directionsService = new google.maps.DirectionsService() 
      const results = await directionsService.route({
        origin: routesCopy[0],
        destination: routesCopy[routesCopy.length-1],
        // eslint-disable-next-line no-undef
        travelMode: google.maps.TravelMode.DRIVING, 
        waypoints: routesCopy,
      })
      console.log(results);
      setDirectionsResponse(results);
    }
    setup();
  }, [origin, destination, waypoints])

  function displayRoutes(){

  }

  function clearRoute () {
    setDirectionsResponse(null)
    setDistance('')
    setDuration('')
    originRef.current.value = ''
    destiantionRef.current.value = ''
  }

  return (
    <div className="map-container" style={{display:(isDisplaying?"flex":"none")}}>
        <span className="map-top-text">Next Appointment:</span>
      <div style={{ height: "300px", width: "100%" }}>
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{ width: '100%', height: '100%' }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
            mapId:"a8adcd4aada0b50f",
          }}
          onLoad={map => setMap(map)}
        >
          {/* <Marker position={center} /> */}
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      </div>
    </div>
  )
}
