import './MainPage.css';
import MapContainer from './MapContainer.js';
import ScheduleContainer from './ScheduleContainer.js';
import { useState } from 'react';

export default function MainPage(props) {
  let {userName} = props;
  let [scheduleDisplay, setScheduleDisplay] = useState(true);
  let [mapDisplay, setMapDisplay] = useState(false);

  function handleScheduleTabClick(){
    setScheduleDisplay(true);
    setMapDisplay(false);
  }
  function handleMapTabClick(){
    setScheduleDisplay(false);
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
      <div className='logo-and-name'>
        <img class="logo" src="https://i.postimg.cc/dtHpH92t/HTN2022-Logo.png" alt="" />
        <span class="app-name">Navcare</span>
      </div>
      <Nav/>
      <div className="main-content-container">
        <ScheduleContainer isDisplaying={scheduleDisplay} userName={userName}/>
        <MapContainer isDisplaying={mapDisplay}/>
      </div>    
    </div>
  );
}


