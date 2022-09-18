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
    },[])

    
    
    return(
        <div className="schedule-container" style={{display:(isDisplaying?"flex":"none")}}>
            {patientData &&
                patientData.map((patientInfo,index) => (
                    index == 0?
                    <PatientProfile patientInfo={patientInfo} statusColor={"#FB8D7E"}/>
                    :
                    <PatientProfile patientInfo={patientInfo} statusColor={"#F6D2CD"}/>

                ))
            }
            {!patientData && <p>loading</p>

            }
        </div>
    )
}