import { useEffect,useState } from 'react';
import PatientProfile from './PatientProfile';
import './ScheduleContainer.css';

export default function ScheduleContainer(props){
    let {isDisplaying,userName} = props
    let [patientData, setPatientData] = useState(null)

        useEffect(() => {
            fetch("/api/appointments",
                { params: {
                    user: props.user
                }})
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    setPatientData(data)})

        },[])

    
    
    return(
        <div className="schedule-container" style={{display:(isDisplaying?"flex":"none")}}>
            {patientData &&
                patientData.map((patientInfo,index) => (
                    index == 0?
                    <PatientProfile patientInfo={patientInfo} statusColor={"#FB8D7E"}/>
                    :
                    <PatientProfile patientInfo={patientInfo} statusColor={"#B3C3D3"}/>

                ))
            }
            {!patientData && <p>loading</p>

            }
        </div>
    )
}