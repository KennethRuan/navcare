import './MapContainer.css';
import {GoogleMap, useLoadScript, Marker, InfoWindow,} from "@react-google-maps/api";


// define literals to avoid lots of rerendering
const libraries = ["places"]; 
const mapContainerStyle={
    width:"100vw", 
    height:"100vh", 
}; 

const center = {
    lat: 43.6532,
    lng: -79.3832,
  };


<<<<<<< HEAD
export default function MapContainer(props){
    let {isDisplaying} = props
    return(
        <div className="map-container" style={{display:(isDisplaying?"flex":"none")}}>
            <span>map container</span>
=======
export default function MapContainer(){

    const{ isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY, 
        libraries,
    }); 

    if(loadError) return "Error loading map"; 
    if(!isLoaded) return "Loading Maps"; 
   
    return(
        <div>
            <GoogleMap mapContainerStyle = {mapContainerStyle} zoom={8} center={center}></GoogleMap>
            
>>>>>>> 0dbdbf79f9146c04202a305687a6905b64882e84
        </div>

    
    )
}