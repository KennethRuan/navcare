import PatientProfile from './PatientProfile';
import './ScheduleContainer.css';

export default function ScheduleContainer(props){
    let {isDisplaying} = props

    //dummy JSON
    const dummyJSON = [
        {
            timeSlot:"10:00 am-11:00 am",
            patientName:"Aava",
            travelTime:"9min",
            description:"kahsgohaf;oaushfiuah sfkhsakdfhkjashdf lkhaskdfhkalshklfhs",
            extraInfo:"oasdh fluahs;ofgh;las dfhg kljahsdklhlksdjf"
        },
        {
            timeSlot:"10:00 am-11:00 am",
            patientName:"Aava",
            travelTime:"9min",
            description:"kahsgohaf;oaushfiuah sfkhsakdfhkjashdf lkhaskdfhkalshklfhs",
            extraInfo:"oasdh fluahs;ofgh;las dfhg kljahsdklhlksdjf"
        },
        {
            timeSlot:"10:00 am-11:00 am",
            patientName:"Aava",
            travelTime:"9min",
            description:"kahsgohaf;oaushfiuah sfkhsakdfhkjashdf lkhaskdfhkalshklfhs",
            extraInfo:"oasdh fluahs;ofgh;las dfhg kljahsdklhlksdjf"
        },
        {
            timeSlot:"10:00 am-11:00 am",
            patientName:"Aava",
            travelTime:"9min",
            description:"kahsgohaf;oaushfiuah sfkhsakdfhkjashdf lkhaskdfhkalshklfhs",
            extraInfo:"oasdh fluahs;ofgh;las dfhg kljahsdklhlksdjf"
        },
        {
            timeSlot:"10:00 am-11:00 am",
            patientName:"Aava",
            travelTime:"9min",
            description:"kahsgohaf;oaushfiuah sfkhsakdfhkjashdf lkhaskdfhkalshklfhs",
            extraInfo:"oasdh fluahs;ofgh;las dfhg kljahsdklhlksdjf"
        },
        {
            timeSlot:"10:00 am-11:00 am",
            patientName:"Aava",
            travelTime:"9min",
            description:"kahsgohaf;oaushfiuah sfkhsakdfhkjashdf lkhaskdfhkalshklfhs",
            extraInfo:"oasdh fluahs;ofgh;las dfhg kljahsdklhlksdjf"
        },
        {
            timeSlot:"10:00 am-11:00 am",
            patientName:"Aava",
            travelTime:"9min",
            description:"kahsgohaf;oaushfiuah sfkhsakdfhkjashdf lkhaskdfhkalshklfhs",
            extraInfo:"oasdh fluahs;ofgh;las dfhg kljahsdklhlksdjf"
        }
    ]
    return(
        <div className="schedule-container" style={{display:(isDisplaying?"flex":"none")}}>
            {
                dummyJSON.map((patientInfo,index) => (
                    index == 0?
                    <PatientProfile patientInfo={patientInfo} statusColor={"red"}/>
                    :
                    <PatientProfile patientInfo={patientInfo} statusColor={"gray"}/>

                ))
            }
        </div>
    )
}