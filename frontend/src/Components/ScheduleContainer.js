import { useEffect } from 'react';
import PatientProfile from './PatientProfile';
import './ScheduleContainer.css';

export default function ScheduleContainer(props){
    let {isDisplaying} = props

    const PatientData = props => {
        const [patientData, setPatientData] = useState([])

        useEffect(() => {
            fetch("/api/appointments",
                { params: {
                    user: props.user
                }})
                .then(res => res.json())
                .then(data => setPatientData(data))
        })
    }
    
    // const dummyJSON = [
    //     {
    //         timeSlot:"10:00 am-11:00 am",
    //         patientName:"Aava",
    //         travelTime:"9min",
    //         description:"kahsgohaf;oaushfiuah sfkhsakdfhkjashdf lkhaskdfhkalshklfhs",
    //         extraInfo:"oasdh fluahs;ofgh;las dfhg kljahsdklhlksdjf"
    //     },
    //     {
    //         timeSlot:"10:00 am-11:00 am",
    //         patientName:"Aava",
    //         travelTime:"9min",
    //         description:"kahsgohaf;oaushfiuah sfkhsakdfhkjashdf lkhaskdfhkalshklfhs",
    //         extraInfo:"oasdh fluahs;ofgh;las dfhg kljahsdklhlksdjf"
    //     },
    //     {
    //         timeSlot:"10:00 am-11:00 am",
    //         patientName:"Aava",
    //         travelTime:"9min",
    //         description:"kahsgohaf;oaushfiuah sfkhsakdfhkjashdf lkhaskdfhkalshklfhs",
    //         extraInfo:"oasdh fluahs;ofgh;las dfhg kljahsdklhlksdjf"
    //     },
    //     {
    //         timeSlot:"10:00 am-11:00 am",
    //         patientName:"Aava",
    //         travelTime:"9min",
    //         description:"kahsgohaf;oaushfiuah sfkhsakdfhkjashdf lkhaskdfhkalshklfhs",
    //         extraInfo:"oasdh fluahs;ofgh;las dfhg kljahsdklhlksdjf"
    //     },
    //     {
    //         timeSlot:"10:00 am-11:00 am",
    //         patientName:"Aava",
    //         travelTime:"9min",
    //         description:"kahsgohaf;oaushfiuah sfkhsakdfhkjashdf lkhaskdfhkalshklfhs",
    //         extraInfo:"oasdh fluahs;ofgh;las dfhg kljahsdklhlksdjf"
    //     },
    //     {
    //         timeSlot:"10:00 am-11:00 am",
    //         patientName:"Aava",
    //         travelTime:"9min",
    //         description:"kahsgohaf;oaushfiuah sfkhsakdfhkjashdf lkhaskdfhkalshklfhs",
    //         extraInfo:"oasdh fluahs;ofgh;las dfhg kljahsdklhlksdjf"
    //     },
    //     {
    //         timeSlot:"10:00 am-11:00 am",
    //         patientName:"Aava",
    //         travelTime:"9min",
    //         description:"kahsgohaf;oaushfiuah sfkhsakdfhkjashdf lkhaskdfhkalshklfhs",
    //         extraInfo:"oasdh fluahs;ofgh;las dfhg kljahsdklhlksdjf"
    //     }
    // ]
    return(
        <div className="schedule-container" style={{display:(isDisplaying?"flex":"none")}}>
            {
                dummyJSON.map((patientInfo,index) => (
                    index == 0?
                    <PatientProfile patientInfo={patientInfo} statusColor={"#5A73C5"}/>
                    :
                    <PatientProfile patientInfo={patientInfo} statusColor={"#B3C3D3"}/>

                ))
            }
        </div>
    )
}