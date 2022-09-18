import './PatientProfile.css'; 
import React, { useState } from 'react';

export default function PatientProfile(props){
    let {start_time,client_name,end_time,appointment_desc,client_notes} = props.patientInfo
    let {statusColor} = props

    let [showExtraInfo,setShowExtraInfo] = useState(false);
    let [buttonText,setButtonText] = useState("Show More ↓");

    function handleShowMore(){
        setShowExtraInfo(!showExtraInfo)

        if (showExtraInfo)
            setButtonText("Show More ↓");
        else 
            setButtonText("Show Less ↑");
    }

    function displayTimeSlot(time){
        let startTimeHour = (time - time%4)/4
        let startTimeMinute = time%4
        let timeHalf = ""

        if (startTimeHour > 12){
            startTimeHour = startTimeHour-12
            timeHalf= "pm"
        }
        else if (startTimeHour == 12){
            timeHalf = "pm"
        }
        else if (startTimeHour > 0){
            timeHalf= "am"
        }
        else{
            startTimeHour = 12
            timeHalf= "am"
        }
        
        if (startTimeMinute ==0){
            startTimeMinute = "00"
        }
        else{
            startTimeMinute *= 15;
        }

        return startTimeHour+":"+startTimeMinute+timeHalf;
    }

    return(
        <div className="profile-container">
            <div className="patient-time-container">
                <span className="patient-time">{displayTimeSlot(start_time)+" - "+displayTimeSlot(end_time)}</span>
            </div>
            <div className="content-container" >

                <div className="patient-status" style={{backgroundColor: statusColor}}></div>

                <div className="profile-picture-container">
                    <div className="profile-picture"><img src='https://i.postimg.cc/bJrf7LTN/nursing-home-concept-illustration-114360-2816.jpg' style={{width:"60px"}}></img></div>
                </div>

                <div className="patient-info-container">
                    <div className="top-content">
                        <span className="patient-name">{client_name}</span>
                        <span className="travel-time">{}</span>
                    </div>

                    <p className="patient-description">{appointment_desc}</p>

                    {showExtraInfo && <p>{client_notes}</p>}

                    <button className="extra-patient-info" onClick={handleShowMore}>{buttonText}</button>
                </div>
            </div>
        </div>
    )
}

