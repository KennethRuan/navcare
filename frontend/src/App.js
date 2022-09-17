import './App.css';
import MainPage from './Components/MainPage.js'
import {useState} from 'react'
import Login from './Components/Login';

function App() {
  let [screenNum, setScreenNum] = useState(0);
  let [patientData, setPatientData] = useState(null);

  return (
    <>
    {screenNum === 0 &&
     <Login setScreenNum={setScreenNum} setPatientData={setPatientData}/>}
    {screenNum === 1 && <MainPage/>}
    </>
  );
}

export default App;

