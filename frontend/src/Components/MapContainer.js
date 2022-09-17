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



export default function MapContainer(props){
    let {isDisplaying} = props

    const{ isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: "", 
        libraries,
    }); 

    if(loadError) return "Error loading map"; 
    if(!isLoaded) return "Loading Maps"; 

    return(
        <div className="map-container" style={{display:(isDisplaying?"flex":"none")}}>
            <GoogleMap mapContainerStyle = {mapContainerStyle} zoom={8} center={center}></GoogleMap>
        </div>

    
   
    )
}