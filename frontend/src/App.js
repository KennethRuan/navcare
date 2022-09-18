import './App.css';
import MainPage from './Components/MainPage.js'
import {useState} from 'react'
import Login from './Components/Login';
import DoctorForm from './Components/DoctorForm';

function App() {
  let [screenNum, setScreenNum] = useState(0);
  let [userName, setUserName] = useState(null);

  return (
    <>
    {screenNum === 0 && <Login setScreenNum={setScreenNum} setUserName={setUserName}/>}
    {screenNum === 1 && <MainPage userName={userName}/>}
    {screenNum == 2 && <DoctorForm/>}
    </>
  );
}

export default App;

