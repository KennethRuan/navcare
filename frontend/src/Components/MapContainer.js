import './MapContainer.css';
import {GoogleMap, useLoadScript, Marker, InfoWindow,} from "@react-google-maps/api";


// define literals to avoid lots of rerendering
const libraries = ["places"]; 
const mapContainerStyle={
    flex:1, 
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
            <GoogleMap mapContainerStyle = {mapContainerStyle} center={center} zoom={8} options={{ mapId:"a8adcd4aada0b50f" }}></GoogleMap>
        </div>
        
   
    )
}
