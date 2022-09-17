import './PatientProfile.css'; 
import React, { useState } from 'react';

export default function PatientProfile(){

    let [showExtraInfo,setShowExtraInfo] = useState(false);
    let [buttonText,setButtonText] = useState("Show More");

    function handleShowMore(){
        setShowExtraInfo(!showExtraInfo)

        if (showExtraInfo)
            setButtonText("Show More");
        else 
            setButtonText("Show Less");
    }

    return(
        <div className="profile-container">
            <div className="patient-time-container">
                <span className="patient-time">10:00 am-11:00 am</span>
            </div>
            <div className="content-container">

                <div className="profile-picture-container">
                    <div className="profile-picture"></div>
                </div>

                <div className="patient-info-container">
                    <div className="top-content">
                        <span className="patient-name">asdf</span>
                        <span className="travel-time">asdfs</span>
                    </div>

                    <p className="patient-description">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi numquam quaerat doloremque delectus voluptatibus dolorum reiciendis excepturi corporis quos, aliquam voluptatum maiores labore dolorem iusto et cupiditate. Aut facilis dolorem quae sapiente! Consequatur corporis sapiente consectetur doloribus fuga quis, saepe sequi nobis! Quod dignissimos cum quia, animi nesciunt obcaecati aliquam.</p>

                    {showExtraInfo && <p>asfblaiuehgklakgfawlifblawief;al</p>}

                    <button className="extra-patient-info" onClick={handleShowMore}>{buttonText}</button>
                </div>
            </div>
        </div>
    )
}

