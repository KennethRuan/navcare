import './PatientProfile.css'; 
import React, { useState } from 'react';

export default function PatientProfile(props){
    let {timeSlot,patientName,travelTime,description,extraInfo} = props.patientInfo
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

    return(
        <div className="profile-container">
            <div className="patient-time-container">
                <span className="patient-time">{timeSlot}</span>
            </div>
            <div className="content-container" >

                <div className="patient-status" style={{backgroundColor: statusColor}}></div>

                <div className="profile-picture-container">
                    <div className="profile-picture"><img src='https://i.postimg.cc/bJrf7LTN/nursing-home-concept-illustration-114360-2816.jpg' style={{width:"60px"}}></img></div>
                </div>

                <div className="patient-info-container">
                    <div className="top-content">
                        <span className="patient-name">{patientName}</span>
                        <span className="travel-time">{travelTime}</span>
                    </div>

                    <p className="patient-description">{description}</p>

                    {showExtraInfo && <p>{extraInfo}</p>}

                    <button className="extra-patient-info" onClick={handleShowMore}>{buttonText}</button>
                </div>
            </div>
        </div>
    )
}

