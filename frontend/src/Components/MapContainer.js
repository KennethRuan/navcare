import './MapContainer.css'
import { useRef, useState, useEffect } from 'react'
import routes from "./routes.json";
import axios from 'axios';


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
  let {isDisplaying, userName} = props
  // const { isLoaded, loadError } = useLoadScript({
  //   googleMapsApiKey: 'AIzaSyAeufE-n5QFRUQU3TlBoKXxqNHmmCl-oEw',
  //   libraries
  // })

  const [map, setMap] = useState(/** @type google.maps.Map */ null)
  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [distance, setDistance] = useState('')
  const [duration, setDuration] = useState('')
  const [routesData, setRoutesData] = useState(null)
  useEffect(() => {
    console.log(userName)
    axios.request({
      method: 'GET',
      url: '/api/appointments',
      params: {
        user: userName
      },
    }).then(res => {
      // console.log(res.data.json());
      console.log(res.data);
      const newArray = res.data.map(({ latitude, longitude }) => ({
        lat: parseFloat(latitude),
        lng: parseFloat(longitude),
      }));

      setRoutesData(newArray);
    }); 
  }, []);

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef()
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destiantionRef = useRef()
 
  // const routesCopy = {
  //   location: { lat: routesData.lat, lng: routesData.lng },
  // };

  // const routesCopy = routesData.map(route => { //get a json file and map it out into an array of objects 
  //   return {
  //     location: { lat: routesData.latitude, lng: routesData.longitude },
  //     stopover: true
  //   };
  // });
  
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [waypoints, setWaypoints] = useState(null);
  
  // console.log(routesCopy);
  
  // useEffect(() => {
  //   // console.log(loadError);
  //   console.log("isloaded", isLoaded);
  //   // console.log(loadError);
  //   if(isLoaded){
  //   }
  // }, [isLoaded]);
  
  // useEffect(() => {
  //   calculateRoute();
  // }, [map]);

  useEffect(() => {
    console.log("Here"); 
    if(routesData){
      console.log(routesData);
      calculateRoute();
    }
    console.log(map);
    
  }, [map,routesData]);

  // if(loadError) return "Error loading map";
  // if(!isLoaded) return "Loading Maps";

  function calculateRoute () {
    const routesIndex = routesData.length-1;
    setOrigin({lat: 43.461629, lng: -80.516897}); //change to home address of psw 
    console.log(routesData);
    if(routesData.length==1){
      setDestination(routesData[0]);  
    }else{ 
      setDestination(routesData[routesData.length-1]); 
      setWaypoints(routesData.slice(0,-1).map((entry) => ({
        location: {...entry},
      })));
    }
    console.log(routesData.slice(0,-1));
  
  }

  useEffect(() => {
    console.log("HEREERE");

    async function setup() {
      const directionsService = new google.maps.DirectionsService() 
      console.log(directionsService);
      const results = await directionsService.route({
        origin: origin,
        destination: destination,
        // eslint-disable-next-line no-undef
        travelMode: google.maps.TravelMode.DRIVING, 
        waypoints: waypoints,
      })
      console.log(results);
      console.log("ROUTE CALCULATED")
      setDirectionsResponse(results);
    }
    setup();
  }, [origin, destination, waypoints])

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
      <div style={{ height: "300px", width: "100%" , }}>
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{ width: '100%', height: '100%',  }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
            mapId:"a8adcd4aada0b50f",
            disableDefaultUI: true,
            clickableIcons: false,
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