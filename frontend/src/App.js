import logo from './logo.svg';
import './App.css';
import MapContainer from './Components/MapContainer.js';
import ScheduleContainer from './Components/ScheduleContainer.js';
import PatientProfile from './Components/PatientProfile';
import { useState } from 'react';

function App() {

  let [scheduleDisplay, setScheduleDisplay] = useState(false);
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
        <button className="tab" onClick={handleScheduleTabClick}>
          Schedule
        </button>
        <button className="tab" onClick={handleMapTabClick}>
          Map
        </button>
      </div>
    )
  }


  return (
    <div className="App">
      <Nav/>
      <div className="main-content-container">
        <MapContainer isDisplaying={mapDisplay}/>
        <ScheduleContainer isDisplaying={scheduleDisplay}/>
      </div>    
    </div>
  );
}

export default App;

/**let [scheduleDisplay, setScheduleDisplay] = useState(true);
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
        <div className="tab" onClick={handleScheduleTabClick}>
          <span>Schedule</span>
        </div>
        <div className="tab" onClick={handleMapTabClick}>
          <span>Tab</span>
        </div>
      </div>
    )
  }

  return (
    <div className="App">
      <p>hello</p>
      <Nav/>
      <ProfileContainer isDisplaying={scheduleDisplay}/>
      <MapContainer isDisplaying={mapDisplay}/>
      <PatientProfile/>
    </div>
  ); */
