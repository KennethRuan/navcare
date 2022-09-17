import './MainPage.css';
import MapContainer from './MapContainer.js';
import ScheduleContainer from './ScheduleContainer.js';
import { useState } from 'react';

export default function MainPage() {

  let [scheduleDisplay, setScheduleDisplay] = useState(true);
  let [mapDisplay, setMapDisplay] = useState(false);

  function handleScheduleTabClick(e){
    setScheduleDisplay(true);
    setMapDisplay(false);
  }
  function handleMapTabClick(){
    setScheduleDisplay(true);
    setMapDisplay(true);
  }
  function Nav(){
    return(
      <div className="nav">
        <button className={scheduleDisplay?" tab-active":"tab"} onClick={handleScheduleTabClick}>
          Schedule
        </button>
        <button className={mapDisplay?" tab-active":"tab"} onClick={handleMapTabClick}>
          Map
        </button>
      </div>
    )
  }


  return (
    <div className="main-page">
      <Nav/>
      <div className="main-content-container">
        <ScheduleContainer isDisplaying={scheduleDisplay}/>
        <MapContainer isDisplaying={mapDisplay}/>
      </div>    
    </div>
  );
}


