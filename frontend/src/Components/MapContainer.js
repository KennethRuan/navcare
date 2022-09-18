import './MapContainer.css';
import {GoogleMap, useLoadScript, Marker, InfoWindow,} from "@react-google-maps/api";


// define literals to avoid lots of rerendering
const libraries = ["places"]; 
const mapContainerStyle={
    height:"300px",
    width:"100%"

}; 

const center = {
    lat: 43.6532,
    lng: -79.3832,
  };




export default function MapContainer(props){
    let {isDisplaying} = props

    const{ isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: "AIzaSyAeufE-n5QFRUQU3TlBoKXxqNHmmCl-oEw", 
        libraries,
    }); 

    if(loadError) return "Error loading map"; 
    if(!isLoaded) return "Loading Maps"; 

    return(
        <div className="map-container" style={{display:(isDisplaying?"flex":"none")}}>
            <span>Next Appointment:</span>
            <GoogleMap mapContainerStyle = {mapContainerStyle} center={center} zoom={8} options={{ mapId:"a8adcd4aada0b50f" }}></GoogleMap>
            {/* <hr style={{background:"#DCE2E8", height:"2px"}} /> */}
        </div>
        
   
    )
}
