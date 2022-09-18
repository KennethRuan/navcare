import'./DoctorForm.css';
import {useState} from 'react'

export default function(){
    let [dataObj,setDataObj] = useState({
        name:"",
        hour:0,
        minute:0,
        endTime:0,
        address:"",
        description:"",
        extraInfo:""
    })

    function updateData(prop){
        return function(e){
            setDataObj({
                    ...dataObj,
                    [prop]: e.target.value
                })
        }
    }

    function submitDoctorForm(e){
        e.preventDefault();
        

    }

    return(
        <div className="doctor-form-container">
            <form action="" id="doctor-form">
                <label for="name">Patient Name</label>
                <input type="text" name="name" id="name" onChange={updateData("name")}/>

                <label for="start-time">Start Time</label>
                <div>
                    <select name="hour" id="hour" onChange={updateData("hour")}>
                        <option value="0">12am</option>
                        <option value="4">1am</option>
                        <option value="8">2am</option>
                        <option value="12">3am</option>
                        <option value="16">4am</option>
                        <option value="20">5am</option>
                        <option value="24">6am</option>
                        <option value="28">7am</option>
                        <option value="32">8am</option>
                        <option value="36">9am</option>
                        <option value="40">10am</option>
                        <option value="44">11am</option>
                        <option value="48">12pm</option>
                        <option value="52">1pm</option>
                        <option value="56">2pm</option>
                        <option value="60">3pm</option>
                        <option value="64">4pm</option>
                        <option value="68">5pm</option>
                        <option value="72">6pm</option>
                        <option value="76">7pm</option>
                        <option value="80">8pm</option>
                        <option value="84">9pm</option>
                        <option value="88">10pm</option>
                        <option value="92">11pm</option>
                    </select>
                    <select name="minute" id="minute" onChange={updateData("minute")}>
                        <option value="0">00min</option>
                        <option value="1">15min</option>
                        <option value="2">30min</option>
                        <option value="3">45min</option>
                    </select>
                </div>

                <span>Select the Appointment Length</span>
    
                <label for="15">
                    <input type="radio" id="15" name="value" value="1" onChange={updateData("endTime")}/>
                    15 min
                    </label>  
      
                
                    <label for="30">
                <input type="radio" id="30" name="value" value="2" onChange={updateData("endTime")}/>
                    30 min</label>
                

            
                    <label for="45">
                <input type="radio" id="45" name="value" value="3" onChange={updateData("endTime")}/>
                45 min</label>

                <label for="60">
                <input type="radio" id="60" name="value" value="4" onChange={updateData("endTime")}/>
                60 min</label>
           

                <label for="address" >Patient Address</label>
                <input type="text" name="address" id="address" onChange={updateData("address")}/>

                <label for="description" >Patient Description</label>
                <input type="text" name="description" id="description" onChange={updateData("description")} />

                <label for="extra-info" >Nurse Info</label>
                <input type="text" name="extra-info" id="extra-info" onChange={updateData("extraInfo")}/>
                <button type="submit" for="doctor-form" onClick={submitDoctorForm}>Submit</button>
            </form>
        </div>
    )
}