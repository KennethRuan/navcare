import { useEffect, useState } from 'react';
import PatientProfile from './PatientProfile';
import './ScheduleContainer.css';
import axios from 'axios';

export default function ScheduleContainer(props){
    let {isDisplaying,userName} = props
    let [patientData, setPatientData] = useState("")

        useEffect(() => {
            console.log(userName)
            axios.request({
                method: 'GET',
                url: '/api/appointments',
                params: {
                  user: userName
                },
              }).then(res => {
                console.log(res.data)
                setPatientData(res.data)
              }); 


            // fetch("/api/appointments",
            //     { params: {
            //         user: props.userName
            //     }})
            //     .then(res => res.json())
            //     .then(data => {
            //         console.log(data)
            //         setPatientData(data)
            //     })

        },[])

    
    
    return(
        <div className="schedule-container" style={{display:(isDisplaying?"flex":"none")}}>
            {patientData &&
                patientData.map((patientInfo,index) => (
                    index == 0?
                    <PatientProfile patientInfo={patientInfo} statusColor={"#5A73C5"}/>
                    :
                    <PatientProfile patientInfo={patientInfo} statusColor={"#B3C3D3"}/>

                ))
            }
            {!patientData && <p>loading</p>

            }
        </div>
    )
}