import './MapContainer.css';

export default function MapContainer(props){
    let {isDisplaying} = props
    return(
        <div className="map-container" style={{display:(isDisplaying?"flex":"none")}}>
            <span>map container</span>
        </div>
    )
}